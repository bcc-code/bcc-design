import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccMultiSelect } from '../../index';

const cities = [
	{ name: 'New York', code: 'NY' },
	{ name: 'Rome', code: 'RM' },
	{ name: 'London', code: 'LDN' },
	{ name: 'Istanbul', code: 'IST' },
	{ name: 'Paris', code: 'PRS' },
];

const meta = {
	component: BccMultiSelect,
	title: 'PrimeVue/BccMultiSelect',
	argTypes: {
		placeholder: { control: 'text' },
		disabled: { control: 'boolean' },
		filter: { control: 'boolean' },
		showClear: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { placeholder: 'Select cities' },
	render: args => ({
		components: { BccMultiSelect },
		setup() {
			const selected = ref<typeof cities>([]);
			return { args, selected, cities };
		},
		template: `
			<BccMultiSelect v-model="selected" :options="cities" option-label="name" v-bind="args" class="w-full md:w-20rem" />
		`,
	}),
};

export const WithFilter: Story = {
	args: { placeholder: 'Select cities', filter: true },
	render: args => ({
		components: { BccMultiSelect },
		setup() {
			const selected = ref<typeof cities>([]);
			return { args, selected, cities };
		},
		template: `
			<BccMultiSelect v-model="selected" :options="cities" option-label="name" v-bind="args" class="w-full md:w-20rem" />
		`,
	}),
};

export const Disabled: Story = {
	args: { placeholder: 'Select cities', disabled: true },
	render: args => ({
		components: { BccMultiSelect },
		setup() {
			return { args, cities };
		},
		template: `
			<BccMultiSelect :options="cities" option-label="name" v-bind="args" class="w-full md:w-20rem" />
		`,
	}),
};
