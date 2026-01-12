---
title: Guidelines
order: 5
---

# Guidelines

Best practices for using BCC Design Tokens.

## Components

Use PrimeVue with the BCC preset. Building from scratch creates inconsistency.

| Do | Don't |
|----|-------|
| Use PrimeVue components | Build custom components from scratch |
| Apply BCC preset first | Start with unstyled components |
| Extend existing components | Fork and modify component source |
| Override specific tokens | Override all component styles |

## Common Mistakes

### Mixing Token Systems

Never mix BCC tokens with default Tailwind classes.

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
}

/* Right */
.card {
  background: var(--color-elevation-surface-default);
  color: var(--color-text-default);
}
```

## When to Use Custom Values

Custom values are acceptable in specific situations.

| Situation | Approach | Example |
|-----------|----------|---------|
| One-off layout dimensions | Tailwind arbitrary values | `w-[347px]` |
| Animation timing | Define in component styles | `transition: 200ms` |
| Third-party library | Match their API, wrap with tokens | Use tokens for colors |

If using the same custom value more than twice, request it as a token.

## Checklist

Before submitting code:

- [ ] No hardcoded color values (`#fff`, `white`, `gray-900`)
- [ ] No default Tailwind spacing (`p-4`, `m-2`, `gap-6`)
- [ ] All colors use semantic tokens (`text-default`, `bg-elevation-*`)
- [ ] Component works in dark mode
- [ ] Using PrimeVue components where available
