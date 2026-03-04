---
title: Button
order: 2
---

<script setup>
import { BccButton } from "@bcc-code/component-library-vue";
import { CheckIcon, ArrowForwardIcon } from "@bcc-code/icons-vue";
</script>

# Button

Triggers an action or event. Supports icons, severities, sizes, and context-aware styling.

<a href="https://components.bcc.no/?path=/docs/wrapped-bccbutton--docs" target="_blank"><BccButton label="Open in Storybook" severity="secondary" /></a>

## When to use

- To trigger an action (submit, save, delete)
- As a call-to-action in forms or pages
- For navigation when styled as a link button

## Default

Standard button variants for primary and secondary actions.

<div class="component-preview">
  <Button label="Save" />
  <Button label="Cancel" severity="secondary" outlined />
  <Button label="Delete" severity="danger" />
</div>

## With icons

Use `BccButton` for Vue component icons via the `icon` prop.

<div class="component-preview">
  <BccButton label="Confirm" :icon="CheckIcon" />
  <BccButton label="Next" :icon="ArrowForwardIcon" icon-right />
</div>

## Sizes

Three sizes for different contexts.

<div class="component-preview">
  <Button label="Small" size="small" />
  <Button label="Default" />
  <Button label="Large" size="large" />
</div>

## Severities

Semantic colors to communicate intent.

<div class="component-preview">
  <Button label="Primary" />
  <Button label="Contrast" severity="contrast" />
  <Button label="Success" severity="success" />
  <Button label="Info" severity="info" />
  <Button label="Warning" severity="warn" />
  <Button label="Danger" severity="danger" />
</div>

## Do's and Don'ts

| Do | Don't |
| -- | ----- |
| Use a single primary button per section | Use multiple primary buttons side by side |
| Use `severity` for semantic meaning | Use color classes directly on buttons |
| Keep labels short and action-oriented | Use vague labels like "Click here" |

## Links

<div style="display: flex; gap: 8px; flex-wrap: wrap;">
  <a href="https://components.bcc.no/?path=/docs/wrapped-bccbutton--docs" target="_blank"><BccButton label="Storybook" severity="secondary" /></a>
  <a href="https://primevue.org/button/" target="_blank"><BccButton label="PrimeVue Docs" severity="secondary" /></a>
</div>
