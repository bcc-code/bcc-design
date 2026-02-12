<script setup lang="ts">
import { computed } from "vue";

type Props = {
  currentStep: number;
  steps: string[];
  additionalText: boolean;
  showStepLabel?: boolean;
  headingFn?: (currentStep: number, totalSteps: number) => {};
};

const props = withDefaults(defineProps<Props>(), {
  currentStep: 0,
  steps: () => [""],
  additionalText: true,
  showStepLabel: true,
  headingFn: (currentStep, totalSteps) => {
    return `Step ${currentStep} of ${totalSteps}`;
  },
});

const state = computed(() => {
  return {
    current: props.currentStep + 1,
    total: props.steps.length,
    label: props.steps[props.currentStep],
  };
});
</script>

<template>
  <div class="bcc-stepper-container">
    <div class="bcc-stepper-header" v-if="props.additionalText">
      <span class="bcc-stepper-current-step">{{ headingFn(state.current, state.total) }}</span>
      <span class="bcc-stepper-current-label" v-if="showStepLabel">{{ state.label }}</span>
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
