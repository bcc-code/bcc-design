<script setup lang="ts">
import type { Component } from "vue";
import { useSlots } from "vue";

type Props = {
  is?: "button" | "a" | string | Component;
  variant?: keyof typeof variants;
  context?: keyof typeof contexts;
  size?: keyof typeof sizes;
  icon?: string | Component | Function;
  iconRight?: boolean;
  justifyContent?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  padding?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  is: "button",
  variant: "primary",
  context: "default",
  size: "base",
  iconRight: false,
  justifyContent: false,
  rounded: false,
  disabled: false,
  padding: true,
});

const slots = useSlots();
const iconOnly = props.icon !== undefined && !slots.default;

const sizes = {
  xs: "bcc-button-xs",
  sm: "bcc-button-sm",
  base: "",
  lg: "bcc-button-lg",
  xl: "bcc-button-xl",
};

const variants = {
  primary: "bcc-button-primary",
  secondary: "bcc-button-secondary",
  tertiary: "bcc-button-tertiary",
};

const contexts = {
  default: "",
  danger: "bcc-button-danger",
};
</script>

<template>
  <component
    :is="is"
    :disabled="disabled"
    class="bcc-button"
    :class="[
      sizes[size],
      variants[variant],
      contexts[context],
      {
        'bcc-button-no-padding': !padding,
        'bcc-button-icon-only': iconOnly,
        'bcc-button-rounded': rounded,
        'bcc-button-justify-content': justifyContent,
      },
    ]"
  >
    <component v-if="icon" :is="icon" class="bcc-button-icon order-2" />
    <span v-if="$slots.default" :class="[iconRight ? 'order-1' : 'order-3']"><slot /></span>
  </component>
</template>
