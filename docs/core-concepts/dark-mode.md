---
title: Dark Mode
order: 4
---

# Dark Mode

All semantic tokens automatically adapt to dark mode. No additional configuration needed.

## Enable Dark Mode

Add the `dark` class to your HTML element:

```html
<html class="dark">
```

## Toggle Programmatically

```js
// Toggle dark mode
document.documentElement.classList.toggle("dark");

// Check current mode
const isDark = document.documentElement.classList.contains("dark");
```

## PrimeVue Setup

If using PrimeVue, configure the dark mode selector:

```js
app.use(PrimeVue, {
  theme: {
    preset: BCCPreset,
    options: { darkModeSelector: ".dark" },
  },
});
```

## Testing

Always test components in both light and dark modes. Hardcoded colors break dark mode.

```html
<!-- Wrong: breaks in dark mode -->
<div class="bg-white text-black shadow-lg">

<!-- Right: works in both modes -->
<div class="bg-elevation-surface-raised text-default shadow-md">
```
