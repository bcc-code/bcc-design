---
title: PrimeVue Setup
order: 2
---

# PrimeVue Setup

For Vue 3 applications using PrimeVue components.

## Install Dependencies

```bash
npm install @bcc-code/design-tokens primevue @primeuix/themes
```

## Configure PrimeVue

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

## Add Font

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@200..900&display=swap" rel="stylesheet" />
```

## Usage

```vue
<template>
  <Button label="Click me" />
  <InputText v-model="value" />
</template>
```

All PrimeVue components will automatically use BCC design tokens.

## Dark Mode

Toggle dark mode by adding the `.dark` class to your root element:

```js
// Toggle dark mode
document.documentElement.classList.toggle("dark");
```

## What's Included

The PrimeVue preset provides:
- BCC primitive colors (neutral, brand colors)
- BCC spacing and border radius
- BCC typography
- Light and dark theme semantic tokens
- Component-specific token overrides
