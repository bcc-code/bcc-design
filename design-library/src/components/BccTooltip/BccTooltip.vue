<script setup lang="ts">
type Props = {
  primaryPosition?: "top" | "bottom";
  secondaryPosition?: "left" | "center" | "right";
  variant?: "dark" | "white" | "grey";
  text: string;
  visible?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  primaryPosition: "top",
  secondaryPosition: "center",
  variant: "dark",
  text: "",
  visible: false,
});
</script>

<template>
  <div class="tooltip-wrapper">
    <slot></slot>
    <div
      :class="[
        'tooltip-content',
        `${props.primaryPosition}-${props.secondaryPosition}`,
        props.variant,
        { visible: props.visible },
      ]"
    >
      {{ props.text }}
    </div>
  </div>
</template>
