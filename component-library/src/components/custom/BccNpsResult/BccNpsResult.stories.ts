import type { Meta, StoryObj } from '@storybook/vue3-vite';
import BccNpsResult from './BccNpsResult.vue';

const meta: Meta<typeof BccNpsResult> = {
	component: BccNpsResult,
	title: 'Feedback/BccNpsResult',
	argTypes: {
		score: { control: { type: 'number' }, description: 'NPS score (-100 to 100)' },
		size: {
			control: { type: 'radio' },
			options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
			description: 'Size of the gauge',
		},
		display: { control: 'text', description: 'Custom text to show instead of score' },
		underline: { control: 'text', description: 'Label below the score' },
		hideText: { control: 'boolean' },
		animated: { control: 'boolean' },
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		score: 30,
		underline: 'NPS Score',
	},
	render: args => ({
		components: { BccNpsResult },
		setup() {
			return { args };
		},
		template: `<BccNpsResult v-bind="args" />`,
	}),
};

export const Sizes: Story = {
	render: () => ({
		components: { BccNpsResult },
		template: `
			<div class="flex justify-between items-center gap-4">
				<BccNpsResult size="xs" underline="Xs" :score="100" />
				<BccNpsResult size="sm" underline="Sm" :score="100" />
				<BccNpsResult size="md" underline="Md" :score="100" />
				<BccNpsResult size="lg" underline="Lg" :score="100" />
			</div>
		`,
	}),
};

export const WithCustomText: Story = {
	args: {
		score: 30,
		underline: 'The score is good',
		display: 'Good!',
	},
	render: args => ({
		components: { BccNpsResult },
		setup() {
			return { args };
		},
		template: `<BccNpsResult v-bind="args" />`,
	}),
};
