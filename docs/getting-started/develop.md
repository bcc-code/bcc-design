---
sectionTitle: Get started
sectionOrder: 10
title: Develop
order: 3
---

# Develop

Install the BCC Design System in your project. Choose the method that fits your stack.

## Requirements

| Package      | Version |
| ------------ | ------- |
| PrimeVue     | 4.0+    |
| Tailwind CSS | 4.0+    |

## Fonts

Include the Archivo font from the CDN.

**HTML**
```html
<link rel="stylesheet" href="https://design.bcc.no/fonts/stylesheet.css">
```

**CSS**
```css
@import url("https://design.bcc.no/fonts/stylesheet.css");
```

## PrimeVue (Recommended)

**This is the recommended way to use BCC Design System.** PrimeVue provides fully styled components with our design tokens built-in.

```bash
npm install @bcc-code/design-tokens primevue @primeuix/themes
```

Configure PrimeVue in your `main.ts`:

```ts
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import BCCPreset from "@bcc-code/design-tokens/primevue";
import App from "./App.vue";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: BCCPreset,
    options: {
      darkModeSelector: ".dark",
      cssLayer: {
        name: "primevue",
        order: "theme, base, primevue",
      },
    },
  },
});

app.mount("#app");
```

### With Tailwind

Install Tailwind CSS:

```bash
npm install tailwindcss @tailwindcss/vite
```

Add `tailwind` to the layer order:

```ts
cssLayer: {
  name: "primevue",
  order: "theme, base, primevue, tailwind",
},
```

Then import Tailwind and the design tokens in your main CSS file:

```css
@import "tailwindcss";
@import "@bcc-code/design-tokens/tailwind";
```

> The `@bcc-code/design-tokens` package is already installed from the PrimeVue setup above.

Layers listed later in the order override earlier ones. With this setup, Tailwind utilities can override PrimeVue styles when needed — no `!important` required.

See the [PrimeVue CSS Layer documentation](https://primevue.org/theming/styled/#options) for more details.

## Other Options

For projects not using Vue or PrimeVue.

### Tailwind Only

```bash
npm install @bcc-code/design-tokens tailwindcss @tailwindcss/vite
```

```css
@import "tailwindcss";
@import "@bcc-code/design-tokens/tailwind";
```

See the [Tailwind CSS Vite installation guide](https://tailwindcss.com/docs/installation/using-vite) for full setup instructions.

### CSS Variables Only

For non-Tailwind projects, you can use CSS variables directly:

```css
@import "@bcc-code/design-tokens/css";
```

```css
.my-element {
  color: var(--color-text-default);
  background: var(--color-elevation-surface-default);
  padding: var(--spacing-200);
  border-radius: var(--radius-md);
}
```

## Dark Mode

Toggle dark mode by adding the `dark` class to the root element:

```js
document.documentElement.classList.toggle("dark");
```

```html
<html class="dark">
  <!-- Content adapts to dark theme -->
</html>
```
