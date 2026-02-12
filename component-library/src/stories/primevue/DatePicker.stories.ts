import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccDatePicker } from '../../index';

const meta = {
	component: BccDatePicker,
	title: 'PrimeVue/BccDatePicker',
	argTypes: {
		showIcon: { control: 'boolean' },
		showButtonBar: { control: 'boolean' },
		dateFormat: { control: 'text' },
		disabled: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { BccDatePicker },
		setup() {
			const date = ref<Date | null>(null);
			return { args, date };
		},
		template: `
			<BccDatePicker v-model="date" v-bind="args" class="w-64" />
		`,
	}),
};

export const WithIcon: Story = {
	args: { showIcon: true },
	render: args => ({
		components: { BccDatePicker },
		setup() {
			const date = ref<Date | null>(null);
			return { args, date };
		},
		template: `
			<BccDatePicker v-model="date" v-bind="args" class="w-64" />
		`,
	}),
};

export const WithTime: Story = {
	render: () => ({
		components: { BccDatePicker },
		setup() {
			const date = ref<Date | null>(null);
			return { date };
		},
		template: `
			<BccDatePicker v-model="date" show-time hour-format="24" class="w-64" />
		`,
	}),
};

export const Disabled: Story = {
	args: { disabled: true },
	render: args => ({
		components: { BccDatePicker },
		setup() {
			const date = ref<Date | null>(new Date());
			return { args, date };
		},
		template: `
			<BccDatePicker v-model="date" v-bind="args" class="w-64" />
		`,
	}),
};
