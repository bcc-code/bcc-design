<script setup lang="ts">
import { BCC_CONTEXTS } from "@/composables/contexts";
import type { VueComponent } from "@/types";

withDefaults(
  defineProps<{
    icon?: VueComponent;
    iconRight?: boolean | VueComponent;
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
      v-if="icon && !iconRight"
      :is="icon"
      class="bcc-badge-icon order-1"
    />
    <span class="order-2 empty:hidden"><slot></slot></span>
    <component
      v-if="shouldShowRightIcon"
      v-if="rightIconComponent"
      :is="rightIconComponent"
      class="bcc-badge-icon order-3"
    />
  </div>
</template>
