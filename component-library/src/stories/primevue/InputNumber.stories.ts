import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccInputNumber } from '../../index';

const meta = {
	component: BccInputNumber,
	title: 'PrimeVue/BccInputNumber',
	argTypes: {
		disabled: { control: 'boolean' },
		showButtons: { control: 'boolean' },
		minFractionDigits: { control: { type: 'number' } },
		maxFractionDigits: { control: { type: 'number' } },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { BccInputNumber },
		setup() {
			const value = ref<number | null>(0);
			return { args, value };
		},
		template: `
			<BccInputNumber v-model="value" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const WithButtons: Story = {
	args: { showButtons: true },
	render: args => ({
		components: { BccInputNumber },
		setup() {
			const value = ref<number | null>(50);
			return { args, value };
		},
		template: `
			<BccInputNumber v-model="value" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const MinMax: Story = {
	render: () => ({
		components: { BccInputNumber },
		setup() {
			const value = ref<number | null>(0);
			return { value };
		},
		template: `
			<BccInputNumber v-model="value" :min="0" :max="100" class="w-full md:w-14rem" />
		`,
	}),
};

export const Disabled: Story = {
	args: { disabled: true },
	render: args => ({
		components: { BccInputNumber },
		setup() {
			const value = ref<number | null>(42);
			return { args, value };
		},
		template: `
			<BccInputNumber v-model="value" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};
