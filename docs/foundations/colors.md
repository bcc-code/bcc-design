---
sectionTitle: Foundations
sectionOrder: 20
title: Colors
order: 4
---

# Colors

::: warning Work in Progress
This section is under development.
:::

For semantic color tokens (text, background, border, icon), see [Tokens](./tokens.md).

## Primitives

Base color scales used to build semantic tokens.

::: danger Avoid using primitives directly
Primitives don't adapt to dark mode and lack semantic meaning. Always prefer semantic tokens like `text-default`, `bg-elevation-surface-default`, or `border-brand` instead of raw colors like `bg-neutral-100` or `text-bcc-700`.

**Don't:** `class="bg-neutral-100 text-neutral-1000"`

**Do:** `class="bg-elevation-surface-default text-default"`
:::

### Neutral

| Token                | Tailwind Class    | Hex       |
| -------------------- | ----------------- | --------- |
| `color.neutral.0`    | `bg-neutral-0`    | `#ffffff` |
| `color.neutral.100`  | `bg-neutral-100`  | `#f8f8f8` |
| `color.neutral.200`  | `bg-neutral-200`  | `#f0f1f2` |
| `color.neutral.300`  | `bg-neutral-300`  | `#dddee1` |
| `color.neutral.400`  | `bg-neutral-400`  | `#b7b9be` |
| `color.neutral.500`  | `bg-neutral-500`  | `#8c8f97` |
| `color.neutral.600`  | `bg-neutral-600`  | `#7d818a` |
| `color.neutral.700`  | `bg-neutral-700`  | `#6b6e76` |
| `color.neutral.800`  | `bg-neutral-800`  | `#505258` |
| `color.neutral.900`  | `bg-neutral-900`  | `#3b3d42` |
| `color.neutral.1000` | `bg-neutral-1000` | `#292a2e` |
| `color.neutral.1100` | `bg-neutral-1100` | `#1e1f21` |

### BCC (Brand)

| Token            | Tailwind Class | Hex       |
| ---------------- | -------------- | --------- |
| `color.bcc.100`  | `bg-bcc-100`   | `#f0fcfa` |
| `color.bcc.200`  | `bg-bcc-200`   | `#d2eeeb` |
| `color.bcc.300`  | `bg-bcc-300`   | `#a0cec8` |
| `color.bcc.400`  | `bg-bcc-400`   | `#6fb5ad` |
| `color.bcc.500`  | `bg-bcc-500`   | `#3e9f97` |
| `color.bcc.600`  | `bg-bcc-600`   | `#1d7f78` |
| `color.bcc.700`  | `bg-bcc-700`   | `#0c625c` |
| `color.bcc.800`  | `bg-bcc-800`   | `#014d49` |
| `color.bcc.900`  | `bg-bcc-900`   | `#0b3633` |
| `color.bcc.1000` | `bg-bcc-1000`  | `#012320` |

### Blue

| Token             | Tailwind Class | Hex       |
| ----------------- | -------------- | --------- |
| `color.blue.100`  | `bg-blue-100`  | `#f6fbff` |
| `color.blue.200`  | `bg-blue-200`  | `#d9ecff` |
| `color.blue.300`  | `bg-blue-300`  | `#a6cdfd` |
| `color.blue.400`  | `bg-blue-400`  | `#7cabf9` |
| `color.blue.500`  | `bg-blue-500`  | `#608ef6` |
| `color.blue.600`  | `bg-blue-600`  | `#446add` |
| `color.blue.700`  | `bg-blue-700`  | `#274eb5` |
| `color.blue.800`  | `bg-blue-800`  | `#273c8f` |
| `color.blue.900`  | `bg-blue-900`  | `#212c64` |
| `color.blue.1000` | `bg-blue-1000` | `#091e47` |

### Teal

| Token             | Tailwind Class | Hex       |
| ----------------- | -------------- | --------- |
| `color.teal.100`  | `bg-teal-100`  | `#f6fbff` |
| `color.teal.200`  | `bg-teal-200`  | `#c3f2f8` |
| `color.teal.300`  | `bg-teal-300`  | `#82d3e3` |
| `color.teal.400`  | `bg-teal-400`  | `#51b9cf` |
| `color.teal.500`  | `bg-teal-500`  | `#1a9eb7` |
| `color.teal.600`  | `bg-teal-600`  | `#0b7da1` |
| `color.teal.700`  | `bg-teal-700`  | `#005b81` |
| `color.teal.800`  | `bg-teal-800`  | `#09486b` |
| `color.teal.900`  | `bg-teal-900`  | `#0d324d` |
| `color.teal.1000` | `bg-teal-1000` | `#0c2132` |

### Green

| Token              | Tailwind Class  | Hex       |
| ------------------ | --------------- | --------- |
| `color.green.100`  | `bg-green-100`  | `#efffed` |
| `color.green.200`  | `bg-green-200`  | `#cbf3c9` |
| `color.green.300`  | `bg-green-300`  | `#83d895` |
| `color.green.400`  | `bg-green-400`  | `#32c180` |
| `color.green.500`  | `bg-green-500`  | `#1ca673` |
| `color.green.600`  | `bg-green-600`  | `#09825d` |
| `color.green.700`  | `bg-green-700`  | `#0c6241` |
| `color.green.800`  | `bg-green-800`  | `#094c3b` |
| `color.green.900`  | `bg-green-900`  | `#073734` |
| `color.green.1000` | `bg-green-1000` | `#032429` |

### Yellow

| Token               | Tailwind Class   | Hex       |
| ------------------- | ---------------- | --------- |
| `color.yellow.100`  | `bg-yellow-100`  | `#fdf8e9` |
| `color.yellow.200`  | `bg-yellow-200`  | `#f8e6a0` |
| `color.yellow.300`  | `bg-yellow-300`  | `#e9c348` |
| `color.yellow.400`  | `bg-yellow-400`  | `#d5a406` |
| `color.yellow.500`  | `bg-yellow-500`  | `#bc870d` |
| `color.yellow.600`  | `bg-yellow-600`  | `#a4670b` |
| `color.yellow.700`  | `bg-yellow-700`  | `#854901` |
| `color.yellow.800`  | `bg-yellow-800`  | `#653805` |
| `color.yellow.900`  | `bg-yellow-900`  | `#4b2c04` |
| `color.yellow.1000` | `bg-yellow-1000` | `#2d1f00` |

### Orange

| Token               | Tailwind Class   | Hex       |
| ------------------- | ---------------- | --------- |
| `color.orange.100`  | `bg-orange-100`  | `#fffaed` |
| `color.orange.200`  | `bg-orange-200`  | `#fee3c1` |
| `color.orange.300`  | `bg-orange-300`  | `#f6b981` |
| `color.orange.400`  | `bg-orange-400`  | `#f19457` |
| `color.orange.500`  | `bg-orange-500`  | `#da772e` |
| `color.orange.600`  | `bg-orange-600`  | `#b55919` |
| `color.orange.700`  | `bg-orange-700`  | `#943a14` |
| `color.orange.800`  | `bg-orange-800`  | `#782612` |
| `color.orange.900`  | `bg-orange-900`  | `#5d1712` |
| `color.orange.1000` | `bg-orange-1000` | `#420e0d` |

### Red

| Token            | Tailwind Class | Hex       |
| ---------------- | -------------- | --------- |
| `color.red.100`  | `bg-red-100`   | `#fff8f3` |
| `color.red.200`  | `bg-red-200`   | `#fee2dd` |
| `color.red.300`  | `bg-red-300`   | `#fab6ad` |
| `color.red.400`  | `bg-red-400`   | `#fa877e` |
| `color.red.500`  | `bg-red-500`   | `#ed6362` |
| `color.red.600`  | `bg-red-600`   | `#ca414e` |
| `color.red.700`  | `bg-red-700`   | `#a42237` |
| `color.red.800`  | `bg-red-800`   | `#811436` |
| `color.red.900`  | `bg-red-900`   | `#630d2e` |
| `color.red.1000` | `bg-red-1000`  | `#440223` |

### Magenta

| Token                | Tailwind Class    | Hex       |
| -------------------- | ----------------- | --------- |
| `color.magenta.100`  | `bg-magenta-100`  | `#fff8ff` |
| `color.magenta.200`  | `bg-magenta-200`  | `#fce0f8` |
| `color.magenta.300`  | `bg-magenta-300`  | `#f3b4e2` |
| `color.magenta.400`  | `bg-magenta-400`  | `#eb8acf` |
| `color.magenta.500`  | `bg-magenta-500`  | `#de66b0` |
| `color.magenta.600`  | `bg-magenta-600`  | `#be428f` |
| `color.magenta.700`  | `bg-magenta-700`  | `#952e70` |
| `color.magenta.800`  | `bg-magenta-800`  | `#751f57` |
| `color.magenta.900`  | `bg-magenta-900`  | `#5b1043` |
| `color.magenta.1000` | `bg-magenta-1000` | `#3f0534` |

### Purple

| Token               | Tailwind Class   | Hex       |
| ------------------- | ---------------- | --------- |
| `color.purple.100`  | `bg-purple-100`  | `#f6f9ff` |
| `color.purple.200`  | `bg-purple-200`  | `#e3e3fe` |
| `color.purple.300`  | `bg-purple-300`  | `#c9c3ec` |
| `color.purple.400`  | `bg-purple-400`  | `#afa0e0` |
| `color.purple.500`  | `bg-purple-500`  | `#9a82da` |
| `color.purple.600`  | `bg-purple-600`  | `#8360c3` |
| `color.purple.700`  | `bg-purple-700`  | `#61479c` |
| `color.purple.800`  | `bg-purple-800`  | `#493481` |
| `color.purple.900`  | `bg-purple-900`  | `#352465` |
| `color.purple.1000` | `bg-purple-1000` | `#1d154d` |

### Brown

| Token              | Tailwind Class  | Hex       |
| ------------------ | --------------- | --------- |
| `color.brown.100`  | `bg-brown-100`  | `#f9faf4` |
| `color.brown.200`  | `bg-brown-200`  | `#ece8dc` |
| `color.brown.300`  | `bg-brown-300`  | `#d1c5b0` |
| `color.brown.400`  | `bg-brown-400`  | `#bea889` |
| `color.brown.500`  | `bg-brown-500`  | `#a98c66` |
| `color.brown.600`  | `bg-brown-600`  | `#8b6d45` |
| `color.brown.700`  | `bg-brown-700`  | `#6e5232` |
| `color.brown.800`  | `bg-brown-800`  | `#553d28` |
| `color.brown.900`  | `bg-brown-900`  | `#3f2c1e` |
| `color.brown.1000` | `bg-brown-1000` | `#2e1b0f` |
