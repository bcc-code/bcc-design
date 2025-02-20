<script setup lang="ts">
import type { VueComponent } from "@/types";
import { useSlots } from "vue";

type Props = {
  is?: "button" | "a" | VueComponent;
  variant?: keyof typeof variants;
  context?: keyof typeof contexts;
  size?: keyof typeof sizes;
  icon?: VueComponent;
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

const slots = useSlots() as {
  default: any;
};
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
    <slot></slot>
    <component
      v-if="icon"
      :is="icon"
      class="bcc-button-icon"
      :class="[iconRight ? 'order-2' : '-order-1']"
    />
  </component>
</template>
