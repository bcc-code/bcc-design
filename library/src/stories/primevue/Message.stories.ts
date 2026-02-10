import type { Meta, StoryObj } from '@storybook/vue3';
import { PVMessage } from '../../index';

const meta = {
	component: PVMessage,
	title: 'PrimeVue/Message',
	tags: ['autodocs'],
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
		components: { PVMessage },
		setup() {
			return { args };
		},
		template: `
			<PVMessage v-bind="args">Info message content.</PVMessage>
		`,
	}),
};

export const Success: Story = {
	args: { severity: 'success' },
	render: args => ({
		components: { PVMessage },
		setup() {
			return { args };
		},
		template: `
			<PVMessage v-bind="args">Operation completed successfully.</PVMessage>
		`,
	}),
};

export const Warn: Story = {
	args: { severity: 'warn' },
	render: args => ({
		components: { PVMessage },
		setup() {
			return { args };
		},
		template: `
			<PVMessage v-bind="args">Please review before continuing.</PVMessage>
		`,
	}),
};

export const Error: Story = {
	args: { severity: 'error' },
	render: args => ({
		components: { PVMessage },
		setup() {
			return { args };
		},
		template: `
			<PVMessage v-bind="args">Something went wrong.</PVMessage>
		`,
	}),
};
