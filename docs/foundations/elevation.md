---
sectionTitle: Foundations
sectionOrder: 20
title: Elevation
order: 8
---

# Elevation

Elevation creates visual hierarchy through shadows. Use shadows to show depth and separate content layers.

## Shadow

Shadows indicate elevation level. Higher elements cast larger shadows.

| Token             | Tailwind          | CSS                 | Use for                     |
| ----------------- | ----------------- | ------------------- | --------------------------- |
| `shadow.raised`   | `shadow-raised`   | `--shadow-raised`   | Cards, subtle elevation     |
| `shadow.overlay`  | `shadow-overlay`  | `--shadow-overlay`  | Modals, dropdowns, popovers |
| `shadow.overflow` | `shadow-overflow` | `--shadow-overflow` | Scroll indicators           |

### When to Use

- **raised**: Default for cards and interactive elements that need subtle lift
- **overlay**: Floating elements that appear above the page (modals, menus, tooltips)
- **overflow**: Indicate scrollable content has more items
