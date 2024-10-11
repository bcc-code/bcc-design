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
  <div class="bcc-pin" :class="[themeClass[context], contrast, !icon ? 'bcc-pin-text' : '']">
    <component :is="icon" class="bcc-pin-icon" v-if="icon" />
    <span v-else-if="text">{{ text }}</span>
  </div>
</template>
