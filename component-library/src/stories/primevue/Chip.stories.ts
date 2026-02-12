import type { Meta, StoryObj } from '@storybook/vue3';
import { BccChip } from '../../index';

const meta = {
	component: BccChip,
	title: 'PrimeVue/BccChip',
	argTypes: {
		removable: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { BccChip },
		template: `
			<BccChip label="Default chip" />
		`,
	}),
};

export const WithIcon: Story = {
	render: () => ({
		components: { BccChip },
		template: `
			<BccChip label="With icon" icon="pi pi-check" />
		`,
	}),
};

export const Removable: Story = {
	args: { removable: true },
	render: args => ({
		components: { BccChip },
		setup() {
			return { args };
		},
		template: `
			<BccChip label="Removable" v-bind="args" />
		`,
	}),
};

export const WithImage: Story = {
	render: () => ({
		components: { BccChip },
		template: `
			<BccChip label="Amy Elsner" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
		`,
	}),
};
