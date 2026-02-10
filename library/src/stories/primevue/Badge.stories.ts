import type { Meta, StoryObj } from '@storybook/vue3';
import { PVBadge } from '../../index';

const meta = {
	component: PVBadge,
	title: 'PrimeVue/Badge',
	tags: ['autodocs'],
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
		components: { PVBadge },
		setup() {
			return { args };
		},
		template: `
			<PVBadge v-bind="args" />
		`,
	}),
};

export const Severities: Story = {
	render: () => ({
		components: { PVBadge },
		template: `
			<div class="flex flex-wrap gap-2 align-items-center">
				<PVBadge value="Success" severity="success" />
				<PVBadge value="Info" severity="info" />
				<PVBadge value="Warn" severity="warn" />
				<PVBadge value="Danger" severity="danger" />
				<PVBadge value="Secondary" severity="secondary" />
			</div>
		`,
	}),
};

export const OnButton: Story = {
	render: () => ({
		components: { PVBadge },
		template: `
			<button class="p-button p-button-primary p-button-outlined relative">
				Notifications
				<PVBadge value="3" class="absolute -top-1 -right-1" />
			</button>
		`,
	}),
};
