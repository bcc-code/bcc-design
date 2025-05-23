<script setup lang="ts">
import useAnimatedNumber from "@/composables/animatedNumber";
import { computed, toRef } from "vue";

const props = withDefaults(
  defineProps<{
    // -1 = Infinity
    total: number;
    used?: number;
    size?: "xs" | "sm" | "base" | "lg";
    animationDuration?: number;
    squared?: boolean;
    context?: "default" | "colored";
  }>(),
  {
    used: 0,
    size: "base",
    animationDuration: 1000,
    squared: false,
    context: "default",
  }
);

const { value: valueUsed } = useAnimatedNumber(
  toRef(props, "used"),
  props.used,
  props.animationDuration
);

const percentage = computed(() => {
  if (props.total === -1) return -1;
  if (props.used > props.total || props.used === props.total) return 100;
  if (props.total > 0) return (props.used / props.total) * 100;
  return 0;
});

const { value: progress } = useAnimatedNumber(
  percentage,
  percentage.value,
  props.animationDuration
);

const dashArray = Math.PI * 18 * 2;
</script>

<template>
  <svg
    width="2em"
    height="2em"
    viewBox="0 0 40 40"
    class="bcc-capacity-indicator"
    :class="[
      size,
      squared ? 'rounded' : 'rounded-full',
      { 'bcc-capacity-indicator-full': progress >= 100 },
      context === 'default'
        ? {
            'bcc-capacity-indicator-open': total == -1 || (progress >= 0 && progress < 50),
            'bcc-capacity-indicator-warning': progress >= 50 && progress < 100,
          }
        : 'bcc-capacity-indicator-colored',
    ]"
  >
    <template v-if="squared">
      <rect
        width="36"
        height="36"
        x="2"
        y="2"
        rx="4"
        fill="none"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        v-if="progress > 0"
        d="M 20 2 h 14 a 4 4 0 0 1 4 4 v 28 a 4 4 0 0 1 -4 4 h -28 a 4 4 0 0 1 -4 -4 v -28 a 4 4 0 0 1 4 -4 h 14 z"
        fill="none"
        stroke-width="4"
        :stroke-dasharray="137"
        :stroke-dashoffset="137 * ((100 - progress) / 100)"
        stroke="currentColor"
        class="bcc-capacity-indicator-circle-used"
      />
    </template>
    <template v-else>
      <circle cx="20" cy="20" r="18" fill="none" stroke-width="3" stroke="currentColor" />
      <circle
        v-if="progress > 0"
        cx="20"
        cy="20"
        r="18"
        fill="none"
        stroke-width="3"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashArray * ((100 - progress) / 100)"
        stroke="currentColor"
        transform="rotate(-90 20 20)"
        class="bcc-capacity-indicator-circle-used"
      />
    </template>
    <text
      v-if="progress > -1"
      text-anchor="middle"
      x="20"
      :y="squared || size == 'xs' ? 26 : 25"
      :font-size="squared || size == 'xs' ? 16 : 14"
      font-weight="600"
      fill="currentColor"
      class="bcc-capacity-indicator-text"
    >
      {{ progress < 100 ? total - valueUsed : 0 }}
    </text>
    <path
      v-else
      d="M14.4122 25.1588C13.1109 25.1588 12.017 24.6844 11.1305 23.7354C10.244 22.7864 9.80078 21.6525 9.80078 20.3337C9.80078 19.0287 10.2475 17.9121 11.1409 16.984C12.0343 16.0559 13.1247 15.5918 14.4122 15.5918C14.9358 15.5918 15.4424 15.679 15.9319 15.8533C16.4214 16.0277 16.8557 16.2965 17.2347 16.6597L19.0662 18.417L17.885 19.5628L16.1877 17.9045C15.9538 17.6704 15.6828 17.5015 15.3745 17.3978C15.0663 17.294 14.7475 17.2422 14.4182 17.2422C13.5803 17.2422 12.8763 17.5449 12.3063 18.1504C11.7362 18.756 11.4512 19.4851 11.4512 20.3379C11.4512 21.2047 11.7327 21.9497 12.2957 22.5732C12.8587 23.1967 13.566 23.5085 14.4176 23.5085C14.7413 23.5085 15.0554 23.4567 15.3599 23.3532C15.6644 23.2497 15.9391 23.088 16.1839 22.8681L22.7673 16.6597C23.1462 16.2965 23.5805 16.0277 24.07 15.8533C24.5596 15.679 25.0592 15.5918 25.5689 15.5918C26.8702 15.5918 27.9676 16.0559 28.861 16.984C29.7544 17.9121 30.2012 19.0287 30.2012 20.3337C30.2012 21.6525 29.7544 22.7864 28.861 23.7354C27.9676 24.6844 26.8702 25.1588 25.5689 25.1588C25.0592 25.1588 24.5561 25.0751 24.0596 24.9077C23.5631 24.7403 23.1324 24.475 22.7673 24.1117L20.9892 22.3545L22.1586 21.2087L23.8177 22.8681C24.0383 23.0885 24.3035 23.2503 24.6133 23.3536C24.9231 23.4568 25.2398 23.5085 25.5635 23.5085C26.4151 23.5085 27.1259 23.1961 27.6958 22.5714C28.2658 21.9467 28.5508 21.2021 28.5508 20.3377C28.5508 19.4872 28.2623 18.7586 27.6854 18.152C27.1085 17.5455 26.4012 17.2422 25.5635 17.2422C25.2398 17.2422 24.9257 17.3009 24.6212 17.4183C24.3167 17.5357 24.0489 17.7043 23.818 17.9242L17.2347 24.1326C16.8557 24.4819 16.418 24.7403 15.9215 24.9077C15.425 25.0751 14.9219 25.1588 14.4122 25.1588Z"
      fill="currentColor"
      class="bcc-capacity-indicator-text"
    />
  </svg>
</template>
