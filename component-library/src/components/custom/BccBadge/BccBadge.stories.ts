import { BCC_CONTEXT_LIST } from '@/contexts';
import { CheckIcon, CrisisAlertIcon, NotificationsIcon, PersonIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { OverlayBadge } from 'primevue';
import BccBadge from './BccBadge.vue';

const meta = {
	component: BccBadge,
	title: 'Custom/BccBadge',
	argTypes: {
		value: {
			control: 'text',
			description: 'Value to display inside the badge',
		},
		context: {
			control: 'select',
			options: BCC_CONTEXT_LIST,
			description: 'Severity type of the badge',
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg', 'xl'],
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

export const Contexts: Story = {
	render: () => ({
		components: { BccBadge },
		template: `
			<div class="flex flex-wrap gap-2 align-items-center">
				<BccBadge value="Default" />
				<BccBadge value="Info" context="info" />
				<BccBadge value="Success" context="success" />
				<BccBadge value="Warning" context="warning" />
				<BccBadge value="Danger" context="danger" />
				<BccBadge value="Info" context="info-bolder" />
				<BccBadge value="Success" context="success-bolder" />
				<BccBadge value="Warning" context="warning-bolder" />
				<BccBadge value="Danger" context="danger-bolder" />
				<BccBadge value="Other: blue-subtle" context="blue-subtle" />
			</div>
		`,
	}),
};

export const Sizes: Story = {
	render: () => ({
		components: { BccBadge, PersonIcon },
		setup() {
			return { PersonIcon };
		},
		template: `
			<table>
				<thead>
					<tr>
						<th class="pr-2">Small</th>
						<th class="pr-2">Default</th>
						<th class="pr-2">Large</th>
						<th class="pr-2">XLarge</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><BccBadge :value="PersonIcon" size="sm" /></td>
						<td><BccBadge :value="PersonIcon" /></td>
						<td><BccBadge :value="PersonIcon" size="lg" /></td>
						<td><BccBadge :value="PersonIcon" size="xl" /></td>
					</tr>
					<tr><td colspan="4">Squared</td></tr>
					<tr>
						<td><BccBadge :value="PersonIcon" size="sm" squared /></td>
						<td><BccBadge :value="PersonIcon" squared /></td>
						<td><BccBadge :value="PersonIcon" size="lg" squared /></td>
						<td><BccBadge :value="PersonIcon" size="xl" squared /></td>
					</tr>
				</tbody>
			</table>
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
				<BccBadge :value="1" context="info" />
				<BccBadge :value="99" size="xl" context="info" />
				<BccBadge squared value="New" context="teal-subtler" />
				<BccBadge squared value="Draft" size="xl" context="orange-subtler" />
				<BccBadge :value="NotificationsIcon" context="danger" />
				<BccBadge :value="CrisisAlertIcon" size="xl" context="danger" />
			</div>
		`,
	}),
};

export const AsOverlay: Story = {
	render: () => ({
		components: { NotificationsIcon, OverlayBadge },
		template: `
		<div class="inline-block">
			<OverlayBadge value="3" context="danger" size="sm">
				<NotificationsIcon class="size-6" />
			</OverlayBadge>
		</div>
		`,
	}),
};

export const Gradient: Story = {
	render: () => ({
		components: { BccBadge },
		setup() {
			return { PersonIcon };
		},
		template: `
			<BccBadge :value="PersonIcon" gradient size="xl" squared />
			<BccBadge :value="PersonIcon" gradient size="xl" squared context="info-subtler" />
			<BccBadge :value="PersonIcon" gradient size="xl" squared context="success-subtler" />
			<BccBadge :value="PersonIcon" gradient size="xl" squared context="warning-subtler" />
			<BccBadge :value="PersonIcon" gradient size="xl" squared context="danger-subtler" />
			<BccBadge :value="PersonIcon" gradient size="xl" squared context="info-bolder" />
			<BccBadge :value="PersonIcon" gradient size="xl" squared context="success-bolder" />
			<BccBadge :value="PersonIcon" gradient size="xl" squared context="warning-bolder" />
			<BccBadge :value="PersonIcon" gradient size="xl" squared context="danger-bolder" />
		`,
	}),
	parameters: {
		docs: {
			description: {
				component: 'Badge with gradient background color',
			},
		},
	},
};
