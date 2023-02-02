<script setup lang="ts">
export interface Props {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary";
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  style?: "regular" | "rounded";
  disabled?: boolean; // TODO define in design system
}

withDefaults(defineProps<Props>(), {
  type: "button",
  variant: "primary",
  size: "base",
  style: "regular",
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="rounded bg-primary-dark-green-600 py-2.5 px-5 text-sm font-semibold text-neutral-50 hover:bg-primary-dark-green-500"
  >
    <slot></slot>
  </button>
</template>
