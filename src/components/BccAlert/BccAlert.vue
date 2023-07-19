<script setup lang="ts">
import { TaskAltIcon, InfoIcon, WarningIcon, ErrorIcon, CloseIcon } from "@bcc-code/icons-vue";

type Props = {
  context?: "info" | "success" | "warning" | "danger";
  icon?: boolean;
  title?: string;
  closeButton?: boolean;
};

withDefaults(defineProps<Props>(), {
  context: "info",
  icon: false,
  closeButton: false,
});

const emit = defineEmits(["close"]);
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
    <button
      @click.prevent="emit('close')"
      v-if="closeButton"
      aria-label="Close alert"
      class="bcc-alert-close-button"
    >
      <CloseIcon class="bcc-alert-close-icon" />
    </button>
  </div>
</template>
