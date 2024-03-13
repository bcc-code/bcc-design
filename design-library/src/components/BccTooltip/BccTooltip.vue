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

const positionClasses = computed(() => {
  const primary = props.primaryPosition;
  const secondary = props.secondaryPosition;
  return `bcc-tooltip-${primary}-${secondary}`;
});

const variantClasses = {
  dark: "bcc-tooltip-dark",
  white: "bcc-tooltip-white",
  grey: "bcc-tooltip-grey",
};

const computedVisibleClass = computed(() => (props.visible ? "bcc-tooltip-visible" : ""));
</script>

<template>
  <div class="bcc-tooltip">
    <template v-if="$slots.child">
      <slot name="child"></slot>
    </template>
    <div
      :class="[
        'bcc-tooltip-content',
        positionClasses,
        variantClasses[props.variant],
        computedVisibleClass,
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>
