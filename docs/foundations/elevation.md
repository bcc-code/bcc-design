---
sectionTitle: Foundations
sectionOrder: 20
title: Elevation
order: 9
---

# Elevation

Surfaces and shadows create depth. Pair surface colors with shadows.

## Levels

| Level   | Use for                              |
| ------- | ------------------------------------ |
| Sunken  | Sidebars, page backgrounds           |
| Default | Main content, containers             |
| Raised  | Cards, interactive tiles             |
| Overlay | Modals, dropdowns, tooltips          |

## Surface Tokens

| Token                             | Tailwind                       | CSS                                 |
| --------------------------------- | ------------------------------ | ----------------------------------- |
| `color.elevation.surface.sunken`  | `bg-elevation-surface-sunken`  | `--color-elevation-surface-sunken`  |
| `color.elevation.surface.default` | `bg-elevation-surface-default` | `--color-elevation-surface-default` |
| `color.elevation.surface.raised`  | `bg-elevation-surface-raised`  | `--color-elevation-surface-raised`  |
| `color.elevation.surface.overlay` | `bg-elevation-surface-overlay` | `--color-elevation-surface-overlay` |

## Shadow Tokens

| Token             | Tailwind          | CSS                 | Use for                     |
| ----------------- | ----------------- | ------------------- | --------------------------- |
| `shadow.raised`   | `shadow-raised`   | `--shadow-raised`   | Cards with subtle lift      |
| `shadow.overlay`  | `shadow-overlay`  | `--shadow-overlay`  | Modals, dropdowns, popovers |
| `shadow.overflow` | `shadow-overflow` | `--shadow-overflow` | Scroll indicators           |

## Interaction States

| Token                             | Tailwind                       | CSS                                 |
| --------------------------------- | ------------------------------ | ----------------------------------- |
| `color.elevation.surface.hovered` | `bg-elevation-surface-hovered` | `--color-elevation-surface-hovered` |
| `color.elevation.surface.pressed` | `bg-elevation-surface-pressed` | `--color-elevation-surface-pressed` |

## Guidelines

| Do                                        | Don't                                 |
| ----------------------------------------- | ------------------------------------- |
| Pair raised surfaces with `shadow-raised` | Use raised surfaces without shadows   |
| Use overlay for floating UI only          | Stack multiple overlays               |
| Use sunken for recessed backgrounds       | Put sunken on top of raised           |
