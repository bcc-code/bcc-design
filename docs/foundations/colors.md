---
title: Color
order: 1
---

# Color

Use semantic color tokens instead of hardcoded values. Tokens automatically adapt to light and dark modes.

## Token Anatomy

```
color.text.default
  │     │     └── Modifier (state/variant)
  │     └── Property (text, icon, border, background)
  └── Category
```

## Color Roles

| Role | Use For |
|------|---------|
| neutral | Default text, secondary UI elements |
| brand | Primary actions, BCC identity |
| danger | Errors, destructive actions |
| warning | Alerts, caution states |
| success | Confirmations, positive states |
| information | Help text, informational states |
| accent | Categorization, visual variety |
| inverse | Text on dark backgrounds |

## Text

| Token | CSS Variable | Tailwind | Light | Dark |
|-------|--------------|----------|-------|------|
| Default | `--color-text-default` | `text-default` | <span style="display:inline-block;width:16px;height:16px;background:#292a2e;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #292a2e | <span style="display:inline-block;width:16px;height:16px;background:#e2e3e4;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #e2e3e4 |
| Subtle | `--color-text-subtle` | `text-subtle` | <span style="display:inline-block;width:16px;height:16px;background:#505258;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #505258 | <span style="display:inline-block;width:16px;height:16px;background:#a9abaf;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #a9abaf |
| Subtlest | `--color-text-subtlest` | `text-subtlest` | <span style="display:inline-block;width:16px;height:16px;background:#6b6e76;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #6b6e76 | <span style="display:inline-block;width:16px;height:16px;background:#96999e;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #96999e |
| Disabled | `--color-text-disabled` | `text-disabled` | <span style="display:inline-block;width:16px;height:16px;background:rgba(8,15,33,0.29);border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> rgba | <span style="display:inline-block;width:16px;height:16px;background:rgba(229,233,246,0.25);border-radius:3px;vertical-align:middle;border:1px solid #333"></span> rgba |
| Selected | `--color-text-selected` | `text-selected` | <span style="display:inline-block;width:16px;height:16px;background:#014d49;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #014d49 | <span style="display:inline-block;width:16px;height:16px;background:#6fb5ad;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #6fb5ad |
| Inverse | `--color-text-inverse` | `text-inverse` | <span style="display:inline-block;width:16px;height:16px;background:#ffffff;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #ffffff | <span style="display:inline-block;width:16px;height:16px;background:#1f1f21;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #1f1f21 |
| Success | `--color-text-success` | `text-success` | <span style="display:inline-block;width:16px;height:16px;background:#094c3b;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #094c3b | <span style="display:inline-block;width:16px;height:16px;background:#83d895;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #83d895 |
| Danger | `--color-text-danger` | `text-danger` | <span style="display:inline-block;width:16px;height:16px;background:#811436;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #811436 | <span style="display:inline-block;width:16px;height:16px;background:#fab6ad;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #fab6ad |
| Warning | `--color-text-warning-default` | `text-warning-default` | <span style="display:inline-block;width:16px;height:16px;background:#653805;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #653805 | <span style="display:inline-block;width:16px;height:16px;background:#e9c348;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #e9c348 |
| Information | `--color-text-information` | `text-information` | <span style="display:inline-block;width:16px;height:16px;background:#273c8f;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #273c8f | <span style="display:inline-block;width:16px;height:16px;background:#a6cdfd;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #a6cdfd |
| Brand | `--color-text-brand-default` | `text-brand-default` | <span style="display:inline-block;width:16px;height:16px;background:#014d49;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #014d49 | <span style="display:inline-block;width:16px;height:16px;background:#6fb5ad;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #6fb5ad |

## Icon

| Token | CSS Variable | Tailwind | Light | Dark |
|-------|--------------|----------|-------|------|
| Default | `--color-icon-default` | `icon-default` | <span style="display:inline-block;width:16px;height:16px;background:#1e1f21;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #1e1f21 | <span style="display:inline-block;width:16px;height:16px;background:#cecfd2;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #cecfd2 |
| Subtle | `--color-icon-subtle` | `icon-subtle` | <span style="display:inline-block;width:16px;height:16px;background:#505258;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #505258 | <span style="display:inline-block;width:16px;height:16px;background:#a9abaf;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #a9abaf |
| Subtlest | `--color-icon-subtlest` | `icon-subtlest` | <span style="display:inline-block;width:16px;height:16px;background:#6b6e76;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #6b6e76 | <span style="display:inline-block;width:16px;height:16px;background:#96999e;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #96999e |
| Selected | `--color-icon-selected` | `icon-selected` | <span style="display:inline-block;width:16px;height:16px;background:#0c625c;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #0c625c | <span style="display:inline-block;width:16px;height:16px;background:#6fb5ad;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #6fb5ad |
| Inverse | `--color-icon-inverse` | `icon-inverse` | <span style="display:inline-block;width:16px;height:16px;background:#ffffff;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #ffffff | <span style="display:inline-block;width:16px;height:16px;background:#1f1f21;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #1f1f21 |
| Success | `--color-icon-success` | `icon-success` | <span style="display:inline-block;width:16px;height:16px;background:#094c3b;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #094c3b | <span style="display:inline-block;width:16px;height:16px;background:#1ca673;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #1ca673 |
| Danger | `--color-icon-danger` | `icon-danger` | <span style="display:inline-block;width:16px;height:16px;background:#811436;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #811436 | <span style="display:inline-block;width:16px;height:16px;background:#ed6362;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #ed6362 |
| Warning | `--color-icon-warning-default` | `icon-warning-default` | <span style="display:inline-block;width:16px;height:16px;background:#653805;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #653805 | <span style="display:inline-block;width:16px;height:16px;background:#e9c348;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #e9c348 |
| Information | `--color-icon-information` | `icon-information` | <span style="display:inline-block;width:16px;height:16px;background:#273c8f;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #273c8f | <span style="display:inline-block;width:16px;height:16px;background:#608ef6;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #608ef6 |
| Brand | `--color-icon-brand-default` | `icon-brand-default` | <span style="display:inline-block;width:16px;height:16px;background:#014d49;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #014d49 | <span style="display:inline-block;width:16px;height:16px;background:#6fb5ad;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #6fb5ad |

## Border

| Token | CSS Variable | Tailwind | Light | Dark |
|-------|--------------|----------|-------|------|
| Default | `--color-border-default` | `border-default` | <span style="display:inline-block;width:16px;height:16px;background:rgba(11,18,14,0.14);border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> rgba | <span style="display:inline-block;width:16px;height:16px;background:rgba(227,228,242,0.12);border-radius:3px;vertical-align:middle;border:1px solid #333"></span> rgba |
| Bold | `--color-border-bold` | `border-bold` | <span style="display:inline-block;width:16px;height:16px;background:#7d818a;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #7d818a | <span style="display:inline-block;width:16px;height:16px;background:#63666b;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #63666b |
| Selected | `--color-border-selected` | `border-selected` | <span style="display:inline-block;width:16px;height:16px;background:#0c625c;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #0c625c | <span style="display:inline-block;width:16px;height:16px;background:#6fb5ad;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #6fb5ad |
| Focused | `--color-border-focused` | `border-focused` | <span style="display:inline-block;width:16px;height:16px;background:#3e9f97;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #3e9f97 | <span style="display:inline-block;width:16px;height:16px;background:#3e9f97;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #3e9f97 |
| Input | `--color-border-input` | `border-input` | <span style="display:inline-block;width:16px;height:16px;background:#8c8f97;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #8c8f97 | <span style="display:inline-block;width:16px;height:16px;background:#63666b;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #63666b |
| Success | `--color-border-success` | `border-success` | <span style="display:inline-block;width:16px;height:16px;background:#09825d;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #09825d | <span style="display:inline-block;width:16px;height:16px;background:#1ca673;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #1ca673 |
| Danger | `--color-border-danger` | `border-danger` | <span style="display:inline-block;width:16px;height:16px;background:#ca414e;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #ca414e | <span style="display:inline-block;width:16px;height:16px;background:#ed6362;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #ed6362 |
| Warning | `--color-border-warning` | `border-warning` | <span style="display:inline-block;width:16px;height:16px;background:#b55919;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #b55919 | <span style="display:inline-block;width:16px;height:16px;background:#da772e;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #da772e |
| Information | `--color-border-information` | `border-information` | <span style="display:inline-block;width:16px;height:16px;background:#446add;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #446add | <span style="display:inline-block;width:16px;height:16px;background:#608ef6;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #608ef6 |
| Brand | `--color-border-brand` | `border-brand` | <span style="display:inline-block;width:16px;height:16px;background:#0c625c;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #0c625c | <span style="display:inline-block;width:16px;height:16px;background:#3e9f97;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #3e9f97 |

## Elevation

Surface colors for layered UI.

| Token | CSS Variable | Tailwind | Light | Dark |
|-------|--------------|----------|-------|------|
| Surface Default | `--color-elevation-surface-default` | `bg-elevation-surface-default` | <span style="display:inline-block;width:16px;height:16px;background:#ffffff;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #ffffff | <span style="display:inline-block;width:16px;height:16px;background:#18191a;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #18191a |
| Surface Raised | `--color-elevation-surface-raised-default` | `bg-elevation-surface-raised` | <span style="display:inline-block;width:16px;height:16px;background:#ffffff;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #ffffff | <span style="display:inline-block;width:16px;height:16px;background:#242528;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #242528 |
| Surface Overlay | `--color-elevation-surface-overlay-default` | `bg-elevation-surface-overlay` | <span style="display:inline-block;width:16px;height:16px;background:#ffffff;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #ffffff | <span style="display:inline-block;width:16px;height:16px;background:#303134;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #303134 |
| Surface Sunken | `--color-elevation-surface-sunken-default` | `bg-elevation-surface-sunken` | <span style="display:inline-block;width:16px;height:16px;background:#f8f8f8;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #f8f8f8 | <span style="display:inline-block;width:16px;height:16px;background:#1f1f21;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #1f1f21 |

## Background Status

| Token | CSS Variable | Tailwind | Light | Dark |
|-------|--------------|----------|-------|------|
| Success | `--color-background-success-default` | `bg-success-default` | <span style="display:inline-block;width:16px;height:16px;background:#efffed;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #efffed | <span style="display:inline-block;width:16px;height:16px;background:#073734;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #073734 |
| Danger | `--color-background-danger-default` | `bg-danger-default` | <span style="display:inline-block;width:16px;height:16px;background:#fff8f3;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #fff8f3 | <span style="display:inline-block;width:16px;height:16px;background:#630d2e;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #630d2e |
| Warning | `--color-background-warning-default` | `bg-warning-default` | <span style="display:inline-block;width:16px;height:16px;background:#fdf8e9;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #fdf8e9 | <span style="display:inline-block;width:16px;height:16px;background:#4b2c04;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #4b2c04 |
| Information | `--color-background-information-default` | `bg-information-default` | <span style="display:inline-block;width:16px;height:16px;background:#f6fbff;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #f6fbff | <span style="display:inline-block;width:16px;height:16px;background:#212c64;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #212c64 |
| Brand | `--color-background-brand-subtlest-default` | `bg-brand-subtlest` | <span style="display:inline-block;width:16px;height:16px;background:#f0fcfa;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #f0fcfa | <span style="display:inline-block;width:16px;height:16px;background:#0b3633;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #0b3633 |

## Accent Colors

Accent colors for categorization and visual variety. Each family has subtlest, subtler, subtle, and bolder variants.

### Blue

| Variant | Light | Dark |
|---------|-------|------|
| Subtlest | <span style="display:inline-block;width:16px;height:16px;background:#f6fbff;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #f6fbff | <span style="display:inline-block;width:16px;height:16px;background:#212c64;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #212c64 |
| Subtler | <span style="display:inline-block;width:16px;height:16px;background:#d9ecff;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #d9ecff | <span style="display:inline-block;width:16px;height:16px;background:#273c8f;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #273c8f |
| Subtle | <span style="display:inline-block;width:16px;height:16px;background:#7cabf9;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #7cabf9 | <span style="display:inline-block;width:16px;height:16px;background:#274eb5;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #274eb5 |
| Bolder | <span style="display:inline-block;width:16px;height:16px;background:#274eb5;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #274eb5 | <span style="display:inline-block;width:16px;height:16px;background:#608ef6;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #608ef6 |

### Teal

| Variant | Light | Dark |
|---------|-------|------|
| Subtlest | <span style="display:inline-block;width:16px;height:16px;background:#f6fbff;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #f6fbff | <span style="display:inline-block;width:16px;height:16px;background:#0d324d;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #0d324d |
| Subtler | <span style="display:inline-block;width:16px;height:16px;background:#c3f2f8;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #c3f2f8 | <span style="display:inline-block;width:16px;height:16px;background:#09486b;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #09486b |
| Subtle | <span style="display:inline-block;width:16px;height:16px;background:#51b9cf;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #51b9cf | <span style="display:inline-block;width:16px;height:16px;background:#005b81;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #005b81 |
| Bolder | <span style="display:inline-block;width:16px;height:16px;background:#005b81;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #005b81 | <span style="display:inline-block;width:16px;height:16px;background:#1a9eb7;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #1a9eb7 |

### Green

| Variant | Light | Dark |
|---------|-------|------|
| Subtlest | <span style="display:inline-block;width:16px;height:16px;background:#efffed;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #efffed | <span style="display:inline-block;width:16px;height:16px;background:#073734;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #073734 |
| Subtler | <span style="display:inline-block;width:16px;height:16px;background:#cbf3c9;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #cbf3c9 | <span style="display:inline-block;width:16px;height:16px;background:#094c3b;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #094c3b |
| Subtle | <span style="display:inline-block;width:16px;height:16px;background:#32c180;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #32c180 | <span style="display:inline-block;width:16px;height:16px;background:#0c6241;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #0c6241 |
| Bolder | <span style="display:inline-block;width:16px;height:16px;background:#0c6241;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #0c6241 | <span style="display:inline-block;width:16px;height:16px;background:#1ca673;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #1ca673 |

### Yellow

| Variant | Light | Dark |
|---------|-------|------|
| Subtlest | <span style="display:inline-block;width:16px;height:16px;background:#fdf8e9;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #fdf8e9 | <span style="display:inline-block;width:16px;height:16px;background:#4b2c04;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #4b2c04 |
| Subtler | <span style="display:inline-block;width:16px;height:16px;background:#f8e6a0;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #f8e6a0 | <span style="display:inline-block;width:16px;height:16px;background:#653805;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #653805 |
| Subtle | <span style="display:inline-block;width:16px;height:16px;background:#e9c348;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #e9c348 | <span style="display:inline-block;width:16px;height:16px;background:#854901;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #854901 |
| Bolder | <span style="display:inline-block;width:16px;height:16px;background:#854901;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #854901 | <span style="display:inline-block;width:16px;height:16px;background:#bc870d;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #bc870d |

### Orange

| Variant | Light | Dark |
|---------|-------|------|
| Subtlest | <span style="display:inline-block;width:16px;height:16px;background:#fffaed;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #fffaed | <span style="display:inline-block;width:16px;height:16px;background:#5d1712;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #5d1712 |
| Subtler | <span style="display:inline-block;width:16px;height:16px;background:#fee3c1;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #fee3c1 | <span style="display:inline-block;width:16px;height:16px;background:#782612;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #782612 |
| Subtle | <span style="display:inline-block;width:16px;height:16px;background:#f19457;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #f19457 | <span style="display:inline-block;width:16px;height:16px;background:#943a14;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #943a14 |
| Bolder | <span style="display:inline-block;width:16px;height:16px;background:#943a14;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #943a14 | <span style="display:inline-block;width:16px;height:16px;background:#da772e;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #da772e |

### Red

| Variant | Light | Dark |
|---------|-------|------|
| Subtlest | <span style="display:inline-block;width:16px;height:16px;background:#fff8f3;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #fff8f3 | <span style="display:inline-block;width:16px;height:16px;background:#630d2e;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #630d2e |
| Subtler | <span style="display:inline-block;width:16px;height:16px;background:#fee2dd;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #fee2dd | <span style="display:inline-block;width:16px;height:16px;background:#811436;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #811436 |
| Subtle | <span style="display:inline-block;width:16px;height:16px;background:#fa877e;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #fa877e | <span style="display:inline-block;width:16px;height:16px;background:#a42237;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #a42237 |
| Bolder | <span style="display:inline-block;width:16px;height:16px;background:#a42237;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #a42237 | <span style="display:inline-block;width:16px;height:16px;background:#ed6362;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #ed6362 |

### Purple

| Variant | Light | Dark |
|---------|-------|------|
| Subtlest | <span style="display:inline-block;width:16px;height:16px;background:#f6f9ff;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #f6f9ff | <span style="display:inline-block;width:16px;height:16px;background:#352465;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #352465 |
| Subtler | <span style="display:inline-block;width:16px;height:16px;background:#e3e3fe;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #e3e3fe | <span style="display:inline-block;width:16px;height:16px;background:#493481;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #493481 |
| Subtle | <span style="display:inline-block;width:16px;height:16px;background:#afa0e0;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #afa0e0 | <span style="display:inline-block;width:16px;height:16px;background:#61479c;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #61479c |
| Bolder | <span style="display:inline-block;width:16px;height:16px;background:#61479c;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #61479c | <span style="display:inline-block;width:16px;height:16px;background:#9a82da;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #9a82da |

### Magenta

| Variant | Light | Dark |
|---------|-------|------|
| Subtlest | <span style="display:inline-block;width:16px;height:16px;background:#fff8ff;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #fff8ff | <span style="display:inline-block;width:16px;height:16px;background:#5b1043;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #5b1043 |
| Subtler | <span style="display:inline-block;width:16px;height:16px;background:#fce0f8;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #fce0f8 | <span style="display:inline-block;width:16px;height:16px;background:#751f57;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #751f57 |
| Subtle | <span style="display:inline-block;width:16px;height:16px;background:#eb8acf;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #eb8acf | <span style="display:inline-block;width:16px;height:16px;background:#952e70;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #952e70 |
| Bolder | <span style="display:inline-block;width:16px;height:16px;background:#952e70;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #952e70 | <span style="display:inline-block;width:16px;height:16px;background:#de66b0;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #de66b0 |

### Gray

| Variant | Light | Dark |
|---------|-------|------|
| Subtlest | <span style="display:inline-block;width:16px;height:16px;background:#ffffff;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #ffffff | <span style="display:inline-block;width:16px;height:16px;background:#303134;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #303134 |
| Subtler | <span style="display:inline-block;width:16px;height:16px;background:#f8f8f8;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #f8f8f8 | <span style="display:inline-block;width:16px;height:16px;background:#3d3f43;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #3d3f43 |
| Subtle | <span style="display:inline-block;width:16px;height:16px;background:#f0f1f2;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #f0f1f2 | <span style="display:inline-block;width:16px;height:16px;background:#4b4d51;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #4b4d51 |
| Bolder | <span style="display:inline-block;width:16px;height:16px;background:#6b6e76;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #6b6e76 | <span style="display:inline-block;width:16px;height:16px;background:#7e8188;border-radius:3px;vertical-align:middle;border:1px solid #333"></span> #7e8188 |
