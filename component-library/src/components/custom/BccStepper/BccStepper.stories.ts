import type { Meta, StoryObj } from '@storybook/vue3';
import BccStepper from './BccStepper.vue';

const meta: Meta<typeof BccStepper> = {
	component: BccStepper,
	title: 'Custom/BccStepper',
	argTypes: {
		currentStep: {
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
			description:
				"Function for formatting the 'Step 1 of 2' string, e.g. with a translated string.",
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
		currentStep: 0,
		steps: exampleSteps,
		additionalText: true,
		showStepLabel: true,
	},
};

export const SecondStep: Story = {
	args: {
		currentStep: 1,
		steps: exampleSteps,
		additionalText: true,
		showStepLabel: true,
	},
};

export const IndicatorsOnly: Story = {
	args: {
		currentStep: 2,
		steps: exampleSteps,
		additionalText: false,
		showStepLabel: false,
	},
};

export const WithoutStepLabel: Story = {
	args: {
		currentStep: 0,
		steps: exampleSteps,
		additionalText: true,
		showStepLabel: false,
	},
};

export const CustomLabels: Story = {
	args: {
		currentStep: 0,
		steps: exampleSteps,
		additionalText: true,
		showStepLabel: false,
	},
	render: args => ({
		components: { BccStepper },
		setup() {
			function dutchFn(currentStep: number, totalSteps: number) {
				return `Vraag ${currentStep} van de ${totalSteps}`;
			}
			function englishFn(currentStep: number, totalSteps: number) {
				return `Question ${currentStep} of ${totalSteps}`;
			}
			function norwegianFn(currentStep: number, totalSteps: number) {
				return `Spørsmål ${currentStep} av ${totalSteps}`;
			}
			return { args, dutchFn, englishFn, norwegianFn };
		},
		template: `
			<div class="flex flex-col gap-4">
				<BccStepper v-bind="args" :heading-fn="norwegianFn" />
				<BccStepper v-bind="args" :heading-fn="englishFn" />
				<BccStepper v-bind="args" :heading-fn="dutchFn" />
			</div>
		`,
	}),
};
