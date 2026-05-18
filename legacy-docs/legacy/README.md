---
sectionTitle: Legacy
sectionOrder: 50
title: Design System 1.0
---

# Design System 1.0 (Deprecated)

::: warning Deprecation Notice
The design-library packages are deprecated. Use **@bcc-code/design-tokens** with **PrimeVue** instead.
:::

## Storybook

- [Legacy Storybook](https://design-library-dev.developer.bcc.no/)

## Package Status

| Package                      | Status     | Replacement                        |
| ---------------------------- | ---------- | ---------------------------------- |
| @bcc-code/design-library     | Deprecated | @bcc-code/design-tokens + PrimeVue |
| @bcc-code/design-library-vue | Deprecated | PrimeVue components                |

## Migration

1. Remove deprecated packages:

   ```bash
   npm uninstall @bcc-code/design-library @bcc-code/design-library-vue
   ```

2. Install new packages:

   ```bash
   npm install @bcc-code/design-tokens primevue
   ```

3. Update imports to use PrimeVue components with design tokens

See the [Getting Started](../getting-started/) guide for setup instructions.

## Source Code

The legacy design-library source is available on GitHub:
[bcc-code/bcc-design](https://github.com/bcc-code/bcc-design)
