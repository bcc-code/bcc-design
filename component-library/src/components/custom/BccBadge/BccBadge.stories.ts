import { CheckIcon, CrisisAlertIcon, NotificationsIcon, PersonIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { OverlayBadge } from 'primevue';
import BccBadge from './BccBadge.vue';

const meta = {
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
			options: ['sm', 'lg', 'xl'],
			description: 'Size of the badge',
		},
		icon: {
			control: false,
			description: 'Vue component to show when value is empty (icon-only badge)',
		},
	},
} as Meta<typeof BccBadge>;

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
				<BccBadge value="Default" />
				<BccBadge value="Info" context="info-bolder" />
				<BccBadge value="Success" context="success-bolder" />
				<BccBadge value="Warning" context="warning-bolder" />
				<BccBadge value="Danger" context="danger-bolder" />
				<BccBadge value="Magenta" context="magenta-bolder" />
			</div>
		`,
	}),
};

export const Sizes: Story = {
	render: () => ({
		components: { BccBadge },
		template: `
			<div class="flex flex-wrap gap-2 align-items-center">
				<BccBadge value="Small" size="sm" />
				<BccBadge value="Default" />
				<BccBadge value="Large" size="lg" />
				<BccBadge value="XLarge" size="xl" />
			</div>
		`,
	}),
};

export const BorderedAndSquared: Story = {
	render: () => ({
		components: { BccBadge, CheckIcon },
		setup() {
			return { CheckIcon };
		},
		template: `
			<div class="flex flex-wrap gap-2 align-items-center">
				<BccBadge bordered squared value="Bordered and squared" />
				<BccBadge bordered value="99" context="blue-subtlest" />
				<BccBadge bordered value="4" context="blue-subtler" />
				<BccBadge bordered squared :value="CheckIcon" context="green-subtlest" />
				<BccBadge bordered value="Danger" context="danger-bolder" />
				<BccBadge bordered squared value="Magenta" context="magenta-bolder" />
			</div>
		`,
	}),
};

export const NumericOrTextOrIcon: Story = {
	render: () => ({
		components: { BccBadge, NotificationsIcon, PersonIcon, CrisisAlertIcon },
		setup() {
			return { NotificationsIcon, PersonIcon, CrisisAlertIcon };
		},
		template: `
			<div class="flex flex-wrap gap-2 align-items-center">
				<BccBadge :value="1" severity="info" />
				<BccBadge :value="99" size="xl" severity="info" />
				<BccBadge squared value="New" severity="secondary" />
				<BccBadge squared value="Draft" size="xl" severity="secondary" />
				<BccBadge :value="NotificationsIcon" severity="danger" />
				<BccBadge :value="CrisisAlertIcon" size="xl" severity="danger" />
			</div>
		`,
	}),
};

export const AsOverlay: Story = {
	render: () => ({
		components: { NotificationsIcon, OverlayBadge },
		template: `
		<div class="inline-block">
			<OverlayBadge value="3" severity="danger" size="sm">
				<NotificationsIcon class="size-6" />
			</OverlayBadge>
		</div>
		`,
	}),
};
