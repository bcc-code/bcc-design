---
title: Tabs
order: 38
---

# Tabs

Tabbed content navigation for switching between views.

## Preview

[Open in Storybook →](https://components.bcc.no/?path=/docs/wrapped-bcctabs--docs)

## When to use

- To organize content into distinct sections
- When users need to switch between views without leaving the page

## Usage

```vue
<script setup>
import { BccTabs } from "@bcc-code/component-library-vue";

const tabs = [{ title: "Tab 1" }, { title: "Tab 2" }, { title: "Tab 3" }];
</script>

<template>
  <BccTabs :tabs="tabs">
    <template #tab-0>Content for Tab 1</template>
    <template #tab-1>Content for Tab 2</template>
    <template #tab-2>Content for Tab 3</template>
  </BccTabs>
</template>
```

### With icons

```vue
<script setup>
import { HomeIcon, PersonIcon, SettingsIcon } from "@bcc-code/icons-vue";

const tabs = [
  { title: "Home", icon: HomeIcon },
  { title: "Profile", icon: PersonIcon },
  { title: "Settings", icon: SettingsIcon },
];
</script>

<template>
  <BccTabs :tabs="tabs">
    <template #tab-0>Home content</template>
    <template #tab-1>Profile content</template>
    <template #tab-2>Settings content</template>
  </BccTabs>
</template>
```

## Links

- [Storybook →](https://components.bcc.no/?path=/docs/wrapped-bcctabs--docs)
- [PrimeVue Docs →](https://primevue.org/tabs/)

<!-- TODO: Add Figma embed -->
