---
sectionTitle: Resources
sectionOrder: 30
title: Icons
order: 1
---

# Icons

SVG icons based on [Material Symbols](https://fonts.google.com/icons) with **Weight 400**, **Grade 0**, **Size 24**.

## Quick Start

```vue
<script setup>
import { SearchIcon } from '@bcc-code/icons-vue'
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

| Icon | Import |
|------|--------|
| Search | `SearchIcon` |
| Home | `HomeIcon` |
| Menu | `MenuIcon` |
| Settings | `SettingsIcon` |

### Sizing and Color

Style icons with Tailwind utility classes:

```vue
<!-- Small, gray icon -->
<SearchIcon class="h-4 w-4 text-neutral-500" />

<!-- Medium, primary color -->
<SearchIcon class="h-6 w-6 text-primary" />

<!-- Large, custom color -->
<SearchIcon class="h-8 w-8 text-blue-600" />
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
