import { PersonIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BccPin from './BccPin.vue';

const meta: Meta<typeof BccPin> = {
	component: BccPin,
	title: 'Wrapped/BccPin',
	tags: ['autodocs'],
	argTypes: {
		value: { control: 'text' },
		severity: {
			control: 'select',
			options: ['secondary', 'info', 'success', 'warn', 'danger', 'contrast'],
		},
		size: {
			control: 'select',
			options: ['small', 'large', 'xlarge'],
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: '1',
	},
};

export const WithValue: Story = {
	args: {
		value: '12',
	},
};

export const WithIconOnly: Story = {
	args: {
		icon: PersonIcon,
	},
};

export const Severities: Story = {
	render: () => ({
		components: { BccPin },
		template: `
			<div class="flex flex-wrap gap-2 items-center">
				<BccPin value="1" severity="secondary" />
				<BccPin value="2" severity="info" />
				<BccPin value="3" severity="success" />
				<BccPin value="4" severity="warn" />
				<BccPin value="5" severity="danger" />
				<BccPin value="6" severity="contrast" />
			</div>
		`,
	}),
};

export const Sizes: Story = {
	render: () => ({
		components: { BccPin, PersonIcon },
		setup() {
			return { PersonIcon };
		},
		template: `
			<div class="flex flex-wrap gap-2 items-center">
				<BccPin :icon="PersonIcon" size="small" />
				<BccPin value="M" size="small" />
				<BccPin :icon="PersonIcon" size="large" />
				<BccPin value="L" size="large" />
				<BccPin :icon="PersonIcon" size="xlarge" />
				<BccPin value="XL" size="xlarge" />
			</div>
		`,
	}),
};
