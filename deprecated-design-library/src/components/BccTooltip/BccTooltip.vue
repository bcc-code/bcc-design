<script setup lang="ts">
import { computed } from "vue";

type Props = {
  primaryPosition?: "top" | "bottom";
  secondaryPosition?: "left" | "center" | "right";
  variant?: "dark" | "white" | "grey";
  visible?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  primaryPosition: "top",
  secondaryPosition: "center",
  variant: "dark",
  visible: false,
});

const variantClasses = {
  dark: "bcc-tooltip-dark",
  white: "bcc-tooltip-white",
  grey: "bcc-tooltip-grey",
};

const classMappings = {
  "top-left": "bcc-tooltip-top-left",
  "top-center": "bcc-tooltip-top-center",
  "top-right": "bcc-tooltip-top-right",
  "bottom-left": "bcc-tooltip-bottom-left",
  "bottom-center": "bcc-tooltip-bottom-center",
  "bottom-right": "bcc-tooltip-bottom-right",
};

const position = computed(() => {
  return `${props.primaryPosition}-${props.secondaryPosition}` as keyof typeof classMappings;
});
</script>

<template>
  <div class="bcc-tooltip">
    <template v-if="$slots.child">
      <slot name="child"></slot>
    </template>
    <div
      :class="[
        'bcc-tooltip-content',
        classMappings[position],
        variantClasses[props.variant],
        { 'bcc-tooltip-visible': props.visible },
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>
