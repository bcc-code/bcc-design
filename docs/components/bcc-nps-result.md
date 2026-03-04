---
title: BccNpsResult
order: 55
---

# BccNpsResult

NPS (Net Promoter Score) result visualization with an animated gauge.

## Preview

[Open in Storybook →](https://components.bcc.no/?path=/docs/feedback-bccnpsresult--docs)

## When to use

- To display NPS survey results
- For dashboard widgets showing satisfaction scores

## Installation

```bash
npm install @bcc-code/component-library-vue
```

## Usage

```vue
<script setup>
import { BccNpsResult } from "@bcc-code/component-library-vue";
</script>

<template>
  <BccNpsResult :score="42" />
</template>
```

### With custom display

```vue
<template>
  <BccNpsResult :score="42" display="Great" underline="NPS Score: 42" />
</template>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `score` | `number` | — | NPS score (-100 to 100) |
| `size` | `'lg' \| 'md' \| 'sm' \| 'xs'` | `'md'` | Gauge size |
| `display` | `string` | — | Custom heading text (defaults to score) |
| `underline` | `string` | — | Secondary label under heading |
| `hideText` | `boolean` | `false` | Hide heading and underline |
| `animated` | `boolean` | `true` | Animate needle on mount |

## Links

- [Storybook →](https://components.bcc.no/?path=/docs/feedback-bccnpsresult--docs)

<!-- TODO: Add Figma embed -->
