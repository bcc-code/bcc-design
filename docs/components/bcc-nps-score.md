---
title: BccNpsScore
order: 56
---

# BccNpsScore

NPS score input widget with a numbered button scale.

## Preview

[Open in Storybook →](https://components.bcc.no/?path=/docs/feedback-bccnpsscore--docs)

## When to use

- For NPS survey question inputs
- When users need to select a score on a numeric scale

## Installation

```bash
npm install @bcc-code/component-library-vue
```

## Usage

```vue
<script setup>
import { ref } from "vue";
import { BccNpsScore } from "@bcc-code/component-library-vue";

const score = ref(null);
</script>

<template>
  <BccNpsScore v-model="score" />
</template>
```

### Custom range and labels

```vue
<template>
  <BccNpsScore
    v-model="score"
    :min="1"
    :max="5"
    leftLabel="Poor"
    rightLabel="Excellent"
  />
</template>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `modelValue` | `number \| null` | `null` | Selected score (v-model) |
| `reverse` | `boolean` | `false` | Reverse visual order |
| `leftLabel` | `string` | `'Not likely'` | Left end label |
| `rightLabel` | `string` | `'Very likely'` | Right end label |
| `labelPosition` | `'top' \| 'bottom'` | — | Label placement |
| `min` | `number` | — | Minimum score |
| `max` | `number` | — | Maximum score |
| `disabled` | `boolean` | `false` | Disable all buttons |

## Links

- [Storybook →](https://components.bcc.no/?path=/docs/feedback-bccnpsscore--docs)

<!-- TODO: Add Figma embed -->
