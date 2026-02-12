import { NotificationsIcon, PersonIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BccBadge from './BccBadge.vue';
import BccButton from './BccButton.vue';

const meta: Meta<typeof BccBadge> = {
	component: BccBadge,
	title: 'Wrapped/BccBadge',
	argTypes: {
		value: {
			control: 'text',
			description: 'Value to display inside the badge',
		},
		severity: {
			control: 'select',
			options: ['secondary', 'info', 'success', 'warn', 'danger', 'contrast'],
			description: 'Severity type of the badge',
		},
		size: {
			control: 'select',
			options: ['small', 'large', 'xlarge'],
			description: 'Size of the badge',
		},
		icon: {
			control: false,
			description: 'Vue component to show when value is empty (icon-only badge)',
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: '5',
	},
};

export const Severities: Story = {
	render: () => ({
		components: { BccBadge },
		template: `
			<div class="flex flex-wrap gap-2 align-items-center">
				<BccBadge value="Secondary" severity="secondary" />
				<BccBadge value="Info" severity="info" />
				<BccBadge value="Success" severity="success" />
				<BccBadge value="Warn" severity="warn" />
				<BccBadge value="Danger" severity="danger" />
				<BccBadge value="Contrast" severity="contrast" />
			</div>
		`,
	}),
};

export const Sizes: Story = {
	render: () => ({
		components: { BccBadge },
		template: `
			<div class="flex flex-wrap gap-2 align-items-center">
				<BccBadge value="Small" size="small" />
				<BccBadge value="Default" />
				<BccBadge value="Large" size="large" />
				<BccBadge value="XLarge" size="xlarge" />
			</div>
		`,
	}),
};

export const NumericAndText: Story = {
	render: () => ({
		components: { BccBadge },
		template: `
			<div class="flex flex-wrap gap-2 align-items-center">
				<BccBadge :value="1" />
				<BccBadge :value="99" severity="info" />
				<BccBadge value="New" severity="success" />
				<BccBadge value="Draft" severity="secondary" />
			</div>
		`,
	}),
};

export const IconOnly: Story = {
	render: () => ({
		components: { BccBadge, NotificationsIcon, PersonIcon },
		template: `
			<div class="flex flex-wrap gap-2 align-items-center">
				<BccBadge :icon="NotificationsIcon" severity="danger" />
				<BccBadge :icon="PersonIcon" severity="info" />
				<BccBadge :icon="NotificationsIcon" size="small" />
				<BccBadge :icon="NotificationsIcon" size="large" />
			</div>
		`,
	}),
};

export const OnButton: Story = {
	render: () => ({
		components: { BccBadge, BccButton },
		template: `
			<div class="flex flex-wrap gap-2">
				<BccButton badge="3">Notifications</BccButton>
				<BccButton badge="12" severity="danger">Messages</BccButton>
			</div>
		`,
	}),
};
