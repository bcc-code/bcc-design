---
sectionTitle: Getting Started
sectionOrder: 10
title: Installation
---

# Installation

```bash
npm install @bcc-code/design-tokens
```

## Font

Add the Archivo font to your HTML `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@200..900&display=swap" rel="stylesheet" />
```

## Tailwind CSS v4

```css
@import "@bcc-code/design-tokens/tailwind";
```

## PrimeVue

```js
import PrimeVue from "primevue/config";
import BCCPreset from "@bcc-code/design-tokens/primevue";
import "@bcc-code/design-tokens/primevue/overrides";

app.use(PrimeVue, {
  theme: {
    preset: BCCPreset,
    options: { darkModeSelector: ".dark" },
  },
});
```

## CSS Variables

```css
@import "@bcc-code/design-tokens/css";
```

Or via CDN:

```html
<link rel="stylesheet" href="https://unpkg.com/@bcc-code/design-tokens@latest/build/bcc/css/auto.css">
```
