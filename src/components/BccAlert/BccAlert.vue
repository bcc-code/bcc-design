<script setup lang="ts">
import { CloseIcon, ErrorIcon, InfoIcon, TaskAltIcon, WarningIcon } from "@bcc-code/icons-vue";
import { TransitionRoot } from "@headlessui/vue";

type Props = {
  context?: keyof typeof contexts;
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

const contexts = {
  info: {
    class: "",
    icon: InfoIcon,
  },
  success: {
    class: "bcc-alert-success",
    icon: TaskAltIcon,
  },
  warning: {
    class: "bcc-alert-warning",
    icon: WarningIcon,
  },
  danger: {
    class: "bcc-alert-danger",
    icon: ErrorIcon,
  },
};
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
      :class="contexts[context].class"
    >
      <component v-if="icon" :is="contexts[context].icon" class="bcc-alert-icon" />

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
