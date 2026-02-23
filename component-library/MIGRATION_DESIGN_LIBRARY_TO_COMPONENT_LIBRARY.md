# Migration guide: design-library-vue → component-library-vue

This guide helps you migrate a Vue app from `@bcc-code/design-library-vue` to `@bcc-code/component-library-vue`. The component library is built on PrimeVue and provides a consistent BCC design system with different APIs and some new components.

## Overview

- **Remove:** `@bcc-code/design-library-vue` as a direct dependency (you may still have it as a transitive dependency from e.g. `@bcc-code/vue-bcc-chat-ui`).
- **Add:** `@bcc-code/component-library-vue` (e.g. `^0.6.0`).
- **Register:** the component library once in your app entry (see below).
- **Replace:** imports and component usage per the mapping below; update types and styles as needed.

## 1. Dependencies and app registration

### Package

```bash
pnpm remove @bcc-code/design-library-vue
pnpm add @bcc-code/component-library-vue
```

### App entry (e.g. `main.ts`)

Replace design-library registration with the component library plugin:

```ts
// Before (design-library)
// import { plugin } from '@bcc-code/design-library-vue';
// app.use(plugin);

// After (component-library)
import { BccComponentLibrary } from '@bcc-code/component-library-vue';

const app = createApp(App);
BccComponentLibrary(app as any);
```

The component library registers its components globally, so you don’t need to import each one in every file (though named imports are still used for type-checking and tree-shaking).

## 2. Styles and Tailwind

### Base styles

Switch the base layer from the design library to the component library theme:

```css
/* Before */
@import '@bcc-code/design-library-vue/tailwind/index.css';

/* After */
@import '@bcc-code/component-library-vue/theme.css';
```

Keep your existing Tailwind `@theme`, `@layer`, and custom utilities; only the design-library base import is replaced.

### Tailwind config (if you used design-library preset/plugin)

If you previously used `bccForbundetTheme` or `tailwindPlugin` from the design library in `tailwind.config.ts`, remove them. This project uses Tailwind v4 with `@theme` in CSS and does not rely on the design-library Tailwind preset. If you need design tokens, use `@bcc-code/design-tokens` or the component library’s theme instead.

## 3. Component mapping

### Direct replacements

| Design library | Component library | Notes |
|----------------|--------------------|--------|
| **BccAlert** | **BccMessage** | Use `severity` (e.g. `info`, `warn`, `error`, `secondary`), optional `icon`, `outlined`. |
| **BccRange** | **BccSlider** | API may differ; check component-library props (e.g. `v-model` for value). |
| **BccButton** | **BccButton** | Same name; check `variant` (e.g. `outlined`), `rounded`, `use-ctx`, `class="ctx-*"` for context. |
| **BccTag** | **BccTag** | Use `context` (e.g. `"gray-subtler"`, `"brown-subtlest"`) or `BCC_CONTEXTS`; `clickable`, `size`, `:icon-right`. |
| **BccTabs** | **BccTabs** | Tabs config uses `TabItem[]`: `{ title: string }` (and optional props). Use `#tab-1`, `#tab-2`, … for content. |
| **BccModal** | **BccDialog** | Different API: use `v-model:visible`, `:header`, `#footer` for actions. Use `modal` for overlay behaviour. |
| **BccCookieBanner** | **BccDrawer** | No dedicated cookie component; implement with `BccDrawer` (e.g. `v-model:visible`, header + footer with Accept/Decline). |
| **BccGraphicPoster** | **BccGraphic** + local wrapper | Use **BccGraphic** for image/ratio/rounding; add a local component for `checked` overlay or `link` wrapper if needed. |

### Same name, same package

Use these from `@bcc-code/component-library-vue` with the same component name; only the import source changes. Check the component-library docs for any prop/event differences:

- **BccBadge**, **BccButton**, **BccCheckbox**, **BccDialog**, **BccDrawer**, **BccGraphic**, **BccInput**, **BccMessage**, **BccMultiSelect**, **BccProgressBar**, **BccProgressSpinner**, **BccSelect**, **BccStepper**, **BccTabs**, **BccToggle**, **BccAvatar**, **BccAvatarGroup**, **BccCapacityIndicator**, **BccNpsResult**, **BccNpsScore**, etc.

Example:

```ts
// Before
import { BccButton, BccMessage } from '@bcc-code/design-library-vue';

// After
import { BccButton, BccMessage } from '@bcc-code/component-library-vue';
```

## 4. Modals and dialogs (BccModal → BccDialog)

**BccModal** used `:open`, `@close`, and slots like `#primaryAction` / `#secondaryAction`. **BccDialog** uses PrimeVue-style bindings and slots.

**Before (BccModal):**

```vue
<BccModal :open="showCancel" @close="showCancel = false" title="Confirm">
  <p>Are you sure?</p>
  <template #primaryAction>
    <BccButton label="OK" @click="handleOk" />
  </template>
  <template #secondaryAction>
    <BccButton variant="outlined" label="Cancel" @click="showCancel = false" />
  </template>
</BccModal>
```

**After (BccDialog):**

```vue
<BccDialog
  v-model:visible="showCancel"
  :header="$i18n.$t.some.title"
  modal
  :style="{ width: 'min(90vw, 24rem)' }"
>
  <p>Are you sure?</p>
  <template #footer>
    <BccButton rounded :label="$i18n.$t.form.ok" @click="handleOk" />
    <BccButton variant="outlined" :label="$i18n.$t.form.cancel" @click="showCancel = false" />
  </template>
</BccDialog>
```

- Visibility: use a ref and `v-model:visible` instead of `:open` and `@close`.
- Title: use `:header` (string).
- Actions: use a single `#footer` slot and place buttons inside it; no `#primaryAction` / `#secondaryAction`.

## 5. Tabs (BccTabs and TabItem)

**Before (BccTabsGroup):**

```ts
import type { BccTabsGroup } from '@bcc-code/design-library-vue';
const tabs: BccTabsGroup = [ { title: 'Details' }, { title: 'Participants' } ];
```

**After (TabItem):**

```ts
import { BccTabs, type TabItem } from '@bcc-code/component-library-vue';

const tabs = computed<TabItem[]>(() => [
  { title: $t.app.details },
  { title: $t.activities.shifts.participants },
]);
```

Template: bind `v-model` to the active index and use `#tab-1`, `#tab-2`, … for content:

```vue
<BccTabs v-model="activeTab" :tabs="tabs" fill>
  <template #tab-1> ... </template>
  <template #tab-2> ... </template>
</BccTabs>
```

## 6. Types

| Design library type | Replacement |
|---------------------|-------------|
| **VueComponent** | Use Vue’s `Component`: `import type { Component } from 'vue'`. For route meta `right`/`left` components, this project uses `VueComponent` from `@bcc-code/component-library-vue` in `shims-vue.d.ts`; you can switch to `Component` from `vue` if the library no longer exports `VueComponent`. |
| **BccTabsGroup** | **TabItem[]** from `@bcc-code/component-library-vue`. |
| **BccReactInfo** | **ReactInfo** from `@bcc-code/component-library-vue`. |

Example:

```ts
// Before
import type { VueComponent } from '@bcc-code/design-library-vue';

// After (preferred)
import type { Component } from 'vue';
```

## 7. Context and tags (BCC_CONTEXTS)

For **BccTag** (and similar) context values, use the shared constant object from the component library:

```ts
import { BCC_CONTEXTS, BccTag, type BCC_CONTEXT } from '@bcc-code/component-library-vue';
```

Usage:

```vue
<BccTag
  :context="isActive ? BCC_CONTEXTS.teal.subtler : BCC_CONTEXTS.gray.subtler"
  clickable
  :text="label"
  :icon-right="isActive ? CloseIcon : undefined"
/>
```

## 8. Composables and utilities

- **useAnimatedNumber** – use from `@bcc-code/component-library-vue` if you need animated numbers (same name, different package).
- Icons stay in **@bcc-code/icons-vue**; no change.

## 9. Components with no direct replacement

Some design-library components are not (yet) available in the component library. See **DESIGN_LIBRARY_NO_REPLACEMENT.md** in the repo root for:

- **BccHeader**, **BccLinkItem**, **BccPin**
- **BccModal** (replaced in this app with **BccDialog**; see section 4)
- **BccCookieBanner** (replaced in this app with **BccDrawer**; see section 3)
- **BccBadge** (this app uses **BccBadge** from the component library; if your version doesn’t export it, you may need a local implementation or to keep the design-library dependency for that component only)

Until the component library provides equivalents, you can:

- Build a small local component (e.g. section header, link row) using Tailwind and design tokens, or
- Keep a minimal dependency on the design library only for those components (and its CSS if required), or
- Use a different pattern (e.g. BccDrawer instead of BccCookieBanner, BccDialog instead of BccModal).

## 10. Step-by-step checklist

1. **Dependencies:** Remove `@bcc-code/design-library-vue`, add `@bcc-code/component-library-vue`.
2. **Entry:** In `main.ts` (or equivalent), replace design-library plugin with `BccComponentLibrary(app)`.
3. **Styles:** Replace `@bcc-code/design-library-vue/tailwind/index.css` with `@bcc-code/component-library-vue/theme.css` in your main CSS. Adjust Tailwind config if you used design-library preset/plugin.
4. **Imports:** Replace all `from '@bcc-code/design-library-vue'` with `from '@bcc-code/component-library-vue'` for components that exist in the component library.
5. **Component renames/APIs:**  
   - **BccAlert** → **BccMessage** (adjust `severity`/props).  
   - **BccRange** → **BccSlider** (adjust props if needed).  
   - **BccModal** → **BccDialog** (`v-model:visible`, `:header`, `#footer`).  
   - **BccCookieBanner** → **BccDrawer** or custom UI.  
   - **BccGraphicPoster** → **BccGraphic** + optional local wrapper.
6. **Types:** Replace **VueComponent** with **Component** from `vue`, **BccTabsGroup** with **TabItem[]**, **BccReactInfo** with **ReactInfo** from the component library.
7. **Tabs:** Use **TabItem[]** and `#tab-1`, `#tab-2`, … with **BccTabs**.
8. **Tags/context:** Use **BCC_CONTEXTS** and **BccTag** from the component library.
9. **No replacement:** For **BccHeader**, **BccLinkItem**, **BccPin**, etc., implement locally or keep design-library only where necessary (see DESIGN_LIBRARY_NO_REPLACEMENT.md).
10. **Lint and test:** Run `pnpm run lint`, `pnpm run test`, and manual checks for modals, tabs, forms, and messages.

## 11. References

- **DESIGN_LIBRARY_NO_REPLACEMENT.md** (repo root) – List of design-library exports with no component-library replacement and notes on Tailwind/CSS.
- **@bcc-code/component-library-vue** – Package docs and PrimeVue-based API for each component.
- This codebase (branch `feat/new-primevue` / migration branch) for real usage of **BccDialog**, **BccMessage**, **BccTabs**, **TabItem**, **BCC_CONTEXTS**, **BccDrawer**, and **BccGraphicPoster**-style wrappers.
