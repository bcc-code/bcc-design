---
sectionTitle: Foundations
sectionOrder: 20
title: Border
order: 10
---

# Border

Border width tokens. For border colors, see [Tokens](./tokens.md#border).

## Width Tokens

| Token            | Tailwind   | CSS                | Value | Use for                      |
| ---------------- | ---------- | ------------------ | ----- | ---------------------------- |
| `border.width.0` | `border-0` | `--border-width-0` | 0     | Remove borders               |
| `border.width.1` | `border-1` | `--border-width-1` | 1px   | Default borders, dividers    |
| `border.width.2` | `border-2` | `--border-width-2` | 2px   | Selected states, focus rings |

## Common Pairings

| State    | Width      | Color             |
| -------- | ---------- | ----------------- |
| Default  | `border-1` | `border-default`  |
| Selected | `border-2` | `border-selected` |
| Focused  | `border-2` | `border-focused`  |
| Input    | `border-1` | `border-input`    |

## Guidelines

| Do                                                   | Don't                                         |
| ---------------------------------------------------- | --------------------------------------------- |
| Use `border-2` with `border-selected` for selection  | Mix border widths inconsistently              |
| Use `border-2` with `border-focused` for focus rings | Skip focus indicators on interactive elements |
| Keep default borders at 1px                          | Use thick borders for standard UI             |
