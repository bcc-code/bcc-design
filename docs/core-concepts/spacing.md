---
title: Spacing
order: 2
---

# Spacing

Use BCC spacing tokens for consistent spacing across all BCC apps.

## Token Reference

| Token | Value | CSS Variable | Tailwind Class |
|-------|-------|--------------|----------------|
| 0 | 0 | `--space-0` | `p-0` `m-0` `gap-0` |
| 25 | 2px | `--space-25` | `p-25` `m-25` `gap-25` |
| 50 | 4px | `--space-50` | `p-50` `m-50` `gap-50` |
| 75 | 6px | `--space-75` | `p-75` `m-75` `gap-75` |
| 100 | 8px | `--space-100` | `p-100` `m-100` `gap-100` |
| 150 | 12px | `--space-150` | `p-150` `m-150` `gap-150` |
| 200 | 16px | `--space-200` | `p-200` `m-200` `gap-200` |
| 250 | 20px | `--space-250` | `p-250` `m-250` `gap-250` |
| 300 | 24px | `--space-300` | `p-300` `m-300` `gap-300` |
| 400 | 32px | `--space-400` | `p-400` `m-400` `gap-400` |
| 500 | 40px | `--space-500` | `p-500` `m-500` `gap-500` |
| 600 | 48px | `--space-600` | `p-600` `m-600` `gap-600` |
| 800 | 64px | `--space-800` | `p-800` `m-800` `gap-800` |
| 1000 | 80px | `--space-1000` | `p-1000` `m-1000` `gap-1000` |

## Negative Spacing

For negative margins:

| Token | Value | CSS Variable |
|-------|-------|--------------|
| -25 | -2px | `--space-negative-25` |
| -50 | -4px | `--space-negative-50` |
| -75 | -6px | `--space-negative-75` |
| -100 | -8px | `--space-negative-100` |
| -150 | -12px | `--space-negative-150` |
| -200 | -16px | `--space-negative-200` |
| -300 | -24px | `--space-negative-300` |
| -400 | -32px | `--space-negative-400` |

## Example

```html
<div class="p-200 flex flex-col gap-100">
  <h2 class="mb-50">Title</h2>
  <p>Content with consistent spacing</p>
</div>
```

## Do's and Don'ts

| Do | Don't | Why |
|----|-------|-----|
| `p-100` | `p-2` | BCC spacing scale |
| `p-200` | `p-4` | Consistent values |
| `gap-150` | `gap-3` | Visual harmony |
| `m-300` | `m-6` | Design system alignment |
