<script setup lang="ts">
import { BCC_CONTEXTS } from "@/composables/contexts";
import type { VueComponent } from "@/types";
import {
  CloseIcon,
  ErrorFillIcon,
  InfoFillIcon,
  InfoIcon,
  NotificationsFillIcon,
  TaskAltIcon,
  WarningFillIcon,
} from "@bcc-code/icons-vue";

type Props = {
  context?: keyof typeof BCC_CONTEXTS;
  icon?: boolean | VueComponent;
  title?: string;
  closeButton?: boolean;
  open?: boolean;
  contrast?: "light" | "dark";
  noBorder?: boolean;
};

withDefaults(defineProps<Props>(), {
  context: "info",
  icon: false,
  closeButton: false,
  open: true,
  noBorder: false,
  contrast: "light",
});

const emit = defineEmits(["close"]);

const ContextIcons: Partial<Record<keyof typeof BCC_CONTEXTS, VueComponent>> = {
  info: InfoFillIcon,
  success: TaskAltIcon,
  warning: WarningFillIcon,
  danger: ErrorFillIcon,
  neutral: NotificationsFillIcon,
};
</script>

<template>
  <Transition name="bcc-fade">
    <div
      v-if="open"
      class="bcc-alert"
      :class="[BCC_CONTEXTS[context], { border: !noBorder }, contrast]"
    >
      <component
        v-if="icon"
        :is="typeof icon === 'boolean' ? ContextIcons[context] || InfoIcon : icon"
        class="bcc-alert-icon"
      />

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
