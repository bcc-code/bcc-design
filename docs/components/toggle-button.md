---
title: ToggleButton
order: 13
---

# ToggleButton

Toggle button with customizable on/off labels.

## Preview

[Open in Storybook →](https://components.bcc.no/?path=/docs/wrapped-bcctogglebutton--docs)

## When to use

- When a toggle needs descriptive labels for each state
- As an alternative to ToggleSwitch with more visual weight

## Usage

```vue
<script setup>
import { ref } from "vue";

const active = ref(false);
</script>

<template>
  <ToggleButton v-model="active" onLabel="Active" offLabel="Inactive" />
</template>
```

## Links

- [Storybook →](https://components.bcc.no/?path=/docs/wrapped-bcctogglebutton--docs)
- [PrimeVue Docs →](https://primevue.org/togglebutton/)

<!-- TODO: Add Figma embed -->
