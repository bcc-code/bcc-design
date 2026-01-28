---
sectionTitle: Foundations
sectionOrder: 20
title: Tokens
order: 2
---

# Tokens

Semantic color tokens for text, background, border, and icon. These adapt to light/dark mode automatically.

## Text

| Token                 | Tailwind        | CSS                    | Light                | Dark                     |
| --------------------- | --------------- | ---------------------- | -------------------- | ------------------------ |
| `color.text.default`  | `text-default`  | `--color-text-default` | `#292a2e`            | `#e2e3e4`                |
| `color.text.subtle`   | `text-subtle`   | `--color-text-subtle`  | `#505258`            | `#a9abaf`                |
| `color.text.subtlest` | `text-subtlest` | `--color-text-subtlest`| `#6b6e76`            | `#96999e`                |
| `color.text.disabled` | `text-disabled` | `--color-text-disabled`| `rgba(8,15,33,0.29)` | `rgba(229,233,246,0.25)` |
| `color.text.inverse`  | `text-inverse`  | `--color-text-inverse` | `#ffffff`            | `#1f1f21`                |
| `color.text.selected` | `text-selected` | `--color-text-selected`| `#014d49`            | `#51b9cf`                |

### Status Text

| Token                        | Tailwind               | CSS                             | Light     | Dark      |
| ---------------------------- | ---------------------- | ------------------------------- | --------- | --------- |
| `color.text.success`         | `text-success`         | `--color-text-success`          | `#094c3b` | `#83d895` |
| `color.text.information`     | `text-information`     | `--color-text-information`      | `#273c8f` | `#a6cdfd` |
| `color.text.danger`          | `text-danger`          | `--color-text-danger`           | `#811436` | `#fab6ad` |
| `color.text.warning.default` | `text-warning-default` | `--color-text-warning-default`  | `#653805` | `#e9c348` |

### Brand Text

| Token                      | Tailwind             | CSS                           | Light     | Dark      |
| -------------------------- | -------------------- | ----------------------------- | --------- | --------- |
| `color.text.brand.default` | `text-brand-default` | `--color-text-brand-default`  | `#014d49` | `#51b9cf` |
| `color.text.brand.bold`    | `text-brand-bold`    | `--color-text-brand-bold`     | `#0b3633` | `#a0cec8` |

### Links

| Token                        | Tailwind            | CSS                             | Light     | Dark      |
| ---------------------------- | ------------------- | ------------------------------- | --------- | --------- |
| `color.link.default`         | `text-link-default` | `--color-link-default`          | `#273c8f` | `#608ef6` |
| `color.link.pressed`         | `text-link-pressed` | `--color-link-pressed`          | `#212c64` | `#446add` |
| `color.link.visited.default` | `text-link-visited` | `--color-link-visited-default`  | `#493481` | `#a78bfa` |

## Icon

| Token                        | Tailwind                    | CSS                              | Light                | Dark                     |
| ---------------------------- | --------------------------- | -------------------------------- | -------------------- | ------------------------ |
| `color.icon.default`         | `text-icon-default`         | `--color-icon-default`           | `#1e1f21`            | `#cecfd2`                |
| `color.icon.subtle`          | `text-icon-subtle`          | `--color-icon-subtle`            | `#505258`            | `#a9abaf`                |
| `color.icon.subtlest`        | `text-icon-subtlest`        | `--color-icon-subtlest`          | `#6b6e76`            | `#96999e`                |
| `color.icon.disabled`        | `text-icon-disabled`        | `--color-icon-disabled`          | `rgba(8,15,33,0.29)` | `rgba(229,233,246,0.25)` |
| `color.icon.inverse`         | `text-icon-inverse`         | `--color-icon-inverse`           | `#ffffff`            | `#1f1f21`                |
| `color.icon.selected`        | `text-icon-selected`        | `--color-icon-selected`          | `#0c625c`            | `#51b9cf`                |
| `color.icon.success`         | `text-icon-success`         | `--color-icon-success`           | `#09825d`            | `#1ca673`                |
| `color.icon.information`     | `text-icon-information`     | `--color-icon-information`       | `#446add`            | `#608ef6`                |
| `color.icon.danger`          | `text-icon-danger`          | `--color-icon-danger`            | `#ca414e`            | `#ed6362`                |
| `color.icon.warning.default` | `text-icon-warning-default` | `--color-icon-warning-default`   | `#b55919`            | `#e9c348`                |

## Border

| Token                   | Tailwind          | CSS                       | Light                 | Dark                     |
| ----------------------- | ----------------- | ------------------------- | --------------------- | ------------------------ |
| `color.border.default`  | `border-default`  | `--color-border-default`  | `rgba(11,18,14,0.14)` | `rgba(227,228,242,0.12)` |
| `color.border.bold`     | `border-bold`     | `--color-border-bold`     | `#7d818a`             | `#7e8188`                |
| `color.border.disabled` | `border-disabled` | `--color-border-disabled` | `rgba(5,21,36,0.06)`  | `rgba(206,206,217,0.07)` |
| `color.border.selected` | `border-selected` | `--color-border-selected` | `#0c625c`             | `#51b9cf`                |
| `color.border.focused`  | `border-focused`  | `--color-border-focused`  | `#1a9eb7`             | `#a0cec8`                |
| `color.border.inverse`  | `border-inverse`  | `--color-border-inverse`  | `#ffffff`             | `#18191a`                |
| `color.border.input`    | `border-input`    | `--color-border-input`    | `#8c8f97`             | `#63666b`                |

### Status Borders

| Token                      | Tailwind             | CSS                          | Light     | Dark      |
| -------------------------- | -------------------- | ---------------------------- | --------- | --------- |
| `color.border.success`     | `border-success`     | `--color-border-success`     | `#09825d` | `#1ca673` |
| `color.border.information` | `border-information` | `--color-border-information` | `#446add` | `#608ef6` |
| `color.border.danger`      | `border-danger`      | `--color-border-danger`      | `#ca414e` | `#ed6362` |
| `color.border.warning`     | `border-warning`     | `--color-border-warning`     | `#b55919` | `#bc870d` |
| `color.border.brand`       | `border-brand`       | `--color-border-brand`       | `#0c625c` | `#51b9cf` |

## Background - Elevation

| Token                             | Tailwind                       | CSS                                  | Light     | Dark      |
| --------------------------------- | ------------------------------ | ------------------------------------ | --------- | --------- |
| `color.elevation.surface.default` | `bg-elevation-surface-default` | `--color-elevation-surface-default`  | `#ffffff` | `#1f1f21` |
| `color.elevation.surface.hovered` | `bg-elevation-surface-hovered` | `--color-elevation-surface-hovered`  | `#f0f1f2` | `#242528` |
| `color.elevation.surface.pressed` | `bg-elevation-surface-pressed` | `--color-elevation-surface-pressed`  | `#dddee1` | `#303134` |
| `color.elevation.surface.sunken`  | `bg-elevation-surface-sunken`  | `--color-elevation-surface-sunken`   | `#f8f8f8` | `#18191a` |
| `color.elevation.surface.raised`  | `bg-elevation-surface-raised`  | `--color-elevation-surface-raised`   | `#ffffff` | `#242528` |
| `color.elevation.surface.overlay` | `bg-elevation-surface-overlay` | `--color-elevation-surface-overlay`  | `#ffffff` | `#242528` |

## Background - Input

| Token                            | Tailwind           | CSS                               | Light     | Dark      |
| -------------------------------- | ------------------ | --------------------------------- | --------- | --------- |
| `color.background.input.default` | `bg-input-default` | `--color-background-input-default`| `#ffffff` | `#242528` |
| `color.background.input.hovered` | `bg-input-hovered` | `--color-background-input-hovered`| `#f8f8f8` | `#303134` |
| `color.background.input.pressed` | `bg-input-pressed` | `--color-background-input-pressed`| `#ffffff` | `#242528` |

## Background - Selected

| Token                               | Tailwind                   | CSS                                    | Light     | Dark      |
| ----------------------------------- | -------------------------- | -------------------------------------- | --------- | --------- |
| `color.background.selected.default` | `bg-selected-default`      | `--color-background-selected-default`  | `#f0fcfa` | `#012320` |
| `color.background.selected.hovered` | `bg-selected-hovered`      | `--color-background-selected-hovered`  | `#d2eeeb` | `#0b3633` |
| `color.background.selected.pressed` | `bg-selected-pressed`      | `--color-background-selected-pressed`  | `#a0cec8` | `#014d49` |
| `color.background.selected.bold`    | `bg-selected-bold-default` | `--color-background-selected-bold`     | `#0c625c` | `#51b9cf` |

## Background - Status

### Success

| Token                              | Tailwind                    | CSS                                   | Light     | Dark      |
| ---------------------------------- | --------------------------- | ------------------------------------- | --------- | --------- |
| `color.background.success.default` | `bg-success-default`        | `--color-background-success-default`  | `#efffed` | `#012418` |
| `color.background.success.hovered` | `bg-success-hovered`        | `--color-background-success-hovered`  | `#cbf3c9` | `#073734` |
| `color.background.success.pressed` | `bg-success-pressed`        | `--color-background-success-pressed`  | `#83d895` | `#094c3b` |
| `color.background.success.bolder`  | `bg-success-bolder-default` | `--color-background-success-bolder`   | `#0c6241` | `#1ca673` |

### Information

| Token                                  | Tailwind                        | CSS                                       | Light     | Dark      |
| -------------------------------------- | ------------------------------- | ----------------------------------------- | --------- | --------- |
| `color.background.information.default` | `bg-information-default`        | `--color-background-information-default`  | `#f6fbff` | `#0d1a3f` |
| `color.background.information.hovered` | `bg-information-hovered`        | `--color-background-information-hovered`  | `#d9ecff` | `#212c64` |
| `color.background.information.pressed` | `bg-information-pressed`        | `--color-background-information-pressed`  | `#a6cdfd` | `#273c8f` |
| `color.background.information.bolder`  | `bg-information-bolder-default` | `--color-background-information-bolder`   | `#274eb5` | `#608ef6` |

### Danger

| Token                             | Tailwind                   | CSS                                  | Light     | Dark      |
| --------------------------------- | -------------------------- | ------------------------------------ | --------- | --------- |
| `color.background.danger.default` | `bg-danger-default`        | `--color-background-danger-default`  | `#fff8f3` | `#2a0810` |
| `color.background.danger.hovered` | `bg-danger-hovered`        | `--color-background-danger-hovered`  | `#fee2dd` | `#630d2e` |
| `color.background.danger.pressed` | `bg-danger-pressed`        | `--color-background-danger-pressed`  | `#fab6ad` | `#811436` |
| `color.background.danger.bolder`  | `bg-danger-bolder-default` | `--color-background-danger-bolder`   | `#a42237` | `#ed6362` |

### Warning

| Token                              | Tailwind                    | CSS                                  | Light     | Dark      |
| ---------------------------------- | --------------------------- | ------------------------------------ | --------- | --------- |
| `color.background.warning.default` | `bg-warning-default`        | `--color-background-warning-default` | `#fdf8e9` | `#261b00` |
| `color.background.warning.hovered` | `bg-warning-hovered`        | `--color-background-warning-hovered` | `#f8e6a0` | `#4b2c04` |
| `color.background.warning.pressed` | `bg-warning-pressed`        | `--color-background-warning-pressed` | `#e9c348` | `#653805` |
| `color.background.warning.bolder`  | `bg-warning-bolder-default` | `--color-background-warning-bolder`  | `#e9c348` | `#e9c348` |

## Background - Brand

| Token                             | Tailwind                    | CSS                                  | Light     | Dark      |
| --------------------------------- | --------------------------- | ------------------------------------ | --------- | --------- |
| `color.background.brand.subtlest` | `bg-brand-subtlest-default` | `--color-background-brand-subtlest`  | `#f0fcfa` | `#012320` |
| `color.background.brand.subtler`  | `bg-brand-subtler-default`  | `--color-background-brand-subtler`   | `#d2eeeb` | `#0b3633` |
| `color.background.brand.subtle`   | `bg-brand-subtle-default`   | `--color-background-brand-subtle`    | `#51b9cf` | `#014d49` |
| `color.background.brand.bolder`   | `bg-brand-bolder-default`   | `--color-background-brand-bolder`    | `#0c625c` | `#51b9cf` |
| `color.background.brand.boldest`  | `bg-brand-boldest-default`  | `--color-background-brand-boldest`   | `#012320` | `#a0cec8` |
