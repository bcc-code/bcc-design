---
title: Colors
order: 1
---

# Colors

Use semantic color tokens instead of hardcoded values. Semantic tokens automatically adapt to light and dark modes.

## Text Colors

| Token | CSS Variable | Tailwind Class |
|-------|--------------|----------------|
| Default | `--color-text-default` | `text-default` |
| Subtle | `--color-text-subtle` | `text-subtle` |
| Subtlest | `--color-text-subtlest` | `text-subtlest` |
| Disabled | `--color-text-disabled` | `text-disabled` |
| Inverse | `--color-text-inverse` | `text-inverse` |
| Brand | `--color-text-brand-default` | `text-brand-default` |
| Success | `--color-text-success` | `text-success` |
| Danger | `--color-text-danger` | `text-danger` |
| Warning | `--color-text-warning-default` | `text-warning-default` |
| Information | `--color-text-information` | `text-information` |

## Background Colors

| Token | CSS Variable | Tailwind Class |
|-------|--------------|----------------|
| Surface Default | `--color-elevation-surface-default` | `bg-elevation-surface-default` |
| Surface Raised | `--color-elevation-surface-raised` | `bg-elevation-surface-raised` |
| Surface Overlay | `--color-elevation-surface-overlay` | `bg-elevation-surface-overlay` |
| Surface Sunken | `--color-elevation-surface-sunken` | `bg-elevation-surface-sunken` |

## Border Colors

| Token | CSS Variable | Tailwind Class |
|-------|--------------|----------------|
| Default | `--color-border-default` | `border-default` |
| Subtle | `--color-border-subtle` | `border-subtle` |
| Bold | `--color-border-bold` | `border-bold` |

## Interactive Colors

| Token | CSS Variable | Tailwind Class |
|-------|--------------|----------------|
| Primary | `--color-interactive-primary` | `bg-interactive-primary` |
| Primary Hover | `--color-interactive-primary-hover` | `bg-interactive-primary-hover` |
| On Interactive | `--color-text-on-interactive` | `text-on-interactive` |

## Example

```html
<div class="bg-elevation-surface-default border border-default text-default p-200">
  <p class="text-subtle">Secondary text</p>
  <button class="bg-interactive-primary text-on-interactive px-200 py-100 rounded-md">
    Action
  </button>
</div>
```

## Do's and Don'ts

| Do | Don't | Why |
|----|-------|-----|
| `text-default` | `text-gray-900` | Adapts to dark mode |
| `text-subtle` | `text-gray-600` | Maintains contrast |
| `bg-elevation-surface-default` | `bg-white` | Theme-aware |
| `border-default` | `border-gray-200` | Consistent |

## Accent Colors

For specific accent needs, semantic accent tokens are available:

- `text-accent-gray-default`, `text-accent-gray-bold`
- `text-accent-blue-default`, `text-accent-blue-bold`
- `text-accent-teal-default`, `text-accent-teal-bold`
- `text-accent-green-default`, `text-accent-green-bold`
- `text-accent-yellow-default`, `text-accent-yellow-bold`
- `text-accent-orange-default`, `text-accent-orange-bold`
- `text-accent-red-default`, `text-accent-red-bold`
- `text-accent-magenta-default`, `text-accent-magenta-bold`
- `text-accent-purple-default`, `text-accent-purple-bold`
