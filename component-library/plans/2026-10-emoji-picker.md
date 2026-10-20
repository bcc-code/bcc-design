# Plan: full emoji picker in the chat, provided by the host app

Status: proposal

ClickUp: [Støtte emojis og scheduled meldinger på pc i chat](https://app.clickup.com/t/124kk1zbnj5) (DIGI-6074)

## Problem

Many desktop users have no emoji keyboard, or don't know how to open it. Browsers can't open
the system emoji panel (Win + . or Ctrl + Cmd + Space) from a web page, so we need our own
picker. [bcc-code/bcc-chat#532](https://github.com/bcc-code/bcc-chat/pull/532) added an emoji
button to the chat composer. To keep the chat package small, it shows only the 36 reaction
emojis (`ui/src/chat/reactions.ts`), with no search and no categories.

The PM wants a normal emoji picker: every emoji, grouped in categories, with search. It must
not make the chat package bigger, and it must not take space in the native app builds, where
the system emoji keyboard is used.

## Decision

1. The component library gets a full emoji picker, opened from code with
   `openBccEmojiPicker()`, the same way `openBccLightbox()` works.
2. `BccChat` gets an optional `openEmojiPicker` prop. When it is set, the composer's emoji
   button calls it; when it is not, the composer keeps the 36-emoji grid from #532.
3. bcc-event-app passes `openEmojiPicker` to `BccChat` in the web build only.

The chat package never imports the picker or the emoji data. The host app decides whether
there is a full picker, and other places in the app can open the same picker.

Alternatives rejected:

- **Picker inside the chat package**: grows the chat package, and keeping it out of native
  builds needs a separate entry point in the component library plus a module alias in
  `vite_native.config.ts`. The strip-code markers don't reach code inside an npm package.
- **Keep the 36 reaction emojis**: what we have now; the PM wants more.
- **A Promise that returns one emoji**: closes the picker after each emoji. #532 keeps the
  picker open so several emojis can be inserted, so the chat passes an `insert` callback
  instead.

## bcc-design: `openBccEmojiPicker`

In `component-library/src/components/custom/BccEmojiPicker/`:

```ts
type EmojiPickerOpenOptions = {
	/** Element the picker is positioned next to (e.g. the button that opened it). */
	anchor: HTMLElement;
	/** Called for each emoji the user picks. The picker stays open. */
	onSelect: (emoji: string) => void;
	/** Locale for names and search keywords. Falls back to `en`. */
	locale?: string;
	onHide?: () => void;
};

export function openBccEmojiPicker(options: EmojiPickerOpenOptions): void;
export function closeBccEmojiPicker(): void;
```

- Mounts itself with `render()` on first use, like `BccLightbox/state.ts`, but is **not**
  installed in `setup.ts`, so apps that never call it don't bundle it.
- The picker component and the emoji data load with dynamic `import()` on first open, so
  they stay out of the app's initial bundle.
- Load the data with one explicit `import()` per supported locale (`en`, `nb`, `de`, `es`,
  `fr`, `nl`, `pl`), not a template string: a template makes Vite emit a file for every
  emojibase locale (about 30, ~16 MB raw).
- UI: search field on top, category tabs, a scrollable grid grouped by category. Positioned
  next to `anchor`, closes on outside click or Escape. Type to search, arrow keys in the grid,
  Enter selects. Every emoji button has an `aria-label` with its name. Design tokens; light
  and dark mode.
- Emoji buttons use `mousedown.prevent` so a focused editor keeps its caret, as in #532.
- Storybook story and a unit test for search and select.

Left out of the first version on purpose: skin-tone selection, "recently used", custom
emojis. Each can be added later without breaking the API.

### Data: `emojibase-data`

Build the UI ourselves in Vue and use [`emojibase-data`](https://emojibase.dev/) for the data
(emoji, names, groups, search keywords, localised).

Pin `emojibase-data` to `~17.0.0` (Emoji 17, CLDR 48). Upgrade to 18 once Emoji 18 is
common on our users' devices.

Checked 2026-10-20:

- Size (17.0.0): `en/compact.json` is about 83 KB gzipped (571 KB raw, 1,949 emoji),
  `nb/compact.json` about 79 KB gzipped. Only the active locale's file is loaded.
- Maintenance: MIT. Major releases follow each new Emoji version (16.0 in 12/2024, 17.0 in
  11/2025, 18.0 in 10/2026).
- 18.0.0 was skipped for now: it adds Emoji 18 characters that older systems can't render,
  and its labels come from CLDR 49 beta. It also drops the redundant `FE0F` from 152 emoji
  (like 👍), so check that saved reactions and inserted emoji still match when upgrading.
- Even on 17, filter the grid by what the platform can render.
- No `ro` locale; fall back to `en` there.

Rejected libraries:

- **`emoji-picker-element`**: complete and small, but a web component in shadow DOM that
  fetches its data from a CDN by default. Hard to match the design tokens, and the CDN would
  need replacing for offline use.
- **`vue3-emoji-picker`, `emoji-mart`**: bundle all data eagerly or are poorly maintained for
  Vue 3; the styling does not follow the design tokens.

## bcc-chat: `openEmojiPicker` prop

New optional prop on `BccChat` (`ui/src/components/chat/BccChat.vue`), passed down to the
composer:

```ts
openEmojiPicker?: (context: {
	/** The composer's emoji button, for positioning. */
	anchor: HTMLElement;
	/** Inserts the emoji at the caret. Can be called several times. */
	insert: (emoji: string) => void;
}) => void;
```

- `MessageComposer` calls it from the emoji button, with `insertText` from
  `useRichTextComposer` as `insert`.
- Without the prop, `ComposerEmojiPopover` and its 36 emojis work as today, so other users of
  the chat package see no change.
- The emoji button stays hidden on touch devices (`useIsTouchUi`), with or without the prop.
- Playwright: a test that the prop is called and `insert` puts the emoji at the caret. The
  existing emoji test keeps covering the fallback.

## bcc-event-app: pass the prop on web

In `src/modules/Inbox/components/ChatRoom.vue` (the only `<BccChat>`), pass
`:open-emoji-picker`. Its value comes from a small `.ts` module, wrapped in
`START-PWA-ONLY` / `END-PWA-ONLY` so `rollup-plugin-strip-code` removes it from the native
build. Strip-code only runs on `**/*.ts`, so the import must not be in the `.vue` file.

```ts
export let openEmojiPicker: OpenEmojiPicker | undefined;

/* START-PWA-ONLY */
import { openBccEmojiPicker } from '@bcc-code/component-library-vue';

openEmojiPicker = ({ anchor, insert }) => openBccEmojiPicker({ anchor, onSelect: insert, locale: currentLocale() });
/* END-PWA-ONLY */
```

The native build ends up with `openEmojiPicker` as `undefined` and no import of the picker. The markers are configured in `vite_native.config.ts` but no code uses them
yet, so check the native build output once.

## Steps and branches

All three repos use the branch `feat/emoji-picker`.

1. **bcc-design**: `openBccEmojiPicker` with `emojibase-data@~17.0.0`, story, test, exports
   from `src/components/custom/index.ts`. Release through the `design-library-*`
   create-version workflow.
2. **bcc-chat**: `openEmojiPicker` prop and test. Release a new version of
   `@bcc-code/vue-bcc-chat-ui`.
3. **bcc-event-app**: bump both packages and pass the prop on web.

## Test by hand

- Web app in desktop Chrome, Safari and Firefox: open the picker from the chat, search in
  English and Norwegian, insert several emojis in the middle of formatted text and mentions.
- Network tab: the picker and the emoji data load only when the picker opens.
- Native build: no emojibase files in the output. On an iPad with a trackpad, the emoji
  button opens the 36-emoji fallback.
- Dark mode.
