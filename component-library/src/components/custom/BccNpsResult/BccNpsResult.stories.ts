import type { Meta, StoryObj } from '@storybook/vue3';
import BccNpsResult from './BccNpsResult.vue';

const meta: Meta<typeof BccNpsResult> = {
	component: BccNpsResult,
	title: 'Feedback/BccNpsResult',
	argTypes: {
		score: { control: { type: 'number' }, description: 'NPS score (-100 to 100)' },
		size: {
			control: { type: 'radio' },
			options: ['lg', 'md', 'sm', 'xs'],
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
		template: `<BccNpsResult v-bind="args" style="width: 180px" />`,
	}),
};

export const Sizes: Story = {
	render: () => ({
		components: { BccNpsResult },
		template: `
			<div class="flex justify-between items-center gap-4">
				<BccNpsResult style="width: 40px" size="xs" underline="Xs" :score="100" />
				<BccNpsResult style="width: 110px" size="sm" underline="Sm" :score="100" />
				<BccNpsResult style="width: 180px" size="md" underline="Md" :score="100" />
				<BccNpsResult style="width: 250px" size="lg" underline="Lg" :score="100" />
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
		template: `<BccNpsResult v-bind="args" style="width: 180px" />`,
	}),
};
