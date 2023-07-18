<script setup lang="ts">
import { TaskAltIcon, InfoIcon, WarningIcon, ErrorIcon } from "@bcc-code/icons-vue";

type Props = {
  context?: "info" | "success" | "warning" | "danger";
  icon?: boolean;
  title?: string;
};

withDefaults(defineProps<Props>(), {
  context: "info",
  icon: false,
});
</script>

<template>
  <div
    class="bcc-alert"
    :class="{
      'bcc-alert-success': context == 'success',
      'bcc-alert-warning': context == 'warning',
      'bcc-alert-danger': context == 'danger',
    }"
  >
    <span v-if="icon">
      <InfoIcon class="bcc-alert-icon" v-if="context == 'info'" />
      <TaskAltIcon class="bcc-alert-icon" v-if="context == 'success'" />
      <WarningIcon class="bcc-alert-icon" v-if="context == 'warning'" />
      <ErrorIcon class="bcc-alert-icon" v-if="context == 'danger'" />
    </span>
    <h3 v-if="title" class="bcc-alert-title">{{ title }}</h3>
    <p class="bcc-alert-content">
      <slot />
    </p>
  </div>
</template>
