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
</script>

<template>
  <div class="bcc-pin" :class="[`bcc-pin-${context}-${contrast}`, !icon ? 'bcc-pin-text' : '']">
    <component :is="icon" class="bcc-pin-icon" v-if="icon" />
    <span v-else-if="text">{{ text }}</span>
  </div>
</template>
