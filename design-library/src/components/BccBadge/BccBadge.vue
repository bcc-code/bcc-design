<script setup lang="ts">
import { BCC_CONTEXTS } from "@/composables/contexts";
import type { VueComponent } from "@/types";
import { computed, defineProps, withDefaults } from "vue";

const props = withDefaults(
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

const shouldShowRightIcon = computed(() => {
  return (props.iconRight && typeof props.iconRight !== 'boolean') || (props.icon && props.iconRight === true)
})
</script>

<template>
  <div class="bcc-badge" :class="[BCC_CONTEXTS[context], contrast, size, { bordered }]">
    <component
      v-if="icon && iconRight !== true"
      :is="icon"
      class="bcc-badge-icon order-1"
    />
    <span class="order-2 empty:hidden"><slot></slot></span>
    <component
      v-if="shouldShowRightIcon"
      :is="typeof iconRight !== 'boolean' ? iconRight : icon"
      class="bcc-badge-icon order-3"
    />
  </div>
</template>
