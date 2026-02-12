import type { Meta, StoryObj } from '@storybook/vue3';
import { BccMessage } from '../../index';

const meta = {
	component: BccMessage,
	title: 'PrimeVue/BccMessage',
	argTypes: {
		severity: {
			control: 'select',
			options: ['success', 'info', 'warn', 'error', 'secondary', 'contrast'],
		},
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
	args: { severity: 'info' },
	render: args => ({
		components: { BccMessage },
		setup() {
			return { args };
		},
		template: `
			<BccMessage v-bind="args">Info message content.</BccMessage>
		`,
	}),
};

export const Success: Story = {
	args: { severity: 'success' },
	render: args => ({
		components: { BccMessage },
		setup() {
			return { args };
		},
		template: `
			<BccMessage v-bind="args">Operation completed successfully.</BccMessage>
		`,
	}),
};

export const Warn: Story = {
	args: { severity: 'warn' },
	render: args => ({
		components: { BccMessage },
		setup() {
			return { args };
		},
		template: `
			<BccMessage v-bind="args">Please review before continuing.</BccMessage>
		`,
	}),
};

export const Error: Story = {
	args: { severity: 'error' },
	render: args => ({
		components: { BccMessage },
		setup() {
			return { args };
		},
		template: `
			<BccMessage v-bind="args">Something went wrong.</BccMessage>
		`,
	}),
};
