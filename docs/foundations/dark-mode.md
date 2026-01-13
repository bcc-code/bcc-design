---
title: Dark Mode
order: 4
---

# Dark Mode

Semantic tokens automatically switch between light and dark values.

---

## Enable Dark Mode

Add `dark` class to the root element:

```html
<html class="dark">
  <!-- All tokens now use dark values -->
</html>
```

---

## Toggle with JavaScript

```js
// Toggle
document.documentElement.classList.toggle("dark");

// Set explicitly
document.documentElement.classList.add("dark");    // Dark mode
document.documentElement.classList.remove("dark"); // Light mode

// Check current mode
const isDark = document.documentElement.classList.contains("dark");
```

---

## System Preference

Respect user's OS setting:

```js
// Match system preference
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.documentElement.classList.add("dark");
}

// Watch for changes
window.matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    document.documentElement.classList.toggle("dark", e.matches);
  });
```

---

## PrimeVue Setup

```js
app.use(PrimeVue, {
  theme: {
    preset: BCCPreset,
    options: { darkModeSelector: ".dark" },
  },
});
```

---

## Do's and Don'ts

| Do | Don't |
|----|-------|
| Use semantic tokens: `bg-elevation-surface-default` | Use hardcoded colors: `bg-white` |
| Use `text-default` for text | Use `text-black` or `text-white` |
| Test in both modes | Assume light mode only |
