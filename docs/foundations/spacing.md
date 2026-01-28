---
sectionTitle: Foundations
sectionOrder: 20
title: Spacing
order: 3
---

# Spacing

Consistent spacing creates visual harmony and helps users understand relationships between elements. Use spacing tokens instead of arbitrary pixel values.

## Base Unit

The spacing scale is built on an **8px base unit**. Token values are multiples of this base (e.g., `spacing.100` = 1× = 8px, `spacing.200` = 2× = 16px).

## Scale

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

## When to Use Each Size

### Small (2-8px)

Use for tight, related elements:

- Gap between icon and text
- Padding inside compact components
- Spacing between form label and input

### Medium (12-24px)

Use for component-level spacing:

- Padding inside buttons and cards
- Gap between list items
- Spacing between related form fields

### Large (32-80px)

Use for layout and sections:

- Margins between page sections
- Padding around main content areas
- Spacing between unrelated groups

## Negative Spacing

Use negative values to pull elements closer or overlap containers. Common for breaking out of parent padding.

| Token                  | Tailwind         | CSS                      | Value            |
| ---------------------- | ---------------- | ------------------------ | ---------------- |
| `spacing.negative.25`  | `-*-spacing-25`  | `--spacing-negative-25`  | -0.125rem (-2px) |
| `spacing.negative.50`  | `-*-spacing-50`  | `--spacing-negative-50`  | -0.25rem (-4px)  |
| `spacing.negative.75`  | `-*-spacing-75`  | `--spacing-negative-75`  | -0.375rem (-6px) |
| `spacing.negative.100` | `-*-spacing-100` | `--spacing-negative-100` | -0.5rem (-8px)   |
| `spacing.negative.150` | `-*-spacing-150` | `--spacing-negative-150` | -0.75rem (-12px) |
| `spacing.negative.200` | `-*-spacing-200` | `--spacing-negative-200` | -1rem (-16px)    |
| `spacing.negative.250` | `-*-spacing-250` | `--spacing-negative-250` | -1.25rem (-20px) |
| `spacing.negative.300` | `-*-spacing-300` | `--spacing-negative-300` | -1.5rem (-24px)  |
| `spacing.negative.400` | `-*-spacing-400` | `--spacing-negative-400` | -2rem (-32px)    |

## Guidelines

| Do                                              | Don't                                      |
| ----------------------------------------------- | ------------------------------------------ |
| Use spacing tokens (`p-spacing-100`)            | Use arbitrary values (`p-[7px]`)           |
| Group related items with smaller spacing        | Use the same spacing everywhere            |
| Increase spacing to separate unrelated sections | Cram elements together to save space       |
| Be consistent within similar components         | Mix different spacing for the same purpose |
