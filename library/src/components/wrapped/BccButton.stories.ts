import type { Meta, StoryObj } from '@storybook/vue3';
import type { ButtonProps } from 'primevue';
import BccButton from './BccButton.vue';

const meta: Meta<typeof BccButton> = {
	component: BccButton,
	title: 'Wrapped/BccButton',
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		severity: {
			control: 'select',
			options: ['secondary', 'success', 'info', 'warn', 'help', 'danger', 'contrast'],
		},
		disabled: { control: 'boolean' },
		loading: { control: 'boolean' },
		outlined: { control: 'boolean' },
	} as Record<keyof ButtonProps, object>,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Button',
	},
};

export const Variants: Story = {
	render: () => ({
		components: { BccButton },
		template: `
			<div class="flex flex-wrap gap-2">
				<BccButton label="Default" />
				<BccButton label="Outlined" outlined />
				<BccButton label="Text" text />
				<BccButton label="Rounded" rounded />
				<BccButton label="Rounded Outlined" rounded outlined />
			</div>
		`,
	}),
};

export const Severities: Story = {
	render: () => ({
		components: { BccButton },
		template: `
			<div class="flex flex-wrap gap-2">
				<BccButton label="Primary" />
				<BccButton label="Contrast" severity="contrast" />
				<BccButton label="Success" severity="success" />
				<BccButton label="Info" severity="info" />
				<BccButton label="Warn" severity="warn" />
				<BccButton label="Help" severity="help" />
			</div>
		`,
	}),
};

export const Disabled: Story = {
	args: {
		label: 'Disabled',
		disabled: true,
	},
};
