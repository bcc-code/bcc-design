import type { Meta, StoryObj } from '@storybook/vue3';
import { BccOverlayBadge } from '../../index';

const meta = {
	component: BccOverlayBadge,
	title: 'PrimeVue/BccOverlayBadge',
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
		components: { BccOverlayBadge },
		setup() {
			return { args };
		},
		template: `
			<BccOverlayBadge v-bind="args">
				<i class="pi pi-bell" style="font-size: 2rem" />
			</BccOverlayBadge>
		`,
	}),
};

export const Severities: Story = {
	render: () => ({
		components: { BccOverlayBadge },
		template: `
			<div class="flex flex-wrap gap-4 align-items-center">
				<BccOverlayBadge value="2" severity="success">
					<i class="pi pi-check" style="font-size: 2rem" />
				</BccOverlayBadge>
				<BccOverlayBadge value="3" severity="info">
					<i class="pi pi-info-circle" style="font-size: 2rem" />
				</BccOverlayBadge>
				<BccOverlayBadge value="1" severity="warn">
					<i class="pi pi-exclamation-triangle" style="font-size: 2rem" />
				</BccOverlayBadge>
				<BccOverlayBadge value="4" severity="danger">
					<i class="pi pi-times" style="font-size: 2rem" />
				</BccOverlayBadge>
				<BccOverlayBadge value="9" severity="secondary">
					<i class="pi pi-envelope" style="font-size: 2rem" />
				</BccOverlayBadge>
			</div>
		`,
	}),
};

export const OnButton: Story = {
	args: { value: '3' },
	render: args => ({
		components: { BccOverlayBadge },
		setup() {
			return { args };
		},
		template: `
			<BccOverlayBadge v-bind="args">
				<button class="p-button p-button-primary p-button-outlined">
					Notifications
				</button>
			</BccOverlayBadge>
		`,
	}),
};

export const OnAvatar: Story = {
	args: { value: '1', severity: 'danger' },
	render: args => ({
		components: { BccOverlayBadge },
		setup() {
			return { args };
		},
		template: `
			<BccOverlayBadge v-bind="args">
				<div class="w-3rem h-3rem rounded-full bg-primary flex align-items-center justify-content-center text-white font-medium">
					U
				</div>
			</BccOverlayBadge>
		`,
	}),
};
