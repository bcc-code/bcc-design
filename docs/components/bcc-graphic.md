---
title: BccGraphic
order: 54
---

# BccGraphic

Decorative graphic element with banner image, logo overlay, and corner slots.

## Preview

[Open in Storybook →](https://components.bcc.no/?path=/docs/custom-bccgraphic--docs)

## When to use

- For hero/banner sections with overlaid logos
- For event or article card headers
- When you need a styled image with aspect ratio control

## Installation

```bash
npm install @bcc-code/component-library-vue
```

## Usage

```vue
<script setup>
import { BccGraphic } from "@bcc-code/component-library-vue";
</script>

<template>
  <BccGraphic bannerSrc="/images/banner.jpg" logoSrc="/images/logo.svg" ratio="wide" />
</template>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `bannerSrc` | `string` | — | Background image URL |
| `logoSrc` | `string` | — | Overlay logo image URL |
| `rounding` | `'none' \| 'sm' \| 'base' \| 'md' \| 'xl'` | — | Corner rounding |
| `ratio` | `'ultraWide' \| 'wide' \| 'landscape' \| 'square' \| 'portrait' \| string` | — | Aspect ratio (preset or custom `w/h`) |
| `grayscale` | `boolean` | — | Apply grayscale filter to banner |

## Slots

| Slot | Description |
| ---- | ----------- |
| `top-left` | Top-left corner overlay |
| `top-right` | Top-right corner overlay |
| `bottom-left` | Bottom-left corner overlay |
| `bottom-right` | Bottom-right corner overlay |

## Links

- [Storybook →](https://components.bcc.no/?path=/docs/custom-bccgraphic--docs)

<!-- TODO: Add Figma embed -->
