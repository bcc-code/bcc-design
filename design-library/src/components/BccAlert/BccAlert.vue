<script setup lang="ts">
import {
  CloseIcon,
  ErrorFillIcon,
  InfoFillIcon,
  TaskAltIcon,
  WarningFillIcon,
  NotificationsFillIcon,
} from "@bcc-code/icons-vue";

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
    icon: InfoFillIcon,
  },
  success: {
    class: "bcc-alert-success",
    icon: TaskAltIcon,
  },
  warning: {
    class: "bcc-alert-warning",
    icon: WarningFillIcon,
  },
  danger: {
    class: "bcc-alert-danger",
    icon: ErrorFillIcon,
  },
  notice: {
    class: "bcc-alert-notice",
    icon: NotificationsFillIcon,
  },
};
</script>

<template>
  <Transition name="bcc-fade">
    <div v-if="open" class="bcc-alert" :class="contexts[context].class">
      <component v-if="icon" :is="contexts[context].icon" class="bcc-alert-icon" />

      <div class="bcc-alert-content">
        <h3 v-if="title" class="bcc-alert-title">{{ title }}</h3>
        <p><slot></slot></p>
      </div>
      <button
        @click.prevent="emit('close')"
        v-if="closeButton"
        aria-label="Close alert"
        class="bcc-alert-close-button"
      >
        <CloseIcon class="bcc-alert-close-icon" />
      </button>
    </div>
  </Transition>
</template>
