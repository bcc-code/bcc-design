---
order: 100
---

# Legacy: Design Library

::: danger DEPRECATED
The packages documented on this page are deprecated. Please migrate to [@bcc-code/design-tokens](https://www.npmjs.com/package/@bcc-code/design-tokens) with [PrimeVue](https://primevue.org/).
:::

This page contains documentation for the legacy BCC Design Library packages for projects that have not yet migrated.

[[toc]]

## Storybook

View interactive examples of the legacy components [in Storybook](https://design-library.developer.bcc.no).

---

## CSS Library (@bcc-code/design-library)

[![version](https://img.shields.io/npm/v/@bcc-code/design-library?label=%40bcc-code%2Fdesign-library)](https://github.com/bcc-code/bcc-design/releases)

For projects that don't use Vue, the CSS library provides classes for all components.

### Installation

```bash
pnpm add @bcc-code/design-library@latest
```

### CDN Usage

```
https://unpkg.com/@bcc-code/design-library@latest/dist/style.css
```

::: warning Version Pinning
Pin to a specific version instead of `@latest` to avoid unexpected breaking changes.
:::

### Import CSS

With Tailwind:
```css
@import "@bcc-code/design-library/tailwind/index.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Without Tailwind:
```css
@import "@bcc-code/design-library/style.css";
```

### Tailwind Configuration

```javascript
const themes = require("@bcc-code/design-library");

module.exports = {
  presets: [themes.bccForbundetTheme],
  content: ["./src/**/*.{vue,ts}"],
  plugins: [themes.tailwindPlugin],
  darkMode: 'class',
};
```

### CSS Class Naming

Classes follow the convention `.bcc-<component-name><-optional-modifier>`:
- `.bcc-button` - Base button class
- `.bcc-button-primary` - Primary variant
- `.bcc-button-xl` - XL size

Check [Storybook](https://design-library.developer.bcc.no) or the [source code](https://github.com/bcc-code/bcc-design/tree/main/design-library/src/components) to find available classes.

---

## Vue Components (@bcc-code/design-library-vue)

[![version](https://img.shields.io/npm/v/@bcc-code/design-library-vue?label=%40bcc-code%2Fdesign-library-vue)](https://github.com/bcc-code/bcc-design/releases)

Vue 3 component wrapper around the CSS library.

### Prerequisites

- Vue 3
- Tailwind CSS (recommended)

### Installation

```bash
pnpm add @bcc-code/design-library-vue@latest
```

### Import CSS

```css
@import "@bcc-code/design-library-vue/tailwind/index.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Tailwind Configuration

```javascript
const themes = require("@bcc-code/design-library-vue");

module.exports = {
  presets: [themes.bccForbundetTheme],
  content: [
    "./src/**/*.{vue,ts}",
    "./node_modules/@bcc-code/design-library-vue/dist/design-library-vue.js",
  ],
  plugins: [themes.tailwindPlugin],
  darkMode: 'class',
};
```

---

## Legacy Tokens

Legacy tokens are available as Tailwind utility classes (e.g., `.bg-primary`) and CSS variables (e.g., `var(--bg-primary)`).

### Token Context

Switch between global and alternative contexts using `data-context`:

```html
<div data-context="alternative" class="bg-primary">
    <button class="bcc-button">...</button>
</div>
```

View available tokens:
- [Typography classes](https://design-library.developer.bcc.no/?path=/docs/tokens-typography--docs)
- [Color tokens](https://design-library.developer.bcc.no/?path=/docs/tokens-color--docs)

---

## Fonts

Both legacy packages use:
- [Archivo](https://fonts.google.com/specimen/Archivo) - Primary font
- [IBM Plex Serif](https://fonts.google.com/specimen/IBM+Plex+Serif) - Serif font

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@200..900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif&display=swap" rel="stylesheet">
```
