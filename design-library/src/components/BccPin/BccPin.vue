<script setup lang="ts">
import type { Component } from "vue";

withDefaults(
  defineProps<{
    icon?: string | Component | Function;
    context?: "neutral" | "danger" | "warning" | "success" | "info";
    text?: string;
  }>(),
  {
    context: "neutral",
  }
);
</script>

<template>
  <div
    class="bcc-pin"
    :class="{
      'bcc-pin-text': !icon,
      'bcc-pin-danger': context === 'danger',
      'bcc-pin-warning': context === 'warning',
      'bcc-pin-success': context === 'success',
      'bcc-pin-info': context === 'info',
    }"
  >
    <component :is="icon" class="bcc-pin-icon" v-if="icon" />
    <span v-else-if="text">{{ text }}</span>
  </div>
</template>
