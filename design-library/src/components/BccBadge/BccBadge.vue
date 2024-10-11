<script setup lang="ts">
import type { VueComponent } from "@/types";

withDefaults(
  defineProps<{
    icon?: VueComponent;
    iconRight?: boolean;
    size?: "xs" | "sm" | "md";
    contrast?: "light" | "dark";
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
    contrast: "light",
    size: "xs",
    context: "neutral",
  }
);

const themeClass = {
  light: {
    neutral: "bcc-badge-neutral-light",
    danger: "bcc-badge-danger-light",
    warning: "bcc-badge-warning-light",
    success: "bcc-badge-success-light",
    info: "bcc-badge-info-light",
    "muddy-waters": "bcc-badge-muddy-waters-light",
    mongoose: "bcc-badge-mongoose-light",
    brand: "bcc-badge-brand-light",
  },
  dark: {
    neutral: "bcc-badge-neutral-dark",
    danger: "bcc-badge-danger-dark",
    warning: "bcc-badge-warning-dark",
    success: "bcc-badge-success-dark",
    info: "bcc-badge-info-dark",
    "muddy-waters": "bcc-badge-muddy-waters-dark",
    mongoose: "bcc-badge-mongoose-dark",
    brand: "bcc-badge-brand-dark",
  },
};

const sizeClass = {
  xs: "bcc-badge-xs",
  sm: "bcc-badge-sm",
  md: "bcc-badge-md",
};
</script>

<template>
  <div class="bcc-badge" :class="[themeClass[contrast][context], sizeClass[size]]">
    <component
      v-if="icon"
      :is="icon"
      class="bcc-badge-icon"
      :class="[iconRight ? 'order-3' : 'order-1']"
    />
    <span class="order-2"><slot></slot></span>
  </div>
</template>
