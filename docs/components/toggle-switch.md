---
title: ToggleSwitch
order: 12
---

# ToggleSwitch

On/off toggle control for boolean settings.

## Preview

[Open in Storybook →](https://components.bcc.no/?path=/docs/wrapped-bcctoggle--docs)

## When to use

- For on/off or enabled/disabled settings
- When the effect is immediate (no form submission needed)

## Usage

```vue
<script setup>
import { ref } from "vue";

const enabled = ref(false);
</script>

<template>
  <ToggleSwitch v-model="enabled" />
</template>
```

## Links

- [Storybook →](https://components.bcc.no/?path=/docs/wrapped-bcctoggle--docs)
- [PrimeVue Docs →](https://primevue.org/toggleswitch/)

<!-- TODO: Add Figma embed -->
