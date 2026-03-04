---
title: BccDialKnob
order: 52
---

# BccDialKnob

Rotary dial input control with drag interaction, rendered on canvas.

## Preview

[Open in Storybook →](https://components.bcc.no/?path=/docs/feedback-bccdialknob--docs)

## When to use

- For time offset or duration inputs
- For creative/playful numeric inputs
- When a slider doesn't fit the interaction model

## Installation

```bash
npm install @bcc-code/component-library-vue
```

## Usage

```vue
<script setup>
import { ref } from "vue";
import { BccDialKnob } from "@bcc-code/component-library-vue";

const value = ref(0);
</script>

<template>
  <BccDialKnob v-model="value" :min="-720" :max="720" :steps="15" />
</template>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `modelValue` | `number` | — | Current value (v-model) |
| `size` | `number` | — | Canvas size in pixels |
| `arcWidth` | `number` | — | Arc stroke thickness |
| `min` | `number` | — | Minimum value |
| `max` | `number` | — | Maximum value |
| `steps` | `number` | — | Step size for snapping |
| `colored` | `boolean` | — | Use accent colors for the arc |
| `showHandle` | `boolean` | — | Show drag handle |
| `hideArrows` | `boolean` | — | Hide left/right arrows |

## Slots

| Slot | Description |
| ---- | ----------- |
| `default` | Center label content |
| `left` | Top-left corner content |
| `right` | Top-right corner content |

## Events

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `drag:start` | — | Fired when drag begins |
| `drag:update` | `number` | Fired during drag with current value |
| `drag:end` | — | Fired when drag ends |

## Links

- [Storybook →](https://components.bcc.no/?path=/docs/feedback-bccdialknob--docs)

<!-- TODO: Add Figma embed -->
