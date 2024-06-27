<script setup lang="ts">
import { computed } from "vue";

type Props = {
  currentStep: number;
  steps: string[];
  additionalText: boolean;
  showStepLabel?: boolean;
  headingOverride?: string;
};

const props = withDefaults(defineProps<Props>(), {
  currentStep: 0,
  steps: () => [""],
  additionalText: true,
  showStepLabel: true,
});

const currentStepInfo = computed(() => {
  return {
    current: props.currentStep + 1,
    total: props.steps.length,
    label: props.steps[props.currentStep],
  };
});

const headerText = computed(() => {
  if (props.headingOverride) {
    return props.headingOverride;
  }
  return `Step ${currentStepInfo.value.current} of ${currentStepInfo.value.total}`;
});
</script>

<template>
  <div class="bcc-stepper-container">
    <div class="bcc-stepper-header" v-if="props.additionalText">
      <span class="bcc-stepper-current-step">{{ headerText }}</span>
      <span class="bcc-stepper-current-label" v-if="showStepLabel">{{
        currentStepInfo.label
      }}</span>
    </div>
    <div class="bcc-stepper-indicators">
      <div
        v-for="(_step, index) in props.steps"
        :key="index"
        class="bcc-stepper-indicator-container"
      >
        <div
          class="bcc-stepper-indicator"
          :class="{
            'bcc-stepper-indicator-active': index === props.currentStep,
            'bcc-stepper-indicator-inactive': index !== props.currentStep,
            'bcc-stepper-indicator-completed': index <= props.currentStep,
            'bcc-stepper-indicator-pending': index > props.currentStep,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>
