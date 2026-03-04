---
title: Checkbox
order: 3
---

# Checkbox

Binary selection control for forms. Use with `v-model` for two-way binding.

## Preview

[Open in Storybook →](https://components.bcc.no/?path=/docs/wrapped-bcccheckbox--docs)

## When to use

- To let users select one or more options from a list
- For boolean settings (agree to terms, enable feature)

## Usage

```vue
<script setup>
import { ref } from "vue";

const checked = ref(false);
</script>

<template>
  <div class="flex items-center gap-2">
    <Checkbox v-model="checked" :binary="true" inputId="agree" />
    <label for="agree">I agree to the terms</label>
  </div>
</template>
```

### Checkbox group

```vue
<script setup>
import { ref } from "vue";

const selected = ref([]);
const options = ["Email", "SMS", "Push"];
</script>

<template>
  <div class="flex flex-col gap-2">
    <div v-for="option in options" :key="option" class="flex items-center gap-2">
      <Checkbox v-model="selected" :inputId="option" :value="option" />
      <label :for="option">{{ option }}</label>
    </div>
  </div>
</template>
```

## Links

- [Storybook →](https://components.bcc.no/?path=/docs/wrapped-bcccheckbox--docs)
- [PrimeVue Docs →](https://primevue.org/checkbox/)

<!-- TODO: Add Figma embed -->
