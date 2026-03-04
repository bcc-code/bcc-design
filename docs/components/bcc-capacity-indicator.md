---
title: BccCapacityIndicator
order: 51
---

# BccCapacityIndicator

Visual indicator showing used vs. total capacity with an animated arc.

## Preview

[Open in Storybook →](https://components.bcc.no/?path=/docs/custom-bcccapacityindicator--docs)

## When to use

- To show usage of a limited resource (storage, seats, budget)
- For dashboard widgets displaying capacity at a glance

## Installation

```bash
npm install @bcc-code/component-library-vue
```

## Usage

```vue
<script setup>
import { BccCapacityIndicator } from "@bcc-code/component-library-vue";
</script>

<template>
  <BccCapacityIndicator :total="100" :used="65" />
</template>
```

### With color states

```vue
<template>
  <BccCapacityIndicator :total="100" :used="90" colored />
</template>
```

### Unlimited

```vue
<template>
  <BccCapacityIndicator :total="-1" :used="42" />
</template>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `total` | `number` | — | Total capacity. Use `-1` for unlimited |
| `used` | `number` | `0` | Amount used |
| `size` | `'xs' \| 'sm' \| 'base' \| 'lg'` | `'base'` | Visual size |
| `animationDuration` | `number` | `1000` | Animation duration in ms |
| `squared` | `boolean` | `false` | Rounded square instead of circle |
| `colored` | `boolean` | `false` | Warning/full color states at high usage |

## Links

- [Storybook →](https://components.bcc.no/?path=/docs/custom-bcccapacityindicator--docs)

<!-- TODO: Add Figma embed -->
