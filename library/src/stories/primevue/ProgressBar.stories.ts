import type { Meta, StoryObj } from '@storybook/vue3';
import { PVProgressBar } from '../../index';

const meta = {
	component: PVProgressBar,
	title: 'PrimeVue/ProgressBar',
	tags: ['autodocs'],
	argTypes: {
		value: { control: { type: 'number', min: 0, max: 100 } },
		showValue: { control: 'boolean' },
		indeterminate: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { value: 50, showValue: true },
	render: args => ({
		components: { PVProgressBar },
		setup() {
			return { args };
		},
		template: `
			<PVProgressBar v-bind="args" />
		`,
	}),
};

export const Indeterminate: Story = {
	args: { indeterminate: true },
	render: args => ({
		components: { PVProgressBar },
		setup() {
			return { args };
		},
		template: `
			<PVProgressBar v-bind="args" />
		`,
	}),
};

export const NoValue: Story = {
	args: { value: 75, showValue: false },
	render: args => ({
		components: { PVProgressBar },
		setup() {
			return { args };
		},
		template: `
			<PVProgressBar v-bind="args" />
		`,
	}),
};
