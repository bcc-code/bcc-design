<script setup lang="ts">
import { TaskAltIcon, InfoIcon, WarningIcon, ErrorIcon, CloseIcon } from "@bcc-code/icons-vue";
import { TransitionRoot } from "@headlessui/vue";

type Props = {
  context?: "info" | "success" | "warning" | "danger";
  icon?: boolean;
  title?: string;
  closeButton?: boolean;
  open?: boolean;
};

withDefaults(defineProps<Props>(), {
  context: "info",
  icon: false,
  closeButton: false,
  open: true,
});

const emit = defineEmits(["close"]);
</script>

<template>
  <TransitionRoot
    :show="open"
    enter="transition-opacity duration-100"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="transition-opacity duration-150"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
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
  </TransitionRoot>
</template>
