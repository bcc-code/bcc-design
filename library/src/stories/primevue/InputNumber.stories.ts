import type { Meta, StoryObj } from '@storybook/vue3';
import { PVInputNumber } from '../../index';
import { ref } from 'vue';

const meta = {
	component: PVInputNumber,
	title: 'PrimeVue/InputNumber',
	tags: ['autodocs'],
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
		components: { PVInputNumber },
		setup() {
			const value = ref<number | null>(0);
			return { args, value };
		},
		template: `
			<PVInputNumber v-model="value" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const WithButtons: Story = {
	args: { showButtons: true },
	render: args => ({
		components: { PVInputNumber },
		setup() {
			const value = ref<number | null>(50);
			return { args, value };
		},
		template: `
			<PVInputNumber v-model="value" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const MinMax: Story = {
	render: () => ({
		components: { PVInputNumber },
		setup() {
			const value = ref<number | null>(0);
			return { value };
		},
		template: `
			<PVInputNumber v-model="value" :min="0" :max="100" class="w-full md:w-14rem" />
		`,
	}),
};

export const Disabled: Story = {
	args: { disabled: true },
	render: args => ({
		components: { PVInputNumber },
		setup() {
			const value = ref<number | null>(42);
			return { args, value };
		},
		template: `
			<PVInputNumber v-model="value" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};
