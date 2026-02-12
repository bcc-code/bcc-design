import type { Meta, StoryObj } from '@storybook/vue3';
import { BccAvatar } from '../../index';

const meta = {
	component: BccAvatar,
	title: 'PrimeVue/BccAvatar',
	argTypes: {
		shape: { control: 'select', options: ['circle', 'square'] },
		size: { control: 'select', options: ['normal', 'large', 'xlarge'] },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Label: Story = {
	args: { label: 'AB' },
	render: args => ({
		components: { BccAvatar },
		setup() {
			return { args };
		},
		template: `
			<BccAvatar v-bind="args" />
		`,
	}),
};

export const Image: Story = {
	render: () => ({
		components: { BccAvatar },
		template: `
			<BccAvatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
		`,
	}),
};

export const Icon: Story = {
	render: () => ({
		components: { BccAvatar },
		template: `
			<BccAvatar icon="pi pi-user" shape="circle" />
		`,
	}),
};

export const Sizes: Story = {
	render: () => ({
		components: { BccAvatar },
		template: `
			<div class="flex align-items-center gap-2">
				<BccAvatar label="S" size="normal" />
				<BccAvatar label="M" size="large" />
				<BccAvatar label="L" size="xlarge" />
			</div>
		`,
	}),
};
