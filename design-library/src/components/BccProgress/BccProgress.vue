<script setup lang="ts">
import { computed } from "vue";
import BccFormLabel from "@/components/BccFormLabel/BccFormLabel.vue";

type Props = {
  value?: number;
  max?: number;
  size?: "sm" | "base" | "lg";
  progressClass?: string | object;
  barClass?: string | object;
  labelClass?: string | object;
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

const progressClass = computed(() => {
  if (props.progressClass) return props.progressClass;
  return {
    "bcc-progress": true,
    "h-1": props.size === "sm",
    "h-1.5": props.size === "base",
    "h-2": props.size === "lg",
  };
});

const barClass = computed(() => {
  if (props.barClass) return props.barClass;
  if (
    typeof progressClass.value === "object" &&
    Object.keys(progressClass.value).includes("bcc-progress")
  ) {
    const clone: any = { ...progressClass.value };
    delete clone["bcc-progress"];
    return {
      ...clone,
      "bcc-progress-bar": true,
    };
  }
  return progressClass.value;
});
</script>

<template>
  <div class="bcc-progress-container">
    <BccFormLabel
      v-if="showPercentage || showValues"
      :size="size !== 'sm' ? size : 'base'"
      :showOptionalLabel="showPercentage"
      :optionalLabel="Math.round(percentage) + '%'"
      :class="labelClass"
    >
      <span v-if="showValues">
        {{ props.value.toLocaleString() }} /
        {{ props.max.toLocaleString() }}
      </span>
    </BccFormLabel>

    <div class="bcc-progress" :class="progressClass">
      <div
        class="bcc-progress-bar h-full"
        :class="barClass"
        :style="{ width: percentageSafe + '%' }"
      />
    </div>
  </div>
</template>
