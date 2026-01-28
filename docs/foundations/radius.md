---
sectionTitle: Foundations
sectionOrder: 20
title: Radius
order: 11
---

# Radius

Border radius tokens for consistent corner roundness.

## Scale

| Token         | Tailwind       | CSS             | Value          | Use for                           |
| ------------- | -------------- | --------------- | -------------- | --------------------------------- |
| `radius.none` | `rounded-none` | `--radius-none` | 0              | Sharp corners, tables             |
| `radius.2xs`  | `rounded-2xs`  | `--radius-2xs`  | 0.125rem (2px) | Badges, checkboxes                |
| `radius.xs`   | `rounded-xs`   | `--radius-xs`   | 0.25rem (4px)  | Tags, tooltips                    |
| `radius.sm`   | `rounded-sm`   | `--radius-sm`   | 0.375rem (6px) | Buttons, inputs                   |
| `radius.md`   | `rounded-md`   | `--radius-md`   | 0.5rem (8px)   | Cards, dropdowns                  |
| `radius.lg`   | `rounded-lg`   | `--radius-lg`   | 0.75rem (12px) | Modals, panels                    |
| `radius.xl`   | `rounded-xl`   | `--radius-xl`   | 1rem (16px)    | Feature sections                  |
| `radius.2xl`  | `rounded-2xl`  | `--radius-2xl`  | 1.5rem (24px)  | Hero sections                     |
| `radius.3xl`  | `rounded-3xl`  | `--radius-3xl`  | 2rem (32px)    | Decorative elements               |
| `radius.4xl`  | `rounded-4xl`  | `--radius-4xl`  | 3rem (48px)    | Decorative elements               |
| `radius.full` | `rounded-full` | `--radius-full` | 999px          | Avatars, pills, circular buttons  |

## Common Patterns

| Component | Radius         |
| --------- | -------------- |
| Buttons   | `rounded-sm`   |
| Inputs    | `rounded-sm`   |
| Cards     | `rounded-md`   |
| Modals    | `rounded-lg`   |
| Avatars   | `rounded-full` |
| Badges    | `rounded-2xs`  |
| Tags      | `rounded-xs`   |

## Guidelines

| Do                                              | Don't                                       |
| ----------------------------------------------- | ------------------------------------------- |
| Use consistent radius within component families | Mix different radii on similar components   |
| Match nested element radii to their container   | Use sharp corners inside rounded containers |
| Use `rounded-full` for circular elements only   | Apply `rounded-full` to rectangular content |
