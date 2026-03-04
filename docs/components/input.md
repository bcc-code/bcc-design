---
title: Input
order: 4
---

# Input

Single-line text input field. Wraps PrimeVue InputText with BCC styling.

## Preview

[Open in Storybook →](https://components.bcc.no/?path=/docs/wrapped-bccinput--docs)

## When to use

- For short text entries (name, email, search)
- When you need a simple single-line input

## Usage

```vue
<script setup>
import { ref } from "vue";

const name = ref("");
</script>

<template>
  <InputText v-model="name" placeholder="Enter your name" />
</template>
```

### States

```vue
<template>
  <InputText placeholder="Default" />
  <InputText placeholder="Disabled" disabled />
  <InputText placeholder="Invalid" invalid />
</template>
```

## Links

- [Storybook →](https://components.bcc.no/?path=/docs/wrapped-bccinput--docs)
- [PrimeVue Docs →](https://primevue.org/inputtext/)

<!-- TODO: Add Figma embed -->
