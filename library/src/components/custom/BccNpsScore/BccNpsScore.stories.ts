import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import BccNpsScore from './BccNpsScore.vue';

const meta: Meta<typeof BccNpsScore> = {
	component: BccNpsScore,
	title: 'Feedback/BccNpsScore',
	tags: ['autodocs'],
	argTypes: {
		reverse: { control: 'boolean', description: 'Reverse the bar direction' },
		labelPosition: {
			control: { type: 'radio' },
			options: ['top', 'bottom'],
			description: 'Where to place the labels',
		},
		leftLabel: { control: 'text' },
		rightLabel: { control: 'text' },
		min: { control: { type: 'number' } },
		max: { control: { type: 'number' } },
		disabled: { control: 'boolean' },
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
	render: args => ({
		components: { BccNpsScore },
		setup() {
			const value = ref<number | null>(null);
			return { args, value };
		},
		template: `<BccNpsScore v-bind="args" v-model="value" style="width: 320px" />`,
	}),
};

export const LongRange: Story = {
	args: {
		max: 30,
		labelPosition: 'bottom',
	},
	render: args => ({
		components: { BccNpsScore },
		setup() {
			const value = ref<number | null>(null);
			return { args, value };
		},
		template: `<BccNpsScore v-bind="args" v-model="value" style="width: 992px" />`,
	}),
};

export const WithInitialValue: Story = {
	args: { max: 10 },
	render: args => ({
		components: { BccNpsScore },
		setup() {
			const value = ref(5);
			return { args, value };
		},
		template: `<BccNpsScore v-bind="args" v-model="value" style="width: 320px" />`,
	}),
};

export const Disabled: Story = {
	args: {
		max: 10,
		disabled: true,
	},
	render: args => ({
		components: { BccNpsScore },
		setup() {
			const value = ref(5);
			return { args, value };
		},
		template: `<BccNpsScore v-bind="args" v-model="value" style="width: 320px" />`,
	}),
};
