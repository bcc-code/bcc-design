---
title: Spacing
order: 2
---

# Spacing

BCC uses a numeric spacing scale for consistent padding, margins, and gaps.

---

## Scale

| Token | Value | Rem | Visual | Tailwind |
|-------|-------|-----|--------|----------|
| `0` | 0px | 0 | | `p-0` `m-0` `gap-0` |
| `25` | 2px | 0.125rem | <span style="display:inline-block;width:2px;height:12px;background:#014d49;border-radius:1px"></span> | `p-25` `m-25` `gap-25` |
| `50` | 4px | 0.25rem | <span style="display:inline-block;width:4px;height:12px;background:#014d49;border-radius:1px"></span> | `p-50` `m-50` `gap-50` |
| `75` | 6px | 0.375rem | <span style="display:inline-block;width:6px;height:12px;background:#014d49;border-radius:1px"></span> | `p-75` `m-75` `gap-75` |
| `100` | 8px | 0.5rem | <span style="display:inline-block;width:8px;height:12px;background:#014d49;border-radius:1px"></span> | `p-100` `m-100` `gap-100` |
| `150` | 12px | 0.75rem | <span style="display:inline-block;width:12px;height:12px;background:#014d49;border-radius:1px"></span> | `p-150` `m-150` `gap-150` |
| `200` | 16px | 1rem | <span style="display:inline-block;width:16px;height:12px;background:#014d49;border-radius:1px"></span> | `p-200` `m-200` `gap-200` |
| `250` | 20px | 1.25rem | <span style="display:inline-block;width:20px;height:12px;background:#014d49;border-radius:1px"></span> | `p-250` `m-250` `gap-250` |
| `300` | 24px | 1.5rem | <span style="display:inline-block;width:24px;height:12px;background:#014d49;border-radius:1px"></span> | `p-300` `m-300` `gap-300` |
| `400` | 32px | 2rem | <span style="display:inline-block;width:32px;height:12px;background:#014d49;border-radius:1px"></span> | `p-400` `m-400` `gap-400` |
| `500` | 40px | 2.5rem | <span style="display:inline-block;width:40px;height:12px;background:#014d49;border-radius:1px"></span> | `p-500` `m-500` `gap-500` |
| `600` | 48px | 3rem | <span style="display:inline-block;width:48px;height:12px;background:#014d49;border-radius:1px"></span> | `p-600` `m-600` `gap-600` |
| `800` | 64px | 4rem | <span style="display:inline-block;width:64px;height:12px;background:#014d49;border-radius:1px"></span> | `p-800` `m-800` `gap-800` |
| `1000` | 80px | 5rem | <span style="display:inline-block;width:80px;height:12px;background:#014d49;border-radius:1px"></span> | `p-1000` `m-1000` `gap-1000` |

---

## Usage

```html
<!-- Padding -->
<div class="p-200">16px padding all sides</div>
<div class="px-300 py-100">24px horizontal, 8px vertical</div>

<!-- Margin -->
<div class="mt-200 mb-100">16px top, 8px bottom</div>

<!-- Gap (flexbox/grid) -->
<div class="flex gap-100">8px gap between items</div>
```

---

## Negative Spacing

Use negative margins when needed.

| Token | Value | CSS Variable |
|-------|-------|--------------|
| `-25` | -2px | `--space-negative-25` |
| `-50` | -4px | `--space-negative-50` |
| `-75` | -6px | `--space-negative-75` |
| `-100` | -8px | `--space-negative-100` |
| `-150` | -12px | `--space-negative-150` |
| `-200` | -16px | `--space-negative-200` |
| `-250` | -20px | `--space-negative-250` |
| `-300` | -24px | `--space-negative-300` |
| `-400` | -32px | `--space-negative-400` |

```html
<div class="-mt-100">Pull up by 8px</div>
```

---

## Tailwind Compatibility

Tailwind's default classes still work. The base `--spacing` is set to `8px`, so:

| Tailwind | BCC Token | Value |
|----------|-----------|-------|
| `p-1` | `p-100` | 8px |
| `p-2` | `p-200` | 16px |
| `p-3` | `p-300` | 24px |
| `p-4` | `p-400` | 32px |

Both systems work - use whichever you prefer. BCC tokens are more explicit about the pixel value.
