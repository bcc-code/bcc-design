<script setup lang="ts">
import { BCC_CONTEXTS, type BCC_CONTEXT } from '@/contexts';
import { computed } from 'vue';

export type StepIndicatorProps = {
	steps: string[];
	additionalText?: boolean;
	showStepLabel?: boolean;
	left?: boolean;
	right?: boolean;
	context?: BCC_CONTEXT;
	headingFn?: (currentStep: number, totalSteps: number) => string;
};

const props = withDefaults(defineProps<StepIndicatorProps>(), {
	additionalText: true,
	showStepLabel: true,
	context: BCC_CONTEXTS.brand.bold,
	headingFn: (currentStep, totalSteps) => `Step ${currentStep} of ${totalSteps}`,
});

const currentStep = defineModel<number>({ default: 0, required: false });

const state = computed(() => ({
	current: currentStep.value + 1,
	total: props.steps.length,
	label: props.steps[currentStep.value] ?? '',
}));
</script>

<template>
	<div class="col gap-2" :class="[{ left, right }, `ctx-${context}`]">
		<div v-if="props.additionalText" class="flex gap-2">
			<span class="text-heading-sm text-default">{{ props.headingFn(state.current, state.total) }}</span>
			<span v-if="props.showStepLabel" class="text-body-sm text-text-subtlest">{{ state.label }}</span>
		</div>
		<div class="center gap-2">
			<div
				v-for="(_step, index) in props.steps"
				:key="index"
				class="bcc-stepper-indicator"
				:class="[
					index === currentStep ? 'w-6' : 'w-1.5',
					{
						'bg-ctx': index <= currentStep,
						'bg-alpha-subtle-default': index > currentStep,
					},
				]"
			>
			</div>
		</div>
	</div>
</template>
