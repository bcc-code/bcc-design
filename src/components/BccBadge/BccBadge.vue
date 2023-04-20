<script setup lang="ts">
import type { Component } from "vue";

withDefaults(
  defineProps<{
    icon?: string | Component | Function;
    iconRight?: boolean;
    size?: "xs" | "sm";
    variant?: "neutral" | "danger" | "warning" | "success" | "info" | "system";
  }>(),
  {
    iconRight: false,
    size: "xs",
    variant: "neutral",
  }
);
</script>

<template>
  <div
    class="bcc-badge"
    :class="{
      'bcc-badge-xs': size === 'xs',
      'bcc-badge-sm': size === 'sm',
      'bcc-badge-neutral': variant === 'neutral',
      'bcc-badge-danger': variant === 'danger',
      'bcc-badge-warning': variant === 'warning',
      'bcc-badge-success': variant === 'success',
      'bcc-badge-info': variant === 'info',
      'bcc-badge-system': variant === 'system',
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
