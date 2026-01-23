---
sectionTitle: Foundations
sectionOrder: 20
title: Tokens
order: 2
---

# Tokens

::: warning Work in Progress
This section is under development.
:::

Design tokens are named entities that store visual design attributes.

::: tip Use semantic tokens
Semantic tokens adapt to light/dark mode automatically and convey meaning. Always prefer semantic tokens over [primitive colors](./colors.md).

| Don't | Do |
|-------|-----|
| `bg-neutral-100` | `bg-elevation-surface-default` |
| `text-neutral-1000` | `text-default` |
| `border-[#ccc]` | `border-default` |
| Hardcoded hex values | Semantic tokens |
| Mixing primitives + semantics | Consistent semantic tokens |
:::

## Text

| Token | Tailwind Class | Description | Light | Dark |
|-------|---------------|-------------|-------|------|
| `color.text.default` | `text-default` | Primary text, body copy, headers, buttons | `#292a2e` | `#e2e3e4` |
| `color.text.subtle` | `text-subtle` | Secondary text, descriptions | `#505258` | `#a9abaf` |
| `color.text.subtlest` | `text-subtlest` | Tertiary text, placeholders | `#6b6e76` | `#96999e` |
| `color.text.disabled` | `text-disabled` | Disabled text | `rgba(8,15,33,0.29)` | `rgba(229,233,246,0.25)` |
| `color.text.inverse` | `text-inverse` | Text on dark/light backgrounds | `#ffffff` | `#1f1f21` |
| `color.text.selected` | `text-selected` | Selected/active text | `#014d49` | `#51b9cf` |

### Status Text

| Token | Tailwind Class | Description | Light | Dark |
|-------|---------------|-------------|-------|------|
| `color.text.success` | `text-success` | Success messages | `#094c3b` | `#83d895` |
| `color.text.information` | `text-information` | Informational text | `#273c8f` | `#a6cdfd` |
| `color.text.danger` | `text-danger` | Error messages | `#811436` | `#fab6ad` |
| `color.text.warning.default` | `text-warning-default` | Warning messages | `#653805` | `#e9c348` |

### Brand Text

| Token | Tailwind Class | Description | Light | Dark |
|-------|---------------|-------------|-------|------|
| `color.text.brand.default` | `text-brand-default` | Brand colored text | `#014d49` | `#51b9cf` |
| `color.text.brand.bold` | `text-brand-bold` | Bold brand text | `#0b3633` | `#a0cec8` |

### Links

| Token | Tailwind Class | Description | Light | Dark |
|-------|---------------|-------------|-------|------|
| `color.link.default` | `text-link-default` | Default link color | `#273c8f` | `#608ef6` |
| `color.link.pressed` | `text-link-pressed` | Pressed link | `#212c64` | `#446add` |
| `color.link.visited.default` | `text-link-visited` | Visited link | `#493481` | `#a78bfa` |

## Icon

| Token | Tailwind Class | Description | Light | Dark |
|-------|---------------|-------------|-------|------|
| `color.icon.default` | `text-icon-default` | Primary icons | `#1e1f21` | `#cecfd2` |
| `color.icon.subtle` | `text-icon-subtle` | Secondary icons | `#505258` | `#a9abaf` |
| `color.icon.subtlest` | `text-icon-subtlest` | Tertiary icons | `#6b6e76` | `#96999e` |
| `color.icon.disabled` | `text-icon-disabled` | Disabled icons | `rgba(8,15,33,0.29)` | `rgba(229,233,246,0.25)` |
| `color.icon.inverse` | `text-icon-inverse` | Icons on dark/light bg | `#ffffff` | `#1f1f21` |
| `color.icon.selected` | `text-icon-selected` | Selected icons | `#0c625c` | `#51b9cf` |
| `color.icon.success` | `text-icon-success` | Success icons | `#09825d` | `#1ca673` |
| `color.icon.information` | `text-icon-information` | Info icons | `#446add` | `#608ef6` |
| `color.icon.danger` | `text-icon-danger` | Error icons | `#ca414e` | `#ed6362` |
| `color.icon.warning.default` | `text-icon-warning-default` | Warning icons | `#b55919` | `#e9c348` |

## Border

| Token | Tailwind Class | Description | Light | Dark |
|-------|---------------|-------------|-------|------|
| `color.border.default` | `border-default` | Default borders | `rgba(11,18,14,0.14)` | `rgba(227,228,242,0.12)` |
| `color.border.bold` | `border-bold` | Bold/emphasized borders | `#7d818a` | `#7e8188` |
| `color.border.disabled` | `border-disabled` | Disabled borders | `rgba(5,21,36,0.06)` | `rgba(206,206,217,0.07)` |
| `color.border.selected` | `border-selected` | Selected state | `#0c625c` | `#51b9cf` |
| `color.border.focused` | `border-focused` | Focus ring | `#1a9eb7` | `#a0cec8` |
| `color.border.inverse` | `border-inverse` | Borders on dark/light bg | `#ffffff` | `#18191a` |
| `color.border.input` | `border-input` | Input field borders | `#8c8f97` | `#63666b` |

### Status Borders

| Token | Tailwind Class | Description | Light | Dark |
|-------|---------------|-------------|-------|------|
| `color.border.success` | `border-success` | Success borders | `#09825d` | `#1ca673` |
| `color.border.information` | `border-information` | Info borders | `#446add` | `#608ef6` |
| `color.border.danger` | `border-danger` | Error borders | `#ca414e` | `#ed6362` |
| `color.border.warning` | `border-warning` | Warning borders | `#b55919` | `#bc870d` |
| `color.border.brand` | `border-brand` | Brand borders | `#0c625c` | `#51b9cf` |

## Background - Elevation

| Token | Tailwind Class | Description | Light | Dark |
|-------|---------------|-------------|-------|------|
| `color.elevation.surface.default` | `bg-elevation-surface-default` | Default page background | `#ffffff` | `#1f1f21` |
| `color.elevation.surface.hovered` | `bg-elevation-surface-hovered` | Hovered surface | `#f0f1f2` | `#242528` |
| `color.elevation.surface.pressed` | `bg-elevation-surface-pressed` | Pressed surface | `#dddee1` | `#303134` |
| `color.elevation.surface.sunken` | `bg-elevation-surface-sunken` | Recessed areas | `#f8f8f8` | `#18191a` |
| `color.elevation.surface.raised` | `bg-elevation-surface-raised` | Cards, raised elements | `#ffffff` | `#242528` |
| `color.elevation.surface.overlay` | `bg-elevation-surface-overlay` | Modals, dropdowns | `#ffffff` | `#242528` |

## Background - Input

| Token | Tailwind Class | Description | Light | Dark |
|-------|---------------|-------------|-------|------|
| `color.background.input.default` | `bg-input-default` | Input background | `#ffffff` | `#242528` |
| `color.background.input.hovered` | `bg-input-hovered` | Hovered input | `#f8f8f8` | `#303134` |
| `color.background.input.pressed` | `bg-input-pressed` | Pressed input | `#ffffff` | `#242528` |

## Background - Selected

| Token | Tailwind Class | Description | Light | Dark |
|-------|---------------|-------------|-------|------|
| `color.background.selected.default` | `bg-selected-default` | Selected item background | `#f0fcfa` | `#012320` |
| `color.background.selected.hovered` | `bg-selected-hovered` | Hovered selected | `#d2eeeb` | `#0b3633` |
| `color.background.selected.pressed` | `bg-selected-pressed` | Pressed selected | `#a0cec8` | `#014d49` |
| `color.background.selected.bold` | `bg-selected-bold-default` | Bold selected (buttons) | `#0c625c` | `#51b9cf` |

## Background - Status

### Success

| Token | Tailwind Class | Light | Dark |
|-------|---------------|-------|------|
| `color.background.success.default` | `bg-success-default` | `#efffed` | `#012418` |
| `color.background.success.hovered` | `bg-success-hovered` | `#cbf3c9` | `#073734` |
| `color.background.success.pressed` | `bg-success-pressed` | `#83d895` | `#094c3b` |
| `color.background.success.bolder` | `bg-success-bolder-default` | `#0c6241` | `#1ca673` |

### Information

| Token | Tailwind Class | Light | Dark |
|-------|---------------|-------|------|
| `color.background.information.default` | `bg-information-default` | `#f6fbff` | `#0d1a3f` |
| `color.background.information.hovered` | `bg-information-hovered` | `#d9ecff` | `#212c64` |
| `color.background.information.pressed` | `bg-information-pressed` | `#a6cdfd` | `#273c8f` |
| `color.background.information.bolder` | `bg-information-bolder-default` | `#274eb5` | `#608ef6` |

### Danger

| Token | Tailwind Class | Light | Dark |
|-------|---------------|-------|------|
| `color.background.danger.default` | `bg-danger-default` | `#fff8f3` | `#2a0810` |
| `color.background.danger.hovered` | `bg-danger-hovered` | `#fee2dd` | `#630d2e` |
| `color.background.danger.pressed` | `bg-danger-pressed` | `#fab6ad` | `#811436` |
| `color.background.danger.bolder` | `bg-danger-bolder-default` | `#a42237` | `#ed6362` |

### Warning

| Token | Tailwind Class | Light | Dark |
|-------|---------------|-------|------|
| `color.background.warning.default` | `bg-warning-default` | `#fdf8e9` | `#261b00` |
| `color.background.warning.hovered` | `bg-warning-hovered` | `#f8e6a0` | `#4b2c04` |
| `color.background.warning.pressed` | `bg-warning-pressed` | `#e9c348` | `#653805` |
| `color.background.warning.bolder` | `bg-warning-bolder-default` | `#e9c348` | `#e9c348` |

## Background - Brand

| Token | Tailwind Class | Description | Light | Dark |
|-------|---------------|-------------|-------|------|
| `color.background.brand.subtlest` | `bg-brand-subtlest-default` | Lightest brand bg | `#f0fcfa` | `#012320` |
| `color.background.brand.subtler` | `bg-brand-subtler-default` | Lighter brand bg | `#d2eeeb` | `#0b3633` |
| `color.background.brand.subtle` | `bg-brand-subtle-default` | Subtle brand bg | `#51b9cf` | `#014d49` |
| `color.background.brand.bolder` | `bg-brand-bolder-default` | Bold brand bg | `#0c625c` | `#51b9cf` |
| `color.background.brand.boldest` | `bg-brand-boldest-default` | Boldest brand bg | `#012320` | `#a0cec8` |
