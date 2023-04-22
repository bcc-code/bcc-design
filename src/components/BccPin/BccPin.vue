<script setup lang="ts">
import type { Component } from "vue";

withDefaults(
  defineProps<{
    icon?: string | Component | Function;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    variant?: "neutral" | "danger" | "warning" | "success" | "info" | "systemInfo";
  }>(),
  {
    size: "xs",
    variant: "neutral",
  }
);
</script>

<template>
  <div
    class="bcc-pin"
    :class="{
      'bcc-pin-neutral': variant === 'neutral',
      'bcc-pin-danger': variant === 'danger',
      'bcc-pin-warning': variant === 'warning',
      'bcc-pin-success': variant === 'success',
      'bcc-pin-info': variant === 'info',
      'bcc-pin-systeminfo': variant === 'systemInfo',

      'bcc-pin-xs': size === 'xs',
      'bcc-pin-sm': size === 'sm',
      'bcc-pin-md': size === 'md',
      'bcc-pin-lg': size === 'lg',
      'bcc-pin-xl': size === 'xl',
      'bcc-pin-2xl': size === '2xl',
    }"
  >
    <component :is="icon" class="bcc-pin-icon" />
  </div>
</template>
