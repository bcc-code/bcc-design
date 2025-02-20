<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  max: { type: Number, default: 10 },
  min: { type: Number, default: 0 },
  step: { type: Number, default: 1 },
  disabled: { type: Boolean, default: false },
  hideValue: { type: Boolean, default: false },
});

const value = defineModel<number>({ required: true, default: 0 });

const valueInfo = computed(() => {
  const thumbHalfWidth = 8;
  let theme = "";
  let position = `left: calc(0% + ${thumbHalfWidth}px);`;

  const p = ((value.value - props.min) / (props.max - props.min)) * 100;
  const percentage = p > 100 ? 100 : p < 0 ? 0 : p;

  if (props.disabled) {
    theme = "bg-gray-50 text-gray-400 dark:bg-gray-700";
  } else if (percentage < 33) {
    theme = "bg-success text-success";
  } else if (percentage < 66) {
    theme = "bg-warning text-warning";
  } else {
    theme = "bg-danger text-danger";
  }

  const leftOffset = thumbHalfWidth * Math.max(0, 1 - percentage / 70);
  const rightOffset = -thumbHalfWidth * Math.max(0, 1 - (100 - percentage) / 70);

  position = `left: calc(${percentage}% + ${leftOffset + rightOffset}px);`;

  return {
    theme,
    position,
  };
});
</script>

<template>
  <div class="bcc-range">
    <div class="bcc-range__container">
      <div
        v-if="!hideValue"
        class="bcc-range__value"
        :class="valueInfo.theme"
        :style="valueInfo.position"
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
