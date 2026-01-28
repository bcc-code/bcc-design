---
sectionTitle: Foundations
sectionOrder: 20
title: Icons
order: 6
---

# Icons

::: warning Work in Progress
The icons package is being updated for PrimeVue compatibility. The documentation below may not work as expected.
:::

SVG icons based on [Material Symbols](https://fonts.google.com/icons) with **Weight 400**, **Grade 0**, **Size 24**.

## Quick Start

```vue
<script setup>
import { SearchIcon } from "@bcc-code/icons-vue";
</script>

<template>
  <SearchIcon class="h-6 w-6 text-blue-500" />
</template>
```

## Installation

```bash
npm install @bcc-code/icons-vue
```

## Usage

Icons use PascalCase naming with an `Icon` suffix.

| Icon     | Import         |
| -------- | -------------- |
| Search   | `SearchIcon`   |
| Home     | `HomeIcon`     |
| Menu     | `MenuIcon`     |
| Settings | `SettingsIcon` |

### Sizing

Use icon size tokens for consistent sizing:

| Token          | Tailwind  | CSS              | Value |
| -------------- | --------- | ---------------- | ----- |
| `icon.size.xs` | `icon-xs` | `--icon-size-xs` | 12px  |
| `icon.size.sm` | `icon-sm` | `--icon-size-sm` | 16px  |
| `icon.size.md` | `icon-md` | `--icon-size-md` | 20px  |
| `icon.size.lg` | `icon-lg` | `--icon-size-lg` | 24px  |
| `icon.size.xl` | `icon-xl` | `--icon-size-xl` | 32px  |

```vue
<SearchIcon class="icon-sm text-subtle" />
<SearchIcon class="icon-md text-default" />
<SearchIcon class="icon-lg text-brand-default" />
```

## Browse Available Icons

- [Browse all icons on UNPKG](https://unpkg.com/browse/@bcc-code/icons-vue)
- [View in Figma](https://www.figma.com/file/jtWn3ebee6bJnWpfZrJzq1/BCC-Foundation---Master?type=design&node-id=772-438&mode=dev)

## Raw SVG (Non-Vue Projects)

For projects without Vue, use the base icons package:

```bash
npm install @bcc-code/icons
```

Import SVG files directly or copy from Figma.
