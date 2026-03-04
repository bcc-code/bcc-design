---
sectionTitle: Releases
sectionOrder: 40
title: What's new
order: 1
---

# What's new

[![npm version](https://img.shields.io/npm/v/@bcc-code/design-tokens)](https://www.npmjs.com/package/@bcc-code/design-tokens)

Track changes to `@bcc-code/design-tokens`. For installation instructions, see [Getting Started: Develop](../getting-started/develop.md).

## v5.1.1 (2026-02-26)

- Primitive references in PrimeVue config now resolve to `var()` instead of concrete values
- Removed font import from generated `auto.css` output
- Added message text line-height override

## v5.1.0 (2026-02-23)

- PrimeVue component tokens now use CSS `var()` references for theme-agnostic light/dark switching
- Auto-import BCC CSS and Archivo font in generated PrimeVue config
- Added TypeScript `.d.ts` declarations for all CSS module imports

## v5.0.0 (2026-01-28)

**Spacing utility format change**: Spacing utilities now use the `*-spacing-{value}` pattern (e.g., `p-spacing-100`, `m-spacing-200`) instead of the previous `*-{value}` format (e.g., `p-100`, `m-200`).

See the [Spacing documentation](../foundations/spacing.md) for the updated token reference.

## Changelog

See the full changelog in the [bcc-tokens repository](https://github.com/bcc-code/bcc-tokens/blob/main/CHANGELOG.md).
