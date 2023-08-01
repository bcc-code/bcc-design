<script setup lang="ts">
import { colors } from "../tailwind/colors";
import { textColor } from "../tailwind/textColor";
import { borderColor } from "../tailwind/borderColor";
import { backgroundColor } from "../tailwind/backgroundColor";
import ColorGrid from "./ColorGrid.vue";

const items = [
  {
    type: "bg",
    heading: "Background color",
    description: "Background colors from the design system.",
    items: backgroundColor,
  },
  {
    type: "text",
    heading: "Text color",
    description: "Foreground colors from the design system.",
    items: textColor,
  },
  {
    type: "border",
    heading: "Border/outline/ring color",
    description:
      "Substitute 'border' for 'outline' or 'ring' in these class names to render an outline or ring with these colors.",
    items: borderColor,
  },
  {
    type: "",
    heading: "Color palette",
    description: "Available generic colors with a similar range to the default Tailwind colors.",
    items: colors,
  },
];
</script>

<template>
  <div v-for="item in items" :key="item.type" class="mb-6 border-b border-gray-200 pb-2">
    <div class="mb-2 text-xl text-gray-700" :id="item.type">
      {{ item.heading }}
    </div>
    <div class="mb-4 text-gray-600">{{ item.description }}</div>
    <ColorGrid :type="item.type" :tokens="item.items" />
  </div>
</template>
