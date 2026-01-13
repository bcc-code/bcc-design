---
title: Typography
order: 3
---

# Typography

BCC Design uses **Archivo** as the primary font family.

## Setup

Add to your HTML `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@200..900&display=swap" rel="stylesheet" />
```

---

## Headings

Use heading tokens for titles and section headers. All headings use **bold weight**.

| Token | Tailwind | Size | Line Height |
|-------|----------|------|-------------|
| `heading-xs` | `text-heading-xs` | 12px (0.75rem) | 14px |
| `heading-sm` | `text-heading-sm` | 14px (0.875rem) | 16px |
| `heading-md` | `text-heading-md` | 16px (1rem) | 20px |
| `heading-lg` | `text-heading-lg` | 20px (1.25rem) | 24px |
| `heading-xl` | `text-heading-xl` | 24px (1.5rem) | 28px |
| `heading-2xl` | `text-heading-2xl` | 32px (2rem) | 32px |
| `heading-3xl` | `text-heading-3xl` | 36px (2.25rem) | 40px |
| `heading-4xl` | `text-heading-4xl` | 48px (3rem) | 56px |
| `heading-5xl` | `text-heading-5xl` | 48px (3rem) | 64px |

```html
<h1 class="text-heading-4xl">Page Title</h1>
<h2 class="text-heading-2xl">Section Title</h2>
<h3 class="text-heading-lg">Subsection</h3>
```

---

## Body

Use body tokens for paragraphs and general text. All body text uses **regular weight**.

| Token | Tailwind | Size | Line Height |
|-------|----------|------|-------------|
| `body-sm` | `text-body-sm` | 12px (0.75rem) | 16px |
| `body-md` | `text-body-md` | 14px (0.875rem) | 20px |
| `body-lg` | `text-body-lg` | 16px (1rem) | 24px |

```html
<p class="text-body-md">Default paragraph text</p>
<span class="text-body-sm">Small caption or label</span>
```

---

## Font Sizes

Raw font size tokens for custom compositions.

| Token | Value | CSS Variable |
|-------|-------|--------------|
| `xs` | 12px (0.75rem) | `--font-size-xs` |
| `sm` | 14px (0.875rem) | `--font-size-sm` |
| `md` | 16px (1rem) | `--font-size-md` |
| `lg` | 20px (1.25rem) | `--font-size-lg` |
| `xl` | 24px (1.5rem) | `--font-size-xl` |
| `2xl` | 32px (2rem) | `--font-size-2xl` |
| `3xl` | 36px (2.25rem) | `--font-size-3xl` |
| `4xl` | 48px (3rem) | `--font-size-4xl` |

---

## Font Weights

| Token | Tailwind | CSS Variable |
|-------|----------|--------------|
| Regular | `font-regular` | `--font-weight-regular` |
| Medium | `font-medium` | `--font-weight-medium` |
| Bold | `font-bold` | `--font-weight-bold` |

---

## Line Heights

| Token | Value | CSS Variable |
|-------|-------|--------------|
| `1` | 14px | `--line-height-1` |
| `2` | 16px | `--line-height-2` |
| `3` | 20px | `--line-height-3` |
| `4` | 24px | `--line-height-4` |
| `5` | 28px | `--line-height-5` |
| `6` | 32px | `--line-height-6` |
| `7` | 36px | `--line-height-7` |
| `8` | 40px | `--line-height-8` |
| `9` | 56px | `--line-height-9` |
| `10` | 64px | `--line-height-10` |

---

## Do's and Don'ts

| Do | Don't |
|----|-------|
| Use `font-sans` (Archivo) for all text | Use system fonts or other font families |
| Use composite tokens (`text-heading-lg`) | Mix font-size and line-height manually |
| Use `text-default` for body text color | Hardcode text colors |
