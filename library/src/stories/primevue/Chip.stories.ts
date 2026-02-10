import type { Meta, StoryObj } from '@storybook/vue3';
import { PVChip } from '../../index';

const meta = {
	component: PVChip,
	title: 'PrimeVue/Chip',
	tags: ['autodocs'],
	argTypes: {
		removable: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { PVChip },
		template: `
			<PVChip label="Default chip" />
		`,
	}),
};

export const WithIcon: Story = {
	render: () => ({
		components: { PVChip },
		template: `
			<PVChip label="With icon" icon="pi pi-check" />
		`,
	}),
};

export const Removable: Story = {
	args: { removable: true },
	render: args => ({
		components: { PVChip },
		setup() {
			return { args };
		},
		template: `
			<PVChip label="Removable" v-bind="args" />
		`,
	}),
};

export const WithImage: Story = {
	render: () => ({
		components: { PVChip },
		template: `
			<PVChip label="Amy Elsner" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
		`,
	}),
};
