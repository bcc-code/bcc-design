<script setup lang="ts">
import type { VueComponent } from "@/types";

withDefaults(
  defineProps<{
    icon?: VueComponent;
    iconRight?: boolean;
    size?: "xs" | "sm";
    context?: "neutral" | "danger" | "warning" | "success" | "info";
  }>(),
  {
    iconRight: false,
    size: "xs",
    context: "neutral",
  }
);
</script>

<template>
  <div
    class="bcc-badge"
    :class="{
      'bcc-badge-sm': size === 'sm',
      'bcc-badge-danger': context === 'danger',
      'bcc-badge-warning': context === 'warning',
      'bcc-badge-success': context === 'success',
      'bcc-badge-info': context === 'info',
    }"
  >
    <component
      v-if="icon"
      :is="icon"
      class="bcc-badge-icon"
      :class="[iconRight ? 'order-3' : 'order-1']"
    />
    <span class="order-2"><slot></slot></span>
  </div>
</template>
