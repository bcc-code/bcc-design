<script setup lang="ts">
import { CloseIcon } from "@bcc-code/icons-vue";
import type { Component } from "vue";
import BccButton from "../BccButton/BccButton.vue";

type Action = {
  label: string;
  icon?: string | Component | Function;
  onClick?: () => void;
};

type Props = {
  title: string;
  variant?: keyof typeof variants;
  icon?: string | Component | Function;
  closeButton?: boolean;
  closeOnAction?: boolean;
  actions?: Action[];
  open?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  closeButton: true,
  closeOnAction: true,
  open: true,
});

const emit = defineEmits<{
  close: [action?: Action];
}>();

const variants = {
  default: "bcc-banner-default",
  notification: "bcc-banner-notification",
};

function actionClicked(action: Action) {
  if (action.onClick) {
    action.onClick();
  }

  if (props.closeOnAction) {
    emit("close", action);
  }
}
</script>

<template>
  <Transition name="bcc-banner">
    <div class="bcc-banner" v-if="open">
      <div class="bcc-banner-header">
        <component v-if="icon" :is="icon" class="bcc-banner-icon" />
        <h5 class="bcc-banner-title">{{ title }}</h5>
        <button
          @click.prevent="emit('close')"
          v-if="closeButton"
          aria-label="Close banner"
          class="bcc-banner-close-button"
        >
          <CloseIcon class="bcc-banner-close-icon" />
        </button>
      </div>
      <div :class="variants[variant]">
        <slot></slot>

        <div v-if="actions && actions.length" class="bcc-banner-actions">
          <template v-for="(action, index) in actions" :key="index">
            <BccButton
              :icon="action.icon"
              icon-right
              size="sm"
              :variant="variant === 'notification' ? 'tertiary' : 'secondary'"
              @click="actionClicked(action)"
            >
              {{ action.label }}
            </BccButton>
          </template>
        </div>
      </div>
    </div>
  </Transition>
</template>
