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
    text?: string;
  }>(),
  {
    context: "neutral",
    contrast: "light",
  }
);

const themeClass = {
  light: {
    neutral: "bcc-pin-neutral-light",
    danger: "bcc-pin-danger-light",
    warning: "bcc-pin-warning-light",
    success: "bcc-pin-success-light",
    info: "bcc-pin-info-light",
    "muddy-waters": "bcc-pin-muddy-waters-light",
    mongoose: "bcc-pin-mongoose-light",
    brand: "bcc-pin-brand-light",
  },
  dark: {
    neutral: "bcc-pin-neutral-dark",
    danger: "bcc-pin-danger-dark",
    warning: "bcc-pin-warning-dark",
    success: "bcc-pin-success-dark",
    info: "bcc-pin-info-dark",
    "muddy-waters": "bcc-pin-muddy-waters-dark",
    mongoose: "bcc-pin-mongoose-dark",
    brand: "bcc-pin-brand-dark",
  },
};
</script>

<template>
  <div class="bcc-pin" :class="[themeClass[contrast][context], !icon ? 'bcc-pin-text' : '']">
    <component :is="icon" class="bcc-pin-icon" v-if="icon" />
    <span v-else-if="text">{{ text }}</span>
  </div>
</template>
