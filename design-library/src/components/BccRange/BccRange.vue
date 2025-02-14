<script setup lang="ts">
import { onMounted, computed } from "vue";

const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 10 },
  step: { type: Number, default: 1 },
  disabled: { type: Boolean, default: false },
  fromLeft: { type: Boolean, default: true },
});

const value = defineModel<number>({ required: true });

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  value.value = Number(target.value);
};

onMounted(() => {
  value.value = props.fromLeft ? props.min : Math.round((props.max - props.min) / 2);
});

const valuePosition = computed(() => {
  const percentage = ((value.value - props.min) / (props.max - props.min)) * 100;
  const thumbHalfWidth = 8;

  const leftEdgeProximity = Math.max(0, 1 - percentage / 70);
  const rightEdgeProximity = Math.max(0, 1 - (100 - percentage) / 70);

  const leftOffset = thumbHalfWidth * leftEdgeProximity;
  const rightOffset = -thumbHalfWidth * rightEdgeProximity;

  console.log(
    percentage,
    leftEdgeProximity,
    rightEdgeProximity,
    leftOffset,
    rightOffset,
    `calc(${percentage}% + ${leftOffset + rightOffset}px)`
  );
  return `calc(${percentage}% + ${leftOffset + rightOffset}px)`;
});

const valueColor = computed(() => {
  const thirds = (props.max - props.min) / 3;
  if (value.value < thirds) {
    return "bg-success text-success";
  } else if (value.value < thirds * 2) {
    return "bg-warning text-warning";
  } else {
    return "bg-danger text-danger";
  }
});
</script>

<template>
  <div class="bcc-range">
    <div class="bcc-range__container">
      <div class="bcc-range__value" :class="valueColor" :style="{ left: valuePosition }">
        {{ value }}
      </div>
      <input
        type="range"
        class="bcc-range__input"
        :min="min"
        :max="max"
        :step="step"
        :value="value"
        :disabled="disabled"
        @input="handleInput"
      />
    </div>
  </div>
</template>
