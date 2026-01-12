---
sectionTitle: Design
---

# BCC Design System

Build consistent BCC applications with design tokens and components.

## Quick Start

Install the package:

```bash
npm install @bcc-code/design-tokens
```

Import in your CSS:

```css
@import "@bcc-code/design-tokens/tailwind";
```

Use in your HTML:

```html
<div class="bg-elevation-surface-default text-default p-200 radius-md">
  Your content
</div>
```

That's it. You now have access to all BCC design tokens as Tailwind classes.

## Packages

| Package | What it does | Install |
|---------|--------------|---------|
| [@bcc-code/design-tokens](./tokens/) | Colors, typography, spacing as CSS/Tailwind | `npm i @bcc-code/design-tokens` |
| [@bcc-code/icons-vue](./assets/icons/) | 200+ Vue 3 icon components | `npm i @bcc-code/icons-vue` |
| [Logo assets](./assets/logos.md) | CDN-hosted BCC logos | No install needed |

## Common Examples

### Card with proper spacing

```html
<div class="bg-elevation-surface-default p-300 radius-lg shadow-sm">
  <h2 class="text-heading-md text-default">Card Title</h2>
  <p class="text-body-md text-secondary mt-100">Card content goes here.</p>
</div>
```

### Button with brand colors

```html
<button class="bg-interactive-brand text-on-interactive px-300 py-100 radius-md">
  Click me
</button>
```

### Using an icon

```vue
<script setup>
import { HomeIcon } from '@bcc-code/icons-vue'
</script>

<template>
  <HomeIcon class="w-6 h-6 text-default" />
</template>
```

## Next Steps

- **[Design Tokens](./tokens/)** - Full token reference and setup options
- **[Guidelines](./tokens/guidelines.md)** - Do's and don'ts for using the system
- **[Icons](./assets/icons/)** - Browse available icons

## Resources

| Resource | Link |
|----------|------|
| Figma tokens | [BCC Foundation - Master](https://www.figma.com/file/jtWn3ebee6bJnWpfZrJzq1/BCC-Foundation---Master) |
| npm | [@bcc-code/design-tokens](https://www.npmjs.com/package/@bcc-code/design-tokens) |
| GitHub | [bcc-code/bcc-design](https://github.com/bcc-code/bcc-design) |
