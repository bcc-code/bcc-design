<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  angle: {
    type: Number,
    required: true,
  },
  rotations: {
    type: Number,
    required: true,
  },
  normalizedAngle: {
    type: Object,
    required: true,
  },
  startAngle: {
    type: Number,
    required: true,
  },
  isAntiClockwise: {
    type: Boolean,
    required: true,
  },
  primaryColor: {
    type: String,
    default: "#2196f3",
  },
  secondaryColor: {
    type: String,
    default: "#03a9f4",
  },
  trackColor: {
    type: String,
    default: "#e0e0e0",
  },
  trackWidth: {
    type: Number,
    default: 2,
  },
  strokeWidth: {
    type: Number,
    default: 4,
  },
});

const circumference = 2 * Math.PI * 45; // 45 is the radius
const progressLength = computed(() => {
  const angleDiff = Math.abs(props.normalizedAngle.current - props.normalizedAngle.start);
  return (angleDiff / (2 * Math.PI)) * circumference;
});
</script>

<template>
  <svg class="bcc-knob-svg" viewBox="0 0 100 100">
    <defs>
      <!-- Clockwise gradient -->
      <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" :style="{ 'stop-color': primaryColor, 'stop-opacity': 1 }" />
        <stop offset="80%" :style="{ 'stop-color': secondaryColor, 'stop-opacity': 0.6 }" />
        <stop offset="80%" :style="{ 'stop-color': primaryColor, 'stop-opacity': 1 }" />
        <stop offset="100%" :style="{ 'stop-color': primaryColor, 'stop-opacity': 1 }" />
      </linearGradient>

      <!-- Anti-clockwise gradient -->
      <linearGradient id="progress-gradient-reverse" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" :style="{ 'stop-color': primaryColor, 'stop-opacity': 1 }" />
        <stop offset="80%" :style="{ 'stop-color': secondaryColor, 'stop-opacity': 0.6 }" />
        <stop offset="80%" :style="{ 'stop-color': primaryColor, 'stop-opacity': 1 }" />
        <stop offset="100%" :style="{ 'stop-color': primaryColor, 'stop-opacity': 1 }" />
      </linearGradient>
    </defs>

    <!-- Background circle -->
    <circle
      class="bcc-knob-track"
      cx="50"
      cy="50"
      r="45"
      fill="none"
      :stroke="trackColor"
      :stroke-width="trackWidth"
    />

    <!-- Completed rotations -->
    <circle
      v-if="rotations > 0"
      class="bcc-knob-complete"
      cx="50"
      cy="50"
      r="45"
      fill="none"
      :stroke="primaryColor"
      :stroke-width="strokeWidth"
    />

    <!-- Current rotation progress -->
    <circle
      class="bcc-knob-progress"
      cx="50"
      cy="50"
      r="45"
      fill="none"
      :stroke-width="strokeWidth"
      :stroke-dasharray="`${progressLength}, ${circumference}`"
      :style="{
        stroke: `url(#${isAntiClockwise ? 'progress-gradient-reverse' : 'progress-gradient'})`,
        'stroke-dashoffset': isAntiClockwise ? progressOffset : 0,
      }"
      transform="rotate(-90, 50, 50)"
    />
  </svg>
</template>

<style scoped>
.bcc-knob-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bcc-knob-complete {
  filter: drop-shadow(0 0 2px rgba(33, 150, 243, 0.5));
}

.bcc-knob-progress {
  transform-origin: center;
  transition: stroke-dasharray 0.1s ease;
  filter: drop-shadow(0 0 3px rgba(33, 150, 243, 0.7));
}
</style>
