---
sectionTitle: Foundations
sectionOrder: 20
title: Spacing
order: 3
---

# Spacing

::: warning Work in Progress
This section is under development.
:::

**Always use design token spacing** (`p-spacing-100`, `m-spacing-200`) for consistent design. Standard Tailwind spacing (`p-2`, `m-4`) is available as a fallback for edge cases only.

## Spacing Scale

Use the `*-spacing-{value}` pattern where `*` = `p`, `m`, `gap`, `px`, `py`, `mx`, `my`, etc.

| Token          | Tailwind         | CSS              | Value          |
| -------------- | ---------------- | ---------------- | -------------- |
| `spacing.0`    | `*-spacing-0`    | `--spacing-0`    | 0              |
| `spacing.25`   | `*-spacing-25`   | `--spacing-25`   | 0.125rem (2px) |
| `spacing.50`   | `*-spacing-50`   | `--spacing-50`   | 0.25rem (4px)  |
| `spacing.75`   | `*-spacing-75`   | `--spacing-75`   | 0.375rem (6px) |
| `spacing.100`  | `*-spacing-100`  | `--spacing-100`  | 0.5rem (8px)   |
| `spacing.150`  | `*-spacing-150`  | `--spacing-150`  | 0.75rem (12px) |
| `spacing.200`  | `*-spacing-200`  | `--spacing-200`  | 1rem (16px)    |
| `spacing.250`  | `*-spacing-250`  | `--spacing-250`  | 1.25rem (20px) |
| `spacing.300`  | `*-spacing-300`  | `--spacing-300`  | 1.5rem (24px)  |
| `spacing.400`  | `*-spacing-400`  | `--spacing-400`  | 2rem (32px)    |
| `spacing.500`  | `*-spacing-500`  | `--spacing-500`  | 2.5rem (40px)  |
| `spacing.600`  | `*-spacing-600`  | `--spacing-600`  | 3rem (48px)    |
| `spacing.800`  | `*-spacing-800`  | `--spacing-800`  | 4rem (64px)    |
| `spacing.1000` | `*-spacing-1000` | `--spacing-1000` | 5rem (80px)    |

## Negative Spacing

| Token                  | Tailwind          | CSS                      | Value            |
| ---------------------- | ----------------- | ------------------------ | ---------------- |
| `spacing.negative.25`  | `-*-spacing-25`   | `--spacing-negative-25`  | -0.125rem (-2px) |
| `spacing.negative.50`  | `-*-spacing-50`   | `--spacing-negative-50`  | -0.25rem (-4px)  |
| `spacing.negative.75`  | `-*-spacing-75`   | `--spacing-negative-75`  | -0.375rem (-6px) |
| `spacing.negative.100` | `-*-spacing-100`  | `--spacing-negative-100` | -0.5rem (-8px)   |
| `spacing.negative.150` | `-*-spacing-150`  | `--spacing-negative-150` | -0.75rem (-12px) |
| `spacing.negative.200` | `-*-spacing-200`  | `--spacing-negative-200` | -1rem (-16px)    |
| `spacing.negative.250` | `-*-spacing-250`  | `--spacing-negative-250` | -1.25rem (-20px) |
| `spacing.negative.300` | `-*-spacing-300`  | `--spacing-negative-300` | -1.5rem (-24px)  |
| `spacing.negative.400` | `-*-spacing-400`  | `--spacing-negative-400` | -2rem (-32px)    |

## Border Radius

| Token         | Tailwind       | CSS             | Value          |
| ------------- | -------------- | --------------- | -------------- |
| `radius.none` | `rounded-none` | `--radius-none` | 0              |
| `radius.2xs`  | `rounded-2xs`  | `--radius-2xs`  | 0.125rem (2px) |
| `radius.xs`   | `rounded-xs`   | `--radius-xs`   | 0.25rem (4px)  |
| `radius.sm`   | `rounded-sm`   | `--radius-sm`   | 0.375rem (6px) |
| `radius.md`   | `rounded-md`   | `--radius-md`   | 0.5rem (8px)   |
| `radius.lg`   | `rounded-lg`   | `--radius-lg`   | 0.75rem (12px) |
| `radius.xl`   | `rounded-xl`   | `--radius-xl`   | 1rem (16px)    |
| `radius.2xl`  | `rounded-2xl`  | `--radius-2xl`  | 1.5rem (24px)  |
| `radius.3xl`  | `rounded-3xl`  | `--radius-3xl`  | 2rem (32px)    |
| `radius.4xl`  | `rounded-4xl`  | `--radius-4xl`  | 3rem (48px)    |
| `radius.full` | `rounded-full` | `--radius-full` | 999px          |

## Border Width

| Token            | Tailwind   | CSS                 | Value |
| ---------------- | ---------- | ------------------- | ----- |
| `border.width.0` | `border-0` | `--border-width-0`  | 0     |
| `border.width.1` | `border-1` | `--border-width-1`  | 1px   |
| `border.width.2` | `border-2` | `--border-width-2`  | 2px   |

## Shadow

| Token             | Tailwind          | CSS                 | Description                 |
| ----------------- | ----------------- | ------------------- | --------------------------- |
| `shadow.raised`   | `shadow-raised`   | `--shadow-raised`   | Subtle elevation for cards  |
| `shadow.overlay`  | `shadow-overlay`  | `--shadow-overlay`  | Modals, dropdowns, popovers |
| `shadow.overflow` | `shadow-overflow` | `--shadow-overflow` | Scroll indicators           |

## Icon Size

| Token          | Tailwind  | CSS              | Value |
| -------------- | --------- | ---------------- | ----- |
| `icon.size.xs` | `icon-xs` | `--icon-size-xs` | 12px  |
| `icon.size.sm` | `icon-sm` | `--icon-size-sm` | 16px  |
| `icon.size.md` | `icon-md` | `--icon-size-md` | 20px  |
| `icon.size.lg` | `icon-lg` | `--icon-size-lg` | 24px  |
| `icon.size.xl` | `icon-xl` | `--icon-size-xl` | 32px  |
