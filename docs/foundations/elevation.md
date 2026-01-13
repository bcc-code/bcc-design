---
title: Elevation
order: 5
---

# Elevation

Elevation creates visual hierarchy through surface colors and shadows.

---

## Surface Hierarchy

Surfaces stack in layers. Higher layers appear "closer" to the user.

| Layer | Token | Use Case |
|-------|-------|----------|
| Sunken | `bg-elevation-surface-sunken-default` | Inset areas, input backgrounds |
| Default | `bg-elevation-surface-default` | Page background |
| Raised | `bg-elevation-surface-raised-default` | Cards, panels |
| Overlay | `bg-elevation-surface-overlay-default` | Modals, dropdowns, tooltips |

---

## Surface Tokens

### Default (Page Background)

| Token | Tailwind | Light | Dark |
|-------|----------|-------|------|
| `surface-default` | `bg-elevation-surface-default` | <span style="display:inline-block;width:16px;height:16px;background:#ffffff;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #ffffff | <span style="display:inline-block;width:16px;height:16px;background:#1F1F21;border-radius:3px;vertical-align:middle;border:1px solid #555"></span> #1F1F21 |
| `surface-hovered` | `bg-elevation-surface-hovered` | <span style="display:inline-block;width:16px;height:16px;background:#F0F1F2;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #F0F1F2 | <span style="display:inline-block;width:16px;height:16px;background:#242528;border-radius:3px;vertical-align:middle;border:1px solid #555"></span> #242528 |
| `surface-pressed` | `bg-elevation-surface-pressed` | <span style="display:inline-block;width:16px;height:16px;background:#DDDEE1;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #DDDEE1 | <span style="display:inline-block;width:16px;height:16px;background:#303134;border-radius:3px;vertical-align:middle;border:1px solid #555"></span> #303134 |

### Raised (Cards, Panels)

| Token | Tailwind | Light | Dark |
|-------|----------|-------|------|
| `surface-raised-default` | `bg-elevation-surface-raised-default` | <span style="display:inline-block;width:16px;height:16px;background:#ffffff;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #ffffff | <span style="display:inline-block;width:16px;height:16px;background:#242528;border-radius:3px;vertical-align:middle;border:1px solid #555"></span> #242528 |
| `surface-raised-hovered` | `bg-elevation-surface-raised-hovered` | <span style="display:inline-block;width:16px;height:16px;background:#F0F1F2;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #F0F1F2 | <span style="display:inline-block;width:16px;height:16px;background:#303134;border-radius:3px;vertical-align:middle;border:1px solid #555"></span> #303134 |
| `surface-raised-pressed` | `bg-elevation-surface-raised-pressed` | <span style="display:inline-block;width:16px;height:16px;background:#DDDEE1;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #DDDEE1 | <span style="display:inline-block;width:16px;height:16px;background:#4B4D51;border-radius:3px;vertical-align:middle;border:1px solid #555"></span> #4B4D51 |

### Overlay (Modals, Dropdowns)

| Token | Tailwind | Light | Dark |
|-------|----------|-------|------|
| `surface-overlay-default` | `bg-elevation-surface-overlay-default` | <span style="display:inline-block;width:16px;height:16px;background:#ffffff;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #ffffff | <span style="display:inline-block;width:16px;height:16px;background:#242528;border-radius:3px;vertical-align:middle;border:1px solid #555"></span> #242528 |
| `surface-overlay-hovered` | `bg-elevation-surface-overlay-hovered` | <span style="display:inline-block;width:16px;height:16px;background:#F0F1F2;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #F0F1F2 | <span style="display:inline-block;width:16px;height:16px;background:#303134;border-radius:3px;vertical-align:middle;border:1px solid #555"></span> #303134 |
| `surface-overlay-pressed` | `bg-elevation-surface-overlay-pressed` | <span style="display:inline-block;width:16px;height:16px;background:#DDDEE1;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #DDDEE1 | <span style="display:inline-block;width:16px;height:16px;background:#4B4D51;border-radius:3px;vertical-align:middle;border:1px solid #555"></span> #4B4D51 |

### Sunken (Inset Areas)

| Token | Tailwind | Light | Dark |
|-------|----------|-------|------|
| `surface-sunken-default` | `bg-elevation-surface-sunken-default` | <span style="display:inline-block;width:16px;height:16px;background:#F8F8F8;border-radius:3px;vertical-align:middle;border:1px solid #ddd"></span> #F8F8F8 | <span style="display:inline-block;width:16px;height:16px;background:#18191A;border-radius:3px;vertical-align:middle;border:1px solid #555"></span> #18191A |

---

## Shadows

Use shadows to reinforce elevation levels.

| Token | CSS Variable | Use Case |
|-------|--------------|----------|
| `shadow-raised` | `--elevation-shadow-raised` | Cards, buttons |
| `shadow-overlay` | `--elevation-shadow-overlay` | Modals, dropdowns |
| `shadow-overflow` | `--elevation-shadow-overflow` | Horizontal scroll indicators |

```css
/* Shadow values */
--elevation-shadow-raised: 0 1px 1px 0 rgba(30,31,33,0.25), 0 0 1px 0 rgba(30,31,33,0.31);
--elevation-shadow-overlay: 0 8px 12px 0 rgba(30,31,33,0.15), 0 0 1px 0 rgba(30,31,33,0.31);
--elevation-shadow-overflow: 0 0 8px 0 rgba(30,31,33,0.16), 0 0 1px 0 rgba(30,31,33,0.12);
```

---

## Usage

```html
<!-- Card with raised surface -->
<div class="bg-elevation-surface-raised-default shadow-raised p-200 radius-md">
  Card content
</div>

<!-- Modal with overlay surface -->
<div class="bg-elevation-surface-overlay-default shadow-overlay p-300 radius-lg">
  Modal content
</div>

<!-- Sunken input area -->
<div class="bg-elevation-surface-sunken-default p-100 radius-sm">
  <input type="text" />
</div>
```

---

## Do's and Don'ts

| Do | Don't |
|----|-------|
| Use surface tokens for backgrounds | Use `bg-white` or `bg-gray-*` |
| Match shadow to surface level | Use shadows without matching surface |
| Use sunken for inset UI | Use raised for input backgrounds |
