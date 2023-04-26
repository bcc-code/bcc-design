<script setup lang="ts">
import type { Component } from "vue";

withDefaults(
  defineProps<{
    icon?: string | Component | Function;
    variant?: "neutral" | "danger" | "warning" | "success" | "info" | "system";
    text?: string;
  }>(),
  {
    variant: "neutral",
  }
);
</script>

<template>
  <div
    class="bcc-pin"
    :class="{
      'bcc-pin-danger': variant === 'danger',
      'bcc-pin-warning': variant === 'warning',
      'bcc-pin-success': variant === 'success',
      'bcc-pin-info': variant === 'info',
      'bcc-pin-system': variant === 'system',
    }"
  >
    <component :is="icon" class="bcc-pin-icon" v-if="icon" />
    <span v-else-if="text">{{ text }}</span>
  </div>
</template>
