<script setup lang="ts">
import type { VueComponent } from "@/types";
import { BCC_CONTEXTS } from "@/composables/contexts";

withDefaults(
  defineProps<{
    icon?: VueComponent;
    iconRight?: boolean;
    size?: "xs" | "sm" | "md";
    contrast?: "light" | "dark";
    bordered?: boolean;
    context?: keyof typeof BCC_CONTEXTS;
  }>(),
  {
    iconRight: false,
    bordered: false,
    contrast: "light",
    size: "xs",
    context: "neutral",
  }
);
</script>

<template>
  <div class="bcc-badge" :class="[BCC_CONTEXTS[context], contrast, size, { bordered }]">
    <component
      v-if="icon"
      :is="icon"
      class="bcc-badge-icon"
      :class="[iconRight ? 'order-3' : 'order-1']"
    />
    <span class="order-2"><slot></slot></span>
  </div>
</template>
