<script setup lang="ts">
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
</script>

<template>
  <div class="bcc-tooltip">
    <template v-if="$slots.child">
      <slot name="child"></slot>
    </template>
    <div
      :class="[
        'bcc-tooltip-content',
        `${props.primaryPosition}-${props.secondaryPosition}`,
        props.variant,
        { visible: props.visible },
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>
