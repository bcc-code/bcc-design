---
title: Tailwind Setup
order: 3
---

# Tailwind Setup

For projects using Tailwind CSS v4.

## Install

```bash
npm install @bcc-code/design-tokens
```

## Import Theme

```css
/* Auto-switching (respects prefers-color-scheme + .dark class) */
@import "@bcc-code/design-tokens/tailwind";

/* Or specific theme */
@import "@bcc-code/design-tokens/tailwind/light";
@import "@bcc-code/design-tokens/tailwind/dark";
```

## Add Font

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@200..900&display=swap" rel="stylesheet" />
```

## Usage

```html
<div class="bg-elevation-surface-default text-default p-200 rounded-md">
  <h2 class="text-lg font-bold">Card Title</h2>
  <p class="text-subtle">Card content</p>
  <button class="bg-interactive-primary text-on-interactive px-200 py-100 rounded-md">
    Action
  </button>
</div>
```

## Available Utilities

### Colors
- Text: `text-default`, `text-subtle`, `text-subtlest`, `text-disabled`, `text-inverse`
- Background: `bg-elevation-surface-default`, `bg-elevation-surface-raised`, `bg-elevation-surface-overlay`
- Border: `border-default`, `border-subtle`
- Interactive: `bg-interactive-primary`, `text-on-interactive`
- Status: `text-success`, `text-danger`, `text-warning-default`

### Spacing
| Class | Value |
|-------|-------|
| `p-0`, `m-0`, `gap-0` | 0 |
| `p-25`, `m-25`, `gap-25` | 2px |
| `p-50`, `m-50`, `gap-50` | 4px |
| `p-75`, `m-75`, `gap-75` | 6px |
| `p-100`, `m-100`, `gap-100` | 8px |
| `p-150`, `m-150`, `gap-150` | 12px |
| `p-200`, `m-200`, `gap-200` | 16px |
| `p-250`, `m-250`, `gap-250` | 20px |
| `p-300`, `m-300`, `gap-300` | 24px |
| `p-400`, `m-400`, `gap-400` | 32px |
| `p-500`, `m-500`, `gap-500` | 40px |
| `p-600`, `m-600`, `gap-600` | 48px |

### Border Radius
`rounded-none`, `rounded-xs`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`

### Shadows
`shadow-raised`, `shadow-overlay`, `shadow-overflow`

### Icon Sizes
`icon-xs` (16px), `icon-sm` (20px), `icon-md` (24px), `icon-lg` (32px), `icon-xl` (48px)
