<script setup lang="ts">
import type { VueComponent } from "@/types";

withDefaults(
  defineProps<{
    icon?: VueComponent;
    context?:
      | "neutral"
      | "danger"
      | "warning"
      | "success"
      | "info"
      | "muddy-waters"
      | "mongoose"
      | "brand";
    contrast?: "light" | "dark";
    size?: "sm" | "base" | "lg" | "xl";
    text?: string;
    bordered?: boolean;
    squared?: boolean;
  }>(),
  {
    bordered: false,
    context: "neutral",
    contrast: "light",
    size: "base",
    squared: false,
  }
);

const themeClass = {
  neutral: "bcc-pin-neutral",
  danger: "bcc-pin-danger",
  warning: "bcc-pin-warning",
  success: "bcc-pin-success",
  info: "bcc-pin-info",
  "muddy-waters": "bcc-pin-muddy-waters",
  mongoose: "bcc-pin-mongoose",
  brand: "bcc-pin-brand",
};
</script>

<template>
  <div
    class="bcc-pin"
    :class="[
      themeClass[context],
      contrast,
      size,
      {
        bordered,
        squared,
        'bcc-pin-text': !icon && text && String(text).length > 1,
      },
    ]"
  >
    <component :is="icon" class="bcc-pin-icon" v-if="icon" />
    <span v-else-if="text">{{ text }}</span>
  </div>
</template>
