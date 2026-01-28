---
sectionTitle: Foundations
sectionOrder: 20
title: Colors
order: 4
---

# Colors

The color system has two layers: semantic tokens for UI and primitive scales for reference.

| Type             | Purpose          | Dark mode   | Use for         |
| ---------------- | ---------------- | ----------- | --------------- |
| Semantic tokens  | Convey meaning   | Auto-adapts | All UI elements |
| Primitive scales | Raw color values | Manual      | Reference only  |

**Always use semantic tokens** from [Tokens](./tokens.md). Primitives are in [Palette](./palette.md).

## Color Roles

| Role        | Purpose                          | Example tokens                               |
| ----------- | -------------------------------- | -------------------------------------------- |
| Brand       | Primary actions, selected states | `text-brand-default`, `bg-brand-bolder`      |
| Success     | Positive feedback                | `text-success`, `bg-success-default`         |
| Information | Neutral tips                     | `text-information`, `bg-information-default` |
| Warning     | Cautions                         | `text-warning-default`, `bg-warning-default` |
| Danger      | Errors, destructive actions      | `text-danger`, `bg-danger-default`           |
| Neutral     | Default UI                       | `text-default`, `bg-elevation-surface-default` |

## Accents

Accent colors categorize content without semantic meaning. Use for tags, labels, and project icons.

**Available:** Blue, Teal, Green, Yellow, Orange, Red, Magenta, Purple

### Emphasis Levels

| Element    | Levels                            |
| ---------- | --------------------------------- |
| Background | subtlest, subtler, subtle, bolder |
| Text/Icon  | default, bolder                   |

### Pairing

| Background       | Text/Icon to use  |
| ---------------- | ----------------- |
| subtlest/subtler | default or bolder |
| subtle           | bolder            |
| bolder           | inverse           |

## Accessibility

- **3:1 contrast** for UI elements (borders, icons)
- **4.5:1 contrast** for body text
- Don't rely on color alone—use icons or text labels

## Guidelines

| Do                                              | Don't                                 |
| ----------------------------------------------- | ------------------------------------- |
| Use semantic tokens for meaning                 | Use primitives (`bg-red-500`) in UI   |
| Match color role to purpose                     | Use brand color for errors            |
| Pair accent foreground/background from same family | Mix blue background with red text  |
| Test in both light and dark mode                | Assume light mode only                |
