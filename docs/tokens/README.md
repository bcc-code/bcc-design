---
sectionTitle: Tokens
sectionOrder: 30
---

# Design Tokens

```bash
npm install @bcc-code/design-tokens
```

CSS variables, Tailwind utilities, and a PrimeVue preset for BCC apps. All tokens are synced from [Figma](https://www.figma.com/file/jtWn3ebee6bJnWpfZrJzq1/BCC-Foundation---Master).

---

## Setup

### PrimeVue (Recommended)

```js
// main.js
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import BCCPreset from "@bcc-code/design-tokens/primevue";
import "@bcc-code/design-tokens/primevue/overrides";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: BCCPreset,
    options: { darkModeSelector: ".dark" },
  },
});
```

Requires `primevue` and `@primeuix/themes`:

```bash
npm install primevue @primeuix/themes
```

### Tailwind CSS v4

```css
/* main.css */
@import "@bcc-code/design-tokens/tailwind";
```

One import gives you all BCC design tokens as Tailwind utilities.

### CSS Variables Only

```css
@import "@bcc-code/design-tokens/css";
```

Use this if you need raw CSS variables without Tailwind.

---

## Colors

```html
<!-- Example: Card with semantic colors -->
<div class="bg-elevation-surface-default border-default text-default p-200">
  <p class="text-subtle">Secondary text uses subtle color</p>
  <button class="bg-interactive-primary text-on-primary">Action</button>
</div>
```

| Token | CSS Variable | Tailwind Class |
|-------|--------------|----------------|
| Text | `--color-text-default` | `text-default` |
| Text secondary | `--color-text-subtle` | `text-subtle` |
| Background | `--color-background-default` | `bg-default` |
| Surface | `--color-elevation-surface-default` | `bg-elevation-surface-default` |
| Border | `--color-border-default` | `border-default` |
| Primary action | `--color-interactive-primary` | `bg-interactive-primary` |

### Do's and Don'ts

| Do | Don't |
|----|-------|
| Use `text-default` for body text | Use hardcoded colors like `text-gray-900` |
| Use `bg-elevation-surface-default` for cards | Use `bg-white` directly |
| Use `text-subtle` for secondary info | Use opacity hacks like `text-black/50` |
| Use semantic tokens for theming | Mix semantic and raw color values |

---

## Spacing

```html
<!-- Example: Consistent spacing -->
<div class="p-200 flex flex-col gap-100">
  <h2 class="mb-50">Title</h2>
  <p>Content with consistent rhythm</p>
</div>
```

| Token | Value | Tailwind Classes |
|-------|-------|------------------|
| 50 | 4px | `p-50` `m-50` `gap-50` |
| 100 | 8px | `p-100` `m-100` `gap-100` |
| 200 | 16px | `p-200` `m-200` `gap-200` |
| 300 | 24px | `p-300` `m-300` `gap-300` |
| 400 | 32px | `p-400` `m-400` `gap-400` |

### Do's and Don'ts

| Do | Don't |
|----|-------|
| Use `gap-100` for list items | Use `gap-2` (Tailwind default) |
| Use `p-200` for card padding | Use arbitrary values like `p-[15px]` |
| Stick to the spacing scale | Mix BCC tokens with default Tailwind spacing |

---

## Border Radius

```html
<button class="rounded-md">Default button</button>
<div class="rounded-lg">Card container</div>
<img class="rounded-full" src="avatar.jpg" />
```

Available tokens: `rounded-sm` `rounded-md` `rounded-lg` `rounded-full`

---

## Shadows

```html
<div class="shadow">Default elevation</div>
<div class="shadow-md">Modal or dropdown</div>
<div class="shadow-lg">Floating panel</div>
```

Available tokens: `shadow-sm` `shadow` `shadow-md` `shadow-lg` `shadow-xl`

---

## Dark Mode

```html
<!-- Add class to enable dark mode -->
<html class="dark">
```

```js
// Toggle programmatically
document.documentElement.classList.toggle("dark");
```

All semantic tokens automatically adapt. No additional configuration needed if you used `darkModeSelector: ".dark"` in PrimeVue setup.

---

## Fonts

```html
<!-- Add to <head> -->
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@200..900&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif&display=swap" rel="stylesheet" />
```

| Font | Purpose |
|------|---------|
| Archivo | Body text, UI elements |
| IBM Plex Serif | Display headings |

---

## Guidelines

See [Do's and Don'ts](./guidelines.md) for detailed best practices.
