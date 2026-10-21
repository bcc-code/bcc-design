# Plan: shared emoji picker (`BccEmojiPicker`)

Status: implemented ([bcc-code/bcc-design#433](https://github.com/bcc-code/bcc-design/pull/433))

ClickUp: [Støtte emojis og scheduled meldinger på pc i chat](https://app.clickup.com/t/124kk1zbnj5) (DIGI-6074)

## Problem

Many desktop users have no emoji keyboard, or don't know how to open it. Browsers can't open
the system emoji panel (Win + . or Ctrl + Cmd + Space) from a web page, so we need our own
picker. [bcc-code/bcc-chat#532](https://github.com/bcc-code/bcc-chat/pull/532) added an emoji
button to the chat composer. To keep the chat package small, it shows only the 36 reaction
emojis (`ui/src/chat/reactions.ts`), with no search and no categories.

The PM wants a normal emoji picker: every emoji, grouped in categories, with search. Other
places in the apps may want one too, so it belongs in the component library. Apps that don't
use it must not pay for it in bundle size.

## Decision

The component library gets a full emoji picker, opened from code with `openBccEmojiPicker()`
(the same way `openBccLightbox()` works) or rendered inline with `<BccEmojiPicker>`.

Using it in the chat is planned in bcc-chat: the chat gets an `openEmojiPicker` prop, and the
host app passes `openBccEmojiPicker` to it in its web build only. The chat package then never
imports the picker or its data.

## `openBccEmojiPicker`

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
	/** Aborting it closes the picker opened by this call, or stops it from opening if it is still loading. */
	signal?: AbortSignal;
};

export function openBccEmojiPicker(options: EmojiPickerOpenOptions): Promise<void>;
export function closeBccEmojiPicker(): Promise<void>;
```

- Calling `openBccEmojiPicker` again with the same `anchor` while it is open closes it, so it
  can be a button's click handler. `<BccEmojiPicker @select>` is also exported for inline use.
- `signal` lets the caller close the picker it opened, for example when the chat composer it
  inserts into resets or unmounts. It was added after the first release, for
  [bcc-code/bcc-chat#537](https://github.com/bcc-code/bcc-chat/pull/537). It only closes the
  picker if it still belongs to that call, unlike the global `closeBccEmojiPicker()`.
- Built on PrimeVue's `Popover`. PrimeVue components need the app's context, so `setup.ts`
  remembers the app (`src/appContext.ts`) without importing the picker.
- Mounts itself with `render()` on first use, like `BccLightbox/state.ts`, but is **not**
  installed in `setup.ts`, so apps that never call it don't bundle it.
- Unsupported emojis are detected by drawing a test face per Emoji version (and 🇳🇴 for flags)
  on a canvas: color emoji fonts ignore the fill color, a missing glyph does not.
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

## Test by hand

- Storybook (`Custom/Input/BccEmojiPicker`) in desktop Chrome, Safari and Firefox: search in
  English and Norwegian, insert several emojis at the caret in the Popover story.
- Windows: flags are hidden in Chrome, and no empty squares show up.
- Network tab: the picker and the emoji data load only when the picker opens.
- Dark mode.
