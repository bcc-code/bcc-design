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
    iconColor?: string;
    iconRightColor?: string;
  }>(),
  {
    iconRight: false,
    bordered: false,
    contrast: "light",
    size: "xs",
    context: "neutral",
  }
);

const icons = computed(() => {
  const iconOnRight = props.iconRight && typeof props.iconRight === "boolean";
  const hasLeftIcon = props.icon && !iconOnRight;

  return {
    left: hasLeftIcon ? props.icon : null,
    right: iconOnRight ? props.icon : props.iconRight,
  };
});
</script>

<template>
  <div class="bcc-badge" :class="[BCC_CONTEXTS[context], contrast, size, { bordered }]">
    <component v-if="icons.left" :is="icons.left" class="bcc-badge-icon" :class="{ iconColor }" />
    <span class="empty:hidden"><slot></slot></span>
    <component v-if="icons.right" :is="icons.right" class="bcc-badge-icon" :class="{ iconRightColor }" />
  </div>
</template>
