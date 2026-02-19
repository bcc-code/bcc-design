import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccSelect } from '../../index';

const cities = [
	{ name: 'New York', code: 'NY' },
	{ name: 'Rome', code: 'RM' },
	{ name: 'London', code: 'LDN' },
	{ name: 'Istanbul', code: 'IST' },
	{ name: 'Paris', code: 'PRS' },
];

const meta = {
	component: BccSelect,
	title: 'PrimeVue/BccSelect',
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
	args: {
		placeholder: 'Select a City',
	},
	render: args => ({
		components: { BccSelect },
		setup() {
			const selected = ref<{ name: string; code: string } | null>(null);
			return { args, selected, cities };
		},
		template: `
			<BccSelect v-model="selected" :options="cities" option-label="name" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const WithFilter: Story = {
	args: {
		placeholder: 'Select a City',
		filter: true,
	},
	render: args => ({
		components: { BccSelect },
		setup() {
			const selected = ref<{ name: string; code: string } | null>(null);
			return { args, selected, cities };
		},
		template: `
			<BccSelect v-model="selected" :options="cities" option-label="name" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const Clearable: Story = {
	args: {
		placeholder: 'Select a City',
		showClear: true,
	},
	render: args => ({
		components: { BccSelect },
		setup() {
			const selected = ref<{ name: string; code: string } | null>(cities[0]);
			return { args, selected, cities };
		},
		template: `
			<BccSelect v-model="selected" :options="cities" option-label="name" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const Disabled: Story = {
	args: {
		placeholder: 'Select a City',
		disabled: true,
	},
	render: args => ({
		components: { BccSelect },
		setup() {
			return { args, cities };
		},
		template: `
			<BccSelect :options="cities" option-label="name" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};
