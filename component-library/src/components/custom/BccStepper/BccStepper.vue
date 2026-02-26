<script setup lang="ts">
import { computed } from 'vue';

export type StepperProps = {
	currentStep: number;
	steps: string[];
	additionalText?: boolean;
	showStepLabel?: boolean;
	headingFn?: (currentStep: number, totalSteps: number) => string;
};

const props = withDefaults(defineProps<StepperProps>(), {
	currentStep: 0,
	steps: () => [''],
	additionalText: true,
	showStepLabel: true,
	headingFn: (currentStep, totalSteps) => `Step ${currentStep} of ${totalSteps}`,
});

const state = computed(() => ({
	current: props.currentStep + 1,
	total: props.steps.length,
	label: props.steps[props.currentStep] ?? '',
}));
</script>

<template>
	<div class="bcc-stepper-container">
		<div v-if="props.additionalText" class="bcc-stepper-header">
			<span class="bcc-stepper-current-step">{{ props.headingFn(state.current, state.total) }}</span>
			<span v-if="props.showStepLabel" class="bcc-stepper-current-label">{{ state.label }}</span>
		</div>
		<div class="bcc-stepper-indicators">
			<div v-for="(_step, index) in props.steps" :key="index" class="bcc-stepper-indicator-container">
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
