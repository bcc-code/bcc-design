<script setup lang="ts">
import type { VueComponent } from "@/types";

withDefaults(
  defineProps<{
    icon?: VueComponent;
    iconRight?: boolean;
    size?: "xs" | "sm" | "md";
    contrast?: "light" | "dark";
    bordered?: boolean;
    context?:
      | "neutral"
      | "danger"
      | "warning"
      | "success"
      | "info"
      | "muddy-waters"
      | "mongoose"
      | "brand";
  }>(),
  {
    iconRight: false,
    bordered: false,
    contrast: "light",
    size: "xs",
    context: "neutral",
  }
);

const themeClass = {
  neutral: "bcc-badge-neutral",
  danger: "bcc-badge-danger",
  warning: "bcc-badge-warning",
  success: "bcc-badge-success",
  info: "bcc-badge-info",
  "muddy-waters": "bcc-badge-muddy-waters",
  mongoose: "bcc-badge-mongoose",
  brand: "bcc-badge-brand",
};

const sizeClass = {
  xs: "bcc-badge-xs",
  sm: "bcc-badge-sm",
  md: "bcc-badge-md",
};
</script>

<template>
  <div class="bcc-badge" :class="[themeClass[context], contrast, sizeClass[size], { bordered }]">
    <component
      v-if="icon"
      :is="icon"
      class="bcc-badge-icon"
      :class="[iconRight ? 'order-3' : 'order-1']"
    />
    <span class="order-2"><slot></slot></span>
  </div>
</template>
