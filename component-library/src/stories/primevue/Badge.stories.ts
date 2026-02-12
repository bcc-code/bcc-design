import type { Meta, StoryObj } from '@storybook/vue3';
import { BccBadge } from '../../index';

const meta = {
	component: BccBadge,
	title: 'PrimeVue/BccBadge',
	argTypes: {
		value: { control: 'text' },
		severity: {
			control: 'select',
			options: ['success', 'secondary', 'info', 'warn', 'danger', 'contrast'],
		},
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { value: '5' },
	render: args => ({
		components: { BccBadge },
		setup() {
			return { args };
		},
		template: `
			<BccBadge v-bind="args" />
		`,
	}),
};

export const Severities: Story = {
	render: () => ({
		components: { BccBadge },
		template: `
			<div class="flex flex-wrap gap-2 align-items-center">
				<BccBadge value="Success" severity="success" />
				<BccBadge value="Info" severity="info" />
				<BccBadge value="Warn" severity="warn" />
				<BccBadge value="Danger" severity="danger" />
				<BccBadge value="Secondary" severity="secondary" />
			</div>
		`,
	}),
};

export const OnButton: Story = {
	render: () => ({
		components: { BccBadge },
		template: `
			<button class="p-button p-button-primary p-button-outlined relative">
				Notifications
				<BccBadge value="3" class="absolute -top-1 -right-1" />
			</button>
		`,
	}),
};
