---
title: Button
order: 2
---

# Button

Triggers an action or event. Supports icons, severities, sizes, and context-aware styling.

## Preview

[Open in Storybook →](https://components.bcc.no/?path=/docs/wrapped-bccbutton--docs)

## When to use

- To trigger an action (submit, save, delete)
- As a call-to-action in forms or pages
- For navigation when styled as a link button

## Usage

```vue
<template>
  <Button label="Save" />
  <Button label="Cancel" severity="secondary" outlined />
  <Button label="Delete" severity="danger" />
</template>
```

### With icons

```vue
<script setup>
import { CheckIcon } from "@bcc-code/icons-vue";
</script>

<template>
  <BccButton label="Confirm" :icon="CheckIcon" />
  <BccButton label="Next" :icon="ArrowForwardIcon" icon-right />
</template>
```

### Sizes

```vue
<template>
  <Button label="Small" size="small" />
  <Button label="Default" />
  <Button label="Large" size="large" />
</template>
```

### Severities

```vue
<template>
  <Button label="Primary" />
  <Button label="Contrast" severity="contrast" />
  <Button label="Success" severity="success" />
  <Button label="Info" severity="info" />
  <Button label="Warning" severity="warn" />
  <Button label="Danger" severity="danger" />
</template>
```

## Do's and Don'ts

| Do | Don't |
| -- | ----- |
| Use a single primary button per section | Use multiple primary buttons side by side |
| Use `severity` for semantic meaning | Use color classes directly on buttons |
| Keep labels short and action-oriented | Use vague labels like "Click here" |

## Links

- [Storybook →](https://components.bcc.no/?path=/docs/wrapped-bccbutton--docs)
- [PrimeVue Button Docs →](https://primevue.org/button/)

<!-- TODO: Add Figma embed -->
