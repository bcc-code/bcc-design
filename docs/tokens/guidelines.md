# Guidelines

Best practices for using BCC Design Tokens. Follow these rules to ensure consistency and dark mode support across all BCC applications.

---

## Colors

Use semantic color tokens instead of hardcoded values. Semantic tokens automatically adapt to light and dark modes.

| Do | Don't | Why |
|----|-------|-----|
| `text-default` | `text-gray-900` | Adapts to dark mode |
| `text-secondary` | `text-gray-600` | Maintains contrast ratios |
| `bg-elevation-surface-default` | `bg-white` | Theme-aware backgrounds |
| `bg-elevation-surface-raised` | `bg-gray-50` | Proper elevation hierarchy |
| `border-default` | `border-gray-200` | Consistent borders |

### Example

```html
<!-- Wrong -->
<div class="bg-white text-gray-900 border border-gray-200">

<!-- Right -->
<div class="bg-elevation-surface-default text-default border border-default">
```

---

## Spacing

Use BCC spacing tokens, not default Tailwind spacing. Token values ensure visual consistency across all BCC apps.

| Do | Don't | Actual Value |
|----|-------|--------------|
| `p-100` | `p-2` | 8px |
| `p-200` | `p-4` | 16px |
| `p-300` | `p-6` | 24px |
| `gap-100` | `gap-2` | 8px |
| `gap-200` | `gap-4` | 16px |
| `m-100` | `m-2` | 8px |
| `m-200` | `m-4` | 16px |

### Example

```html
<!-- Wrong: default Tailwind spacing -->
<div class="p-4 gap-6 m-2">

<!-- Right: BCC spacing tokens -->
<div class="p-200 gap-300 m-100">
```

---

## Typography

Use BCC typography tokens for fonts and sizes. The design system uses Archivo as the primary font family.

| Do | Don't |
|----|-------|
| `font-sans` (Archivo) | `font-arial` or system fonts |
| Token font sizes | Custom pixel values |
| `text-label-sm` | `text-xs` |
| `text-body-base` | `text-base` |

---

## Components

Use PrimeVue with the BCC preset. Building from scratch creates inconsistency and maintenance burden.

| Do | Don't |
|----|-------|
| Use PrimeVue components | Build custom components from scratch |
| Apply BCC preset first | Start with unstyled components |
| Extend existing components | Fork and modify component source |
| Override specific tokens | Override all component styles |

---

## Common Mistakes

### Mixing Token Systems

Never mix BCC tokens with default Tailwind classes in the same element.

```html
<!-- Wrong: mixing systems -->
<div class="p-4 text-default bg-white border-gray-200">

<!-- Right: all BCC tokens -->
<div class="p-200 text-default bg-elevation-surface-default border-default">
```

### Hardcoding Colors in CSS

Use CSS custom properties instead of hex values.

```css
/* Wrong */
.card {
  background: #ffffff;
  color: #1a1a1a;
  border: 1px solid #e5e5e5;
}

/* Right */
.card {
  background: var(--color-elevation-surface-default);
  color: var(--color-text-default);
  border: 1px solid var(--color-border-default);
}
```

### Ignoring Dark Mode

Always test components in both light and dark modes. Hardcoded colors break dark mode.

```html
<!-- Wrong: breaks in dark mode -->
<div class="bg-white text-black shadow-lg">

<!-- Right: works in both modes -->
<div class="bg-elevation-surface-raised text-default shadow-md">
```

---

## When to Use Custom Values

Custom values are acceptable in specific situations. If using the same custom value more than twice, request it as a token.

| Situation | Approach | Example |
|-----------|----------|---------|
| One-off layout dimensions | Tailwind arbitrary values | `w-[347px]` |
| Animation timing | Define in component styles | `transition: 200ms` |
| Third-party library integration | Match their API, wrap with tokens | Use tokens for colors |
| Unique design requirement | Document why tokens don't fit | Add code comment |

---

## Quick Reference Checklist

Before submitting code, verify:

- [ ] No hardcoded color values (`#fff`, `white`, `gray-900`)
- [ ] No default Tailwind spacing (`p-4`, `m-2`, `gap-6`)
- [ ] All colors use semantic tokens (`text-default`, `bg-elevation-*`)
- [ ] Component works in dark mode
- [ ] Using PrimeVue components where available
