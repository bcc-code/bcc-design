---
title: Typography
order: 3
---

# Typography

The BCC design system uses Archivo as the font family.

## Font Setup

Add to your HTML `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@200..900&display=swap" rel="stylesheet" />
```

## Font Sizes

| Token | Value | CSS Variable |
|-------|-------|--------------|
| xs | 12px | `--font-size-xs` |
| sm | 14px | `--font-size-sm` |
| md | 16px | `--font-size-md` |
| lg | 20px | `--font-size-lg` |
| xl | 24px | `--font-size-xl` |
| 2xl | 32px | `--font-size-2xl` |
| 3xl | 36px | `--font-size-3xl` |
| 4xl | 48px | `--font-size-4xl` |

## Font Weights

| Token | CSS Variable |
|-------|--------------|
| Regular | `--font-weight-regular` |
| Medium | `--font-weight-medium` |
| Bold | `--font-weight-bold` |

## Heading Styles

Pre-defined heading composites:

- `heading-xs`, `heading-sm`, `heading-md`, `heading-lg`
- `heading-xl`, `heading-2xl`, `heading-3xl`, `heading-4xl`, `heading-5xl`

## Body Styles

Pre-defined body text composites:

- `body-sm`, `body-md`, `body-lg`

## Do's and Don'ts

| Do | Don't |
|----|-------|
| Use `font-sans` (Archivo) | Use system fonts |
| Use token font sizes | Use custom pixel values |
| Use `text-default` for body text | Use hardcoded colors |
