---
title: BccTag
order: 58
---

# BccTag

Semantic tag with context colors, icons, and optional click behavior. Built on top of BccBadge.

## Preview

[Open in Storybook →](https://components.bcc.no/?path=/docs/custom-bcctag--docs)

## When to use

- For labels with semantic meaning (status, category)
- When tags need icons or click actions
- For richer tag variants beyond PrimeVue Tag

## Installation

```bash
npm install @bcc-code/component-library-vue
```

## Usage

```vue
<script setup>
import { BccTag } from "@bcc-code/component-library-vue";
import { CheckIcon } from "@bcc-code/icons-vue";
</script>

<template>
  <BccTag text="Published" :icon="CheckIcon" context="success" />
  <BccTag text="Draft" context="orange-subtler" />
  <BccTag text="Clickable" clickable context="blue-subtler" />
</template>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `text` | `string` | — | Tag label text |
| `icon` | `VueComponent` | — | Left icon component |
| `iconRight` | `VueComponent \| boolean` | — | Right icon or flag |
| `rounded` | `boolean` | — | Rounded corners (pill shape) |
| `clickable` | `boolean` | — | Pointer/hover styles |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tag size (inherited from BccBadge) |
| `context` | `BCC_CONTEXT` | `'neutral-subtle'` | Semantic color context |
| `bordered` | `boolean` | `false` | 2px border |

## Links

- [Storybook →](https://components.bcc.no/?path=/docs/custom-bcctag--docs)

<!-- TODO: Add Figma embed -->
