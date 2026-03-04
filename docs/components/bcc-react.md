---
title: BccReact
order: 60
---

# BccReact

Emoji reaction component with a picker and count display.

## When to use

- For social-style emoji reactions on content
- In comment sections, posts, or feedback areas
- When users should be able to react with emojis

## Installation

```bash
npm install @bcc-code/component-library-vue
```

## Usage

```vue
<script setup>
import { ref } from "vue";
import { BccReact } from "@bcc-code/component-library-vue";

const emojis = ref([
  { id: "thumbsup", emoji: "👍", count: 3, selected: false },
  { id: "heart", emoji: "❤️", count: 1, selected: true },
  { id: "laugh", emoji: "😂", count: 0, selected: false },
]);

const onToggle = (id) => {
  const emoji = emojis.value.find((e) => e.id === id);
  if (emoji) {
    emoji.selected = !emoji.selected;
    emoji.count += emoji.selected ? 1 : -1;
  }
};
</script>

<template>
  <BccReact :emojis="emojis" @toggle="onToggle" />
</template>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `emojis` | `ReactInfo[]` | — | Array of reaction options |
| `top` | `boolean` | `false` | Position picker above the list |
| `placeholder` | `string` | `'Be the first to react 😉'` | Empty state message |

### ReactInfo type

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | `string` | Unique identifier |
| `emoji` | `string` | Emoji character |
| `count` | `number` | Reaction count |
| `selected` | `boolean` | Whether current user selected it |

## Events

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `toggle` | `string` (id) | Fired when a reaction is toggled |

## Links

- [Source](https://github.com/bcc-code/bcc-design/tree/main/component-library/src/components/custom/BccReact)

<!-- TODO: Add Figma embed -->
