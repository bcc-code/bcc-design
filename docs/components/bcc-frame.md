---
title: BccFrame
order: 53
---

# BccFrame

Styled content frame/container with elevation and flex alignment options.

## Preview

[Open in Storybook →](https://components.bcc.no/?path=/docs/custom-bccframe--docs)

## When to use

- As a layout wrapper with consistent elevation and rounding
- For card-like containers without PrimeVue Card overhead
- When you need quick flex alignment (center, between, etc.)

## Installation

```bash
npm install @bcc-code/component-library-vue
```

## Usage

```vue
<script setup>
import { BccFrame } from "@bcc-code/component-library-vue";
</script>

<template>
  <BccFrame raised rounded shadow>
    <p>Elevated content</p>
  </BccFrame>
</template>
```

### Centered content

```vue
<template>
  <BccFrame center style="height: 200px">
    <p>Centered vertically and horizontally</p>
  </BccFrame>
</template>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `shadow` | `boolean` | `false` | Drop shadow |
| `rounded` | `boolean` | `false` | Rounded corners |
| `sunken` | `boolean` | `false` | Sunken/inset appearance |
| `raised` | `boolean` | `false` | Raised/elevated appearance |
| `overlay` | `boolean` | `false` | Overlay style (floating) |
| `center` | `boolean` | `false` | Center content on both axes |
| `between` | `boolean` | `false` | Space-between distribution |
| `left` | `boolean` | `false` | Align left |
| `right` | `boolean` | `false` | Align right |
| `top` | `boolean` | `false` | Align top |
| `bottom` | `boolean` | `false` | Align bottom |
| `stretch` | `boolean` | `false` | Stretch children to fill |

## Links

- [Storybook →](https://components.bcc.no/?path=/docs/custom-bccframe--docs)

<!-- TODO: Add Figma embed -->
