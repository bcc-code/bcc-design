---
title: BccBadge
order: 50
---

# BccBadge

Context-aware badge for displaying counts, short text, or icons. Supports semantic colors, sizes, borders, and pill or squared shapes.

## Preview

[Open in Storybook →](https://components.bcc.no/?path=/docs/custom-bccbadge--docs)

## When to use

- To show a count (notifications, items)
- To label status or category with semantic color
- As an icon badge for compact indicators

## Installation

```bash
npm install @bcc-code/component-library-vue
```

## Usage

```vue
<script setup>
import { BccBadge } from "@bcc-code/component-library-vue";
</script>

<template>
  <BccBadge value="5" />
  <BccBadge value="New" context="info" squared />
  <BccBadge value="3" context="danger" />
</template>
```

### Contexts

```vue
<template>
  <BccBadge value="Default" />
  <BccBadge value="Info" context="info" />
  <BccBadge value="Success" context="success" />
  <BccBadge value="Warning" context="warning" />
  <BccBadge value="Danger" context="danger" />
</template>
```

### Sizes

```vue
<template>
  <BccBadge value="5" size="sm" />
  <BccBadge value="5" size="md" />
  <BccBadge value="5" size="lg" />
  <BccBadge value="5" size="xl" />
</template>
```

### With icons

```vue
<script setup>
import { BccBadge } from "@bcc-code/component-library-vue";
import { CheckIcon } from "@bcc-code/icons-vue";
</script>

<template>
  <BccBadge :value="CheckIcon" context="success" />
</template>
```

### Bordered and squared

```vue
<template>
  <BccBadge value="Draft" bordered squared context="orange-subtler" />
</template>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `value` | `string \| number \| VueComponent` | — | Content: number, text, or icon component |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Badge size |
| `context` | `BCC_CONTEXT` | `'neutral-subtle'` | Semantic color context |
| `bordered` | `boolean` | `false` | Adds a 2px border |
| `border` | `boolean` | `false` | Adds a 1px border |
| `squared` | `boolean` | `false` | Square corners instead of pill shape |

## Links

- [Storybook →](https://components.bcc.no/?path=/docs/custom-bccbadge--docs)

<!-- TODO: Add Figma embed -->
