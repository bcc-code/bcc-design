---
sectionTitle: Tokens
sectionOrder: 30
---

# Getting Started

::: warning DEPRECATED
This design library is deprecated. Please use [@bcc-code/design-tokens](https://www.npmjs.com/package/@bcc-code/design-tokens) with [PrimeVue](https://primevue.org/) instead.
:::

The design system consists of a set of [guidelines](../guidelines.md), tokens and components. These are implemented in CSS and we offer a Vue wrapper around the CSS library as well.

# Design Tokens

The `@bcc-code/design-tokens` package provides CSS variables, Tailwind CSS v4 utilities, and a PrimeVue Aura preset for building applications with the BCC Design System.

::: tip Recommended
For Vue 3 projects, we recommend using **PrimeVue** with `@bcc-code/design-tokens` for the best development experience and full component library.
:::

## Installation

```bash
npm install @bcc-code/design-tokens
```

## Quick Start

Choose your integration method:

| Method                     | Best For                                  | Components                     |
| -------------------------- | ----------------------------------------- | ------------------------------ |
| **PrimeVue** (recommended) | Vue 3 apps needing full component library | Yes - full PrimeVue components |
| **Tailwind v4**            | Any project using Tailwind                | No - utility classes only      |
| **CSS Variables**          | Any project, quick prototypes             | No - variables only            |

## Usage

### CSS Variables

Import the CSS variables in your main stylesheet:

```css
@import "@bcc-code/design-tokens/css";
```

Use the variables in your CSS:

```css
.card {
  background: var(--color-elevation-surface-default);
  color: var(--color-text-default);
  padding: var(--space-300);
  border-radius: var(--border-radius-md);
}
```

### Tailwind CSS v4

For Tailwind CSS v4 projects, import the utilities:

```css
@import "@bcc-code/design-tokens/tailwind";
```

Use utility classes:

```html
<div class="bg-elevation-surface-default text-default p-300 radius-md">
  Content
</div>
```

### PrimeVue Integration

Install the required peer dependencies:

```bash
npm install primevue @primeuix/themes
```

Configure PrimeVue in your app:

```javascript
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import BCCPreset from "@bcc-code/design-tokens/primevue";
import "@bcc-code/design-tokens/primevue/overrides";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: BCCPreset,
    options: {
      darkModeSelector: ".dark",
      cssLayer: {
        name: "primevue",
        order: "theme, base, primevue, custom",
      },
    },
  },
});
```

See the [PrimeVue documentation](https://primevue.org/) for the full component list.

### CDN Usage

For projects without npm, include the CSS directly:

```html
<!-- CSS variables -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@bcc-code/design-tokens@latest/build/bcc/css/auto.css"
/>

<!-- Tailwind utilities -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@bcc-code/design-tokens@latest/build/bcc/css/tailwind-auto.css"
/>
```

::: warning Version Pinning
Pin to a specific version instead of `@latest` to avoid unexpected breaking changes.
:::

## Dark Mode

Dark mode is activated by adding the `.dark` class to the `html` element:

```html
<html class="dark">
  <!-- Dark mode active -->
</html>
```

Toggle dark mode with JavaScript:

```javascript
document.documentElement.classList.toggle("dark");
```

The `auto.css` file automatically responds to system preferences via `prefers-color-scheme`.

## Available Exports

### CSS

- `@bcc-code/design-tokens/css` - Auto-switching (prefers-color-scheme)
- `@bcc-code/design-tokens/css/light` - Light theme only
- `@bcc-code/design-tokens/css/dark` - Dark theme only

### Tailwind CSS

- `@bcc-code/design-tokens/tailwind` - Auto-switching utilities
- `@bcc-code/design-tokens/tailwind/light` - Light utilities only
- `@bcc-code/design-tokens/tailwind/dark` - Dark utilities only

### JavaScript

- `@bcc-code/design-tokens/js/light` - Light theme tokens as JS objects
- `@bcc-code/design-tokens/js/dark` - Dark theme tokens as JS objects

### PrimeVue

- `@bcc-code/design-tokens/primevue` - Aura preset configuration
- `@bcc-code/design-tokens/primevue/overrides` - Component CSS overrides

## Token Categories

### Colors

- **Text**: `--color-text-default`, `--color-text-subtle`, `--color-text-success`, etc.
- **Backgrounds**: `--color-background-*`
- **Elevation**: `--color-elevation-surface-default`, `--color-elevation-surface-sunken`
- **Borders**: `--color-border-default`, `--color-border-subtle`
- **Interactive**: `--color-interactive-primary`, hover/active states

### Spacing

| Token | Value |
| ----- | ----- |
| 50    | 4px   |
| 100   | 8px   |
| 150   | 12px  |
| 200   | 16px  |
| 300   | 24px  |
| 400   | 32px  |
| 500   | 40px  |
| 600   | 48px  |
| 800   | 64px  |
| 1000  | 80px  |

```html
<div class="p-200">Padding 16px</div>
<div class="m-300">Margin 24px</div>
<div class="gap-100">Gap 8px</div>
```

### Border Radius

```html
<div class="radius-sm">Small</div>
<div class="radius-md">Medium</div>
<div class="radius-lg">Large</div>
<div class="radius-full">Full (pill)</div>
```

## Fonts

The design system uses two fonts:

- [Archivo](https://fonts.google.com/specimen/Archivo) - Primary font for UI text
- [IBM Plex Serif](https://fonts.google.com/specimen/IBM+Plex+Serif) - Serif font

Include them via Google Fonts:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Archivo:wght@200..900&display=swap"
  rel="stylesheet"
/>
<link
  href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif&display=swap"
  rel="stylesheet"
/>
```
