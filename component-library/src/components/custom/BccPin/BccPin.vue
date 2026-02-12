<script setup lang="ts">
import { BCC_CONTEXTS } from "@/composables/contexts";
import type { VueComponent } from "@/types";

withDefaults(
  defineProps<{
    icon?: VueComponent;
    context?: keyof typeof BCC_CONTEXTS;
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
</script>

<template>
  <div
    class="bcc-pin"
    :class="[
      BCC_CONTEXTS[context],
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
