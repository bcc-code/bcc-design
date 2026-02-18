import type { Meta } from '@storybook/vue3';
import { ref } from 'vue';
import BccInput from '../../wrapped/BccInput.vue';
import BccDialKnob from './BccDialKnob.vue';

const meta: Meta<typeof BccDialKnob> = {
	component: BccDialKnob,
	title: 'Feedback/BccDialKnob',
	argTypes: {
		min: {
			control: { type: 'number' },
			description: 'Minimum value (minutes)',
		},
		max: {
			control: { type: 'number' },
			description: 'Maximum value (minutes)',
		},
		size: { control: { type: 'number' } },
		arcWidth: { control: { type: 'number' } },
		steps: { control: { type: 'number' } },
		colored: { control: 'boolean' },
		showHandle: { control: 'boolean' },
		hideArrows: { control: 'boolean' },
		duration: { control: { type: 'number' } },
		animateRotations: { control: { type: 'number' } },
	},
};

export default meta;

export const Default = {
	args: {
		min: -720,
		max: 720,
	},
	render: (args: Record<string, unknown>) => ({
		components: { BccDialKnob, BccInput },
		setup() {
			const value = ref(0);
			return { args, value };
		},
		template: `
			<div class="relative flex flex-col w-80 justify-center items-center gap-4">
				<BccDialKnob v-bind="args" v-model="value">
					<template #left>
						<div class="opacity-40 p-4">Less</div>
					</template>
					<template #right>
						<div class="opacity-40 p-4">More</div>
					</template>
					<pre>{{ value }}</pre>
				</BccDialKnob>
				<BccInput v-model="value" label="Minutes" type="number" />
			</div>
		`,
	}),
};

export const Colored = {
	args: {
		colored: true,
		showHandle: true,
	},
	render: (args: Record<string, unknown>) => ({
		components: { BccDialKnob, BccInput },
		setup() {
			const value = ref(0);
			return { args, value };
		},
		template: `
			<div class="relative flex flex-col w-80 justify-center items-center gap-4">
				<BccDialKnob v-bind="args" v-model="value">
					<template #left>
						<div class="opacity-40 p-4">Less</div>
					</template>
					<template #right>
						<div class="opacity-40 p-4">More</div>
					</template>
					<pre>{{ value }}</pre>
				</BccDialKnob>
				<BccInput v-model="value" label="Minutes" type="number" />
			</div>
		`,
	}),
};

export const CssVariables = {
	render: () => ({
		components: { BccDialKnob },
		setup() {
			const value = ref(0);
			return { value };
		},
		template: `
			<div>
				<p class="mb-4 text-sm text-gray-600">Available CSS variables:</p>
				<pre class="mb-4 rounded bg-gray-100 p-4 text-xs">
--bcc-knob-arc-bg: #D1D5DB;
--bcc-knob-head: #437571;
--bcc-knob-tail: #A9BABA;
--bcc-knob-left-head: #9B4F44;
--bcc-knob-left-tail: #DBBEAC;
--bcc-knob-right-head: #3E8E75;
--bcc-knob-right-tail: #B1DECC;
				</pre>
				<div class="w-80 p-8">
					<BccDialKnob v-model="value" colored show-handle />
				</div>
			</div>
		`,
	}),
};
