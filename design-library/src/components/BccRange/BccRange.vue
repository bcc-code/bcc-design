<script setup lang="ts">
import { computed } from "vue";

const {
  max = 10,
  min = 0,
  step = 1,
  disabled = false,
  hideValue = false,
} = defineProps<{
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  hideValue: boolean;
}>();

const value = defineModel<number>({ required: true, default: 0 });
const percentage = computed(() => {
  const p = ((value.value - min) / (max - min)) * 100;
  return p > 100 ? 100 : p < 0 ? 0 : p;
});

const valueColor = computed(() => {
  if (disabled) {
    return "bg-gray-50 text-gray-400 dark:bg-gray-700";
  }

  if (percentage.value < 33) {
    return "bg-success text-success";
  } else if (percentage.value < 66) {
    return "bg-warning text-warning";
  } else {
    return "bg-danger text-danger";
  }
});

function valuePosition(percentage: number) {
  const thumbHalfWidth = 8;

  const leftEdgeProximity = Math.max(0, 1 - percentage / 70);
  const rightEdgeProximity = Math.max(0, 1 - (100 - percentage) / 70);

  const leftOffset = thumbHalfWidth * leftEdgeProximity;
  const rightOffset = -thumbHalfWidth * rightEdgeProximity;

  return `calc(${percentage}% + ${leftOffset + rightOffset}px)`;
}
</script>

<template>
  <div class="bcc-range">
    <div class="bcc-range__container">
      <div
        v-if="!hideValue"
        class="bcc-range__value"
        :class="valueColor"
        :style="{ left: valuePosition(percentage) }"
      >
        {{ value }}
      </div>
      <input
        type="range"
        class="bcc-range__input"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        v-model="value"
      />
    </div>
  </div>
</template>
