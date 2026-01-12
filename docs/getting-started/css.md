---
title: CSS Variables
order: 4
---

# CSS Variables

For projects without Tailwind, or when you need raw CSS custom properties.

## Install

```bash
npm install @bcc-code/design-tokens
```

## Import

```css
/* Auto-switching (respects prefers-color-scheme) */
@import "@bcc-code/design-tokens/css";

/* Or specific theme */
@import "@bcc-code/design-tokens/css/light";
@import "@bcc-code/design-tokens/css/dark";
```

## CDN Usage

```html
<link rel="stylesheet" href="https://unpkg.com/@bcc-code/design-tokens@latest/build/bcc/css/auto.css">
```

## Add Font

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@200..900&display=swap" rel="stylesheet" />
```

## Usage

```css
.card {
  background: var(--color-elevation-surface-default);
  color: var(--color-text-default);
  border: 1px solid var(--color-border-default);
  padding: var(--space-200);
  border-radius: var(--border-radius-md);
}

.button {
  background: var(--color-interactive-primary);
  color: var(--color-text-on-interactive);
  padding: var(--space-100) var(--space-200);
  border-radius: var(--border-radius-md);
}
```

## Available Variables

### Colors
- `--color-text-default`
- `--color-text-subtle`
- `--color-text-subtlest`
- `--color-text-disabled`
- `--color-text-inverse`
- `--color-text-brand-default`
- `--color-text-success`
- `--color-text-danger`
- `--color-text-warning-default`
- `--color-elevation-surface-default`
- `--color-elevation-surface-raised`
- `--color-elevation-surface-overlay`
- `--color-border-default`
- `--color-interactive-primary`
- `--color-interactive-primary-hover`

### Spacing
| Variable | Value |
|----------|-------|
| `--space-0` | 0 |
| `--space-25` | 2px |
| `--space-50` | 4px |
| `--space-75` | 6px |
| `--space-100` | 8px |
| `--space-150` | 12px |
| `--space-200` | 16px |
| `--space-250` | 20px |
| `--space-300` | 24px |
| `--space-400` | 32px |
| `--space-500` | 40px |
| `--space-600` | 48px |
| `--space-800` | 64px |
| `--space-1000` | 80px |

### Border Radius
| Variable | Value |
|----------|-------|
| `--border-radius-none` | 0 |
| `--border-radius-xs` | 4px |
| `--border-radius-sm` | 6px |
| `--border-radius-md` | 8px |
| `--border-radius-lg` | 12px |
| `--border-radius-xl` | 16px |
| `--border-radius-full` | 999px |

### Shadows
- `--elevation-shadow-raised`
- `--elevation-shadow-overlay`
- `--elevation-shadow-overflow`

## JavaScript Import

For programmatic access to token values:

```javascript
import lightTokens from '@bcc-code/design-tokens/js/light';
import darkTokens from '@bcc-code/design-tokens/js/dark';
```
