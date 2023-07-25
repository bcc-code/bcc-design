<script setup lang="ts">
import type { Component } from "vue";
import { useSlots } from "vue";

type Props = {
  is?: "button" | "a" | string | Component;
  variant?: "primary" | "secondary" | "tertiary";
  context?: "default" | "danger";
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  icon?: string | Component | Function;
  iconRight?: boolean;
  center?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  tertiaryPadding?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  is: "button",
  variant: "primary",
  context: "default",
  size: "base",
  iconRight: false,
  center: true,
  rounded: false,
  disabled: false,
  tertiaryPadding: false,
});

const slots = useSlots();
const iconOnly = props.icon !== undefined && !slots.default;
</script>

<template>
  <component
    :is="is"
    :disabled="disabled"
    class="bcc-button"
    :class="{
      'bcc-button-xs': size === 'xs',
      'bcc-button-sm': size === 'sm',
      'bcc-button-lg': size === 'lg',
      'bcc-button-xl': size === 'xl',
      'bcc-button-danger': context === 'danger',
      'bcc-button-primary': variant === 'primary',
      'bcc-button-secondary': variant === 'secondary',
      'bcc-button-tertiary': variant === 'tertiary',
      'bcc-button-no-padding': !tertiaryPadding,
      'bcc-button-icon-only': iconOnly,
      'bcc-button-rounded': rounded,
      'bcc-button-center': center,
    }"
  >
    <component v-if="icon" :is="icon" class="bcc-button-icon order-2" />
    <span v-if="$slots.default" :class="[iconRight ? 'order-1' : 'order-3']"><slot /></span>
  </component>
</template>
