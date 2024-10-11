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
</script>

<template>
  <div class="bcc-badge" :class="`bcc-badge-${context}-${contrast} bcc-badge-${size}`">
    <component
      v-if="icon"
      :is="icon"
      class="bcc-badge-icon"
      :class="[iconRight ? 'order-3' : 'order-1']"
    />
    <span class="order-2"><slot></slot></span>
  </div>
</template>
