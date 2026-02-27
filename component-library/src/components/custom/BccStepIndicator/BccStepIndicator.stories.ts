import type { Meta, StoryObj } from '@storybook/vue3';
import BccStepIndicator from './BccStepIndicator.vue';

const meta: Meta<typeof BccStepIndicator> = {
	component: BccStepIndicator,
	title: 'Custom/BccStepIndicator',
	argTypes: {
		modelValue: {
			control: { type: 'number' },
			description: 'The current active step, zero-based index.',
		},
		steps: {
			control: { type: 'object' },
			description: 'An array of step labels.',
		},
		additionalText: {
			control: { type: 'boolean' },
			description: 'Whether to show the step number and title alongside the indicators.',
		},
		showStepLabel: {
			control: { type: 'boolean' },
			description: 'Whether to show the step label.',
		},
		headingFn: {
			description: "Function for formatting the 'Step 1 of 2' string, e.g. with a translated string.",
		},
		clickable: {
			control: { type: 'boolean' },
			description: 'Whether the indicators are clickable.',
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

const exampleSteps = [
	'First page name',
	'Second page name',
	'Third page name',
	'Fourth page name',
	'Fifth page name',
	'Sixth page name',
	'Seventh page name',
	'Eighth page name',
	'Ninth page name',
	'Tenth page name',
];

export const Default: Story = {
	args: {
		modelValue: 0,
		steps: exampleSteps,
		additionalText: true,
		showStepLabel: true,
	},
};

export const SecondStep: Story = {
	args: {
		modelValue: 1,
		steps: exampleSteps,
		additionalText: true,
		showStepLabel: true,
	},
};

export const IndicatorsOnly: Story = {
	args: {
		modelValue: 2,
		steps: exampleSteps,
		additionalText: false,
		showStepLabel: false,
	},
};

export const WithoutStepLabel: Story = {
	args: {
		modelValue: 0,
		steps: exampleSteps,
		additionalText: true,
		showStepLabel: false,
	},
};

export const CustomLabels: Story = {
	args: {
		modelValue: 0,
		steps: exampleSteps,
		additionalText: true,
		showStepLabel: false,
	},
	render: args => ({
		components: { BccStepIndicator },
		setup() {
			function dutchFn(modelValue: number, totalSteps: number) {
				return `Vraag ${modelValue} van de ${totalSteps}`;
			}
			function englishFn(modelValue: number, totalSteps: number) {
				return `Question ${modelValue} of ${totalSteps}`;
			}
			function norwegianFn(modelValue: number, totalSteps: number) {
				return `Spørsmål ${modelValue} av ${totalSteps}`;
			}
			return { args, dutchFn, englishFn, norwegianFn };
		},
		template: `
			<div class="flex flex-col gap-4">
				<BccStepIndicator v-bind="args" :heading-fn="norwegianFn" />
				<BccStepIndicator v-bind="args" :heading-fn="englishFn" />
				<BccStepIndicator v-bind="args" :heading-fn="dutchFn" />
			</div>
		`,
	}),
};
