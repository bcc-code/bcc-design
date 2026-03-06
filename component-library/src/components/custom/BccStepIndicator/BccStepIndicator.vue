<script setup lang="ts">
import { BCC_CONTEXTS, type BCC_CONTEXT } from '@/contexts';
import { computed } from 'vue';

export type StepIndicatorProps = {
	steps: string[];
	hideText?: boolean;
	hideLabel?: boolean;
	left?: boolean;
	right?: boolean;
	context?: BCC_CONTEXT;
	headingFn?: (currentStep: number, totalSteps: number) => string;
	clickable?: boolean;
};

const props = withDefaults(defineProps<StepIndicatorProps>(), {
	hideText: false,
	hideLabel: true,
	context: BCC_CONTEXTS.brand.bolder,
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
	<div class="bcc-step-indicator col gap-2" :class="[{ left, right }, `ctx-${context}`]">
		<div v-if="!props.hideText" class="flex gap-2">
			<span class="text-heading-sm text-default">{{ props.headingFn(state.current, state.total) }}</span>
			<span v-if="!props.hideLabel" class="text-body-sm text-text-subtlest">{{ state.label }}</span>
		</div>
		<div class="center gap-2">
			<div
				v-for="(_step, index) in props.steps"
				:key="index"
				class="bg-ctx h-1.5 rounded-lg duration-300"
				:class="[
					index === currentStep ? 'w-6' : 'w-1.5',
					{
						clickable,
						'ctx-gray-subtle': index > currentStep,
					},
				]"
				@click="clickable ? (currentStep = index) : null"
			>
			</div>
		</div>
	</div>
</template>
