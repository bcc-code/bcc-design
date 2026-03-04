---
title: BccCircleLoader
order: 59
---

# BccCircleLoader

Circular loading spinner using animated SVG circles.

## When to use

- As a loading indicator for buttons or small areas
- When you need a lightweight, icon-sized spinner
- As an alternative to ProgressSpinner for smaller contexts

## Installation

```bash
npm install @bcc-code/component-library-vue
```

## Usage

```vue
<script setup>
import { BccCircleLoader } from "@bcc-code/component-library-vue";
</script>

<template>
  <BccCircleLoader />
</template>
```

The component inherits `currentColor` for its color and has a default size of `size-3` (12px). Override size with utility classes:

```vue
<template>
  <BccCircleLoader class="size-6 text-brand" />
</template>
```

## Props

No props. Style with CSS classes for size and color.

## Links

- [Source](https://github.com/bcc-code/bcc-design/tree/main/component-library/src/components/custom/BccCircleLoader)

<!-- TODO: Add Figma embed -->
