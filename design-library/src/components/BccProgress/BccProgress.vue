<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, type StyleValue } from "vue";
import BccFormLabel from "@/components/BccFormLabel/BccFormLabel.vue";

type Props = {
  value?: number;
  max?: number;
  size?: "sm" | "base" | "lg";
  showValues?: boolean;
  showPercentage?: boolean;
  exceed?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 100,
  size: "base",
  showValues: true,
  showPercentage: true,
  exceed: true,
});

const percentage = computed(() => {
  if (props.value > props.max && !props.exceed) return 100;
  return (props.value / props.max) * 100;
});

const percentageSafe = computed(() => {
  if (props.value > props.max) return 100;
  return percentage.value;
});

const height = computed(() => {
  return {
    "h-1": props.size === "sm",
    "h-1.5": props.size === "base",
    "h-2": props.size === "lg",
  };
});
</script>

<template>
  <div
    class="bcc-progress-container"
    :class="$attrs['class']"
    :style="$attrs['style'] as StyleValue"
  >
    <BccFormLabel
      v-if="showPercentage || showValues"
      :size="size"
      :showOptionalLabel="showPercentage"
      :optionalLabel="Math.round(percentage) + '%'"
    >
      <span v-if="showValues">
        {{ props.value.toLocaleString() }} /
        {{ props.max.toLocaleString() }}
      </span>
    </BccFormLabel>

    <div class="bcc-progress" :class="{ ...height }">
      <div
        class="bcc-progress-line"
        :class="{ ...height }"
        :style="{ width: percentageSafe + '%' }"
      />
    </div>
  </div>
</template>
