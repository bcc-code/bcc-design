<script setup lang="ts">
import { computed } from "vue";
import BccFormLabel from "@/components/BccFormLabel/BccFormLabel.vue";

type Props = {
  value?: number;
  max?: number;
  size?: "base" | "lg";
  showValues?: boolean;
  showPercentage?: boolean;
  overflow?: boolean;
  color?: string;
};

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 100,
  size: "base",
  showValues: true,
  showPercentage: true,
  overflow: true,
  color: undefined,
});

const percentage = computed(() => {
  if (props.value > props.max && !props.overflow) return 100;
  return (props.value / props.max) * 100;
});

const percentageSafe = computed(() => {
  if (props.value > props.max) return 100;
  return percentage.value;
});
</script>

<template>
  <div class="bcc-progress-container">
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

    <div class="bcc-progress">
      <div
        class="bcc-progress-bar"
        :class="{ [color]: color }"
        :style="{
          width: percentageSafe + '%',
        }"
      />
    </div>
  </div>
</template>
