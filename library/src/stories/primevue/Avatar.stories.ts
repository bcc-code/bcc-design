import type { Meta, StoryObj } from '@storybook/vue3';
import { PVAvatar } from '../../index';

const meta = {
	component: PVAvatar,
	title: 'PrimeVue/Avatar',
	tags: ['autodocs'],
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
		components: { PVAvatar },
		setup() {
			return { args };
		},
		template: `
			<PVAvatar v-bind="args" />
		`,
	}),
};

export const Image: Story = {
	render: () => ({
		components: { PVAvatar },
		template: `
			<PVAvatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
		`,
	}),
};

export const Icon: Story = {
	render: () => ({
		components: { PVAvatar },
		template: `
			<PVAvatar icon="pi pi-user" shape="circle" />
		`,
	}),
};

export const Sizes: Story = {
	render: () => ({
		components: { PVAvatar },
		template: `
			<div class="flex align-items-center gap-2">
				<PVAvatar label="S" size="normal" />
				<PVAvatar label="M" size="large" />
				<PVAvatar label="L" size="xlarge" />
			</div>
		`,
	}),
};
