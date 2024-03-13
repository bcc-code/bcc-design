<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

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

const tooltipContent = ref<HTMLElement | null>(null);
const contentWidthClass = computed(() => {
  if (!tooltipContent.value) return "";
  const contentWidth = tooltipContent.value.offsetWidth;
  if (contentWidth >= 100) {
    return "w-full";
  }
  return "w-auto";
});

onMounted(() => {
  window.addEventListener("resize", () => {});
});

onUnmounted(() => {
  window.removeEventListener("resize", () => {});
});
</script>

<template>
  <div class="bcc-tooltip">
    <slot name="child"></slot>
    <div
      ref="tooltipContent"
      :class="[
        'bcc-tooltip-content',
        `${props.primaryPosition}-${props.secondaryPosition}`,
        props.variant,
        { visible: props.visible },
        contentWidthClass,
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>
