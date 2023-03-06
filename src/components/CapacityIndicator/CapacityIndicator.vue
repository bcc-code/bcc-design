<script setup lang="ts">
import { AllInclusiveIcon } from "@bcc-code/icons-vue";
import { ref } from "vue";

type Props = {
  capacity?: number;
  left?: number;
  size?: number;
};

const props = withDefaults(defineProps<Props>(), {
  capacity: Infinity,
  left: 0,
  size: 40,
});

const progress = ref(
  props.capacity === Infinity ? 100 : ((props.capacity - props.left) / props.capacity) * 100
);
const trackWidth = 2;

const center = props.size / 2;
const radius = center - trackWidth;
const dashArray = 2 * Math.PI * radius;
const dashOffset = dashArray * ((100 - progress.value) / 100);
</script>

<template>
  <div class="relative inline-block">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <span v-if="capacity === Infinity">
        <AllInclusiveIcon class="h-4 w-4 text-neutral-900" />
      </span>
      <span
        v-else
        class="text-sm font-bold"
        :class="{
          'text-neutral-900': progress < 50,
          'text-muddy-waters-600': progress >= 50 && progress < 100,
          'text-red-900': progress >= 100,
        }"
      >
        {{ left }}
      </span>
    </div>

    <svg class="-rotate-90" :style="{ width: size, height: size }">
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        :stroke-width="trackWidth"
        fill="transparent"
        :class="{
          'stroke-neutral-200': capacity === Infinity,
          'stroke-neutral-300': capacity !== Infinity && progress < 50,
          'stroke-muddy-waters-100': capacity !== Infinity && progress >= 50,
        }"
      />
      <circle
        v-if="capacity !== Infinity"
        :cx="center"
        :cy="center"
        :r="radius"
        :stroke-width="trackWidth"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
        fill="transparent"
        :class="{
          'stroke-neutral-500': progress < 50,
          'stroke-muddy-waters-500': progress >= 50 && progress < 100,
          'stroke-red-900': progress >= 100,
        }"
      />
    </svg>
  </div>
</template>
