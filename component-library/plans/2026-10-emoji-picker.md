# Plan: shared emoji picker (`BccEmojiPicker`)

Status: proposal

ClickUp: [Støtte emojis og scheduled meldinger på pc i chat](https://app.clickup.com/t/124kk1zbnj5) (DIGI-6074)

## Problem

Many desktop users have no emoji keyboard, or don't know how to open it. To fix that,
[bcc-code/bcc-chat#532](https://github.com/bcc-code/bcc-chat/pull/532) added an emoji button
to the chat composer. To keep the chat package small, it shows only the 36 reaction emojis
(`ui/src/chat/reactions.ts`), with no search and no categories.

The PM wants a normal emoji picker: every emoji, grouped in categories, with search. Other
apps (for example bcc-event-app) may need the same picker later, so it belongs in the
component library and not in the chat package.

## Decision

Add `BccEmojiPicker` to `@bcc-code/component-library-vue` as a custom component
(`src/components/custom/BccEmojiPicker/`). The chat composer uses it in place of
`ComposerEmojiPopover`'s 36-emoji grid.

### Why this does not grow the chat package

- `@bcc-code/vue-bcc-chat-ui` treats `@bcc-code/component-library-vue` as an external peer
  dependency (`ui/vite.config.ts`), so the picker is not bundled into the chat package.
- The component library's ES build uses `preserveModules`, so apps that never import
  `BccEmojiPicker` don't pay for it.
- The emoji data (the largest part) loads with a dynamic `import()` the first time the picker
  opens, so it lands in its own chunk and stays out of the initial app bundle. It is bundled
  with the app, not fetched from a CDN, so it works offline in the Capacitor apps.

### Library

Build the UI ourselves in Vue and use [`emojibase-data`](https://emojibase.dev/) for the data
(emoji, names, groups, search keywords, skin tones, localised for `en`, `nb`, `de`, `es`,
`fr`, `nl`, `pl` and more).

Alternatives rejected:

- **`emoji-picker-element`**: complete and small, but it is a web component in shadow DOM and
  fetches its data from a CDN by default. Matching the design tokens and dark mode through its
  CSS variables only goes so far, and the CDN would need replacing for offline use. Second
  choice if building our own UI takes too long.
- **`vue3-emoji-picker`, `emoji-mart`**: bundle all data eagerly or are poorly maintained for
  Vue 3; the styling does not follow the design tokens.
- **Keep the 36 reaction emojis**: what we have now; the PM wants more.

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

## Component API (first version)

```ts
type EmojiPickerProps = {
	/** Locale for names and search keywords. Falls back to `en`. */
	locale?: string;
	/** Placeholder for the search field. */
	searchPlaceholder?: string;
};

// emits
select: [emoji: string];
```

- Inline panel only. The consumer decides where it is shown (the chat composer already
  positions its own popover). No built-in trigger button.
- Search field on top, category tabs, a scrollable grid grouped by category.
- Keyboard: type to search, arrow keys in the grid, Enter selects. Every emoji button has an
  `aria-label` with its name.
- Emoji buttons use `mousedown.prevent` so a focused editor keeps its caret, as in #532.
- Styling with design tokens; light and dark mode.
- Storybook story and a unit test for search and select.

Left out of the first version on purpose: skin-tone selection, "recently used", custom
emojis, a built-in popover/trigger. Each can be added later without breaking the API.

## Steps

1. **bcc-design** (`component-library/`): add `BccEmojiPicker` with `emojibase-data@~17.0.0` as a
   dependency, story, test; export it and its prop type from `src/components/custom/index.ts`.
   Release through the `design-library-*` create-version workflow.
2. **bcc-chat** (`ui/`): bump `@bcc-code/component-library-vue`, render `BccEmojiPicker`
   inside `ComposerEmojiPopover` (keep its open/close and outside-click logic), pass the chat
   locale and a translated search placeholder. Keep the `isTouchUI` check: mobile still uses
   the system emoji keyboard. Update the Playwright emoji test and the affected snapshots.
3. **bcc-event-app**: nothing now. It can use `BccEmojiPicker` when a feature needs it.

Both repos use the branch `feat/emoji-picker`.

## Test by hand

- Desktop Chrome, Safari, Firefox: open the picker, search in English and Norwegian, insert
  emojis in the middle of formatted text and mentions.
- Check in the browser's network tab that the emoji data loads only when the picker opens.
- Dark mode.
