---
title: BccStepIndicator
order: 57
---

# BccStepIndicator

Multi-step progress indicator showing current position in a sequence.

## Preview

[Open in Storybook →](https://components.bcc.no/?path=/docs/custom-bccstepindicator--docs)

## When to use

- For multi-step forms or wizards
- To show progress through a sequence of steps

## Installation

```bash
npm install @bcc-code/component-library-vue
```

## Usage

```vue
<script setup>
import { ref } from "vue";
import { BccStepIndicator } from "@bcc-code/component-library-vue";

const step = ref(0);
const steps = ["Personal Info", "Address", "Payment", "Confirm"];
</script>

<template>
  <BccStepIndicator v-model="step" :steps="steps" />
</template>
```

### Clickable steps

```vue
<template>
  <BccStepIndicator v-model="step" :steps="steps" clickable />
</template>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `modelValue` | `number` | `0` | Current step index (v-model) |
| `steps` | `string[]` | — | Array of step labels |
| `additionalText` | `boolean` | `true` | Show "Step X of Y" heading |
| `showStepLabel` | `boolean` | `true` | Show current step label |
| `left` | `boolean` | `false` | Align left |
| `right` | `boolean` | `false` | Align right |
| `context` | `BCC_CONTEXT` | `'brand-bolder'` | Color context |
| `headingFn` | `(current, total) => string` | — | Custom heading text function |
| `clickable` | `boolean` | `false` | Allow clicking steps to navigate |

## Links

- [Storybook →](https://components.bcc.no/?path=/docs/custom-bccstepindicator--docs)

<!-- TODO: Add Figma embed -->
