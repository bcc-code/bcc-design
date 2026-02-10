import type { Meta, StoryObj } from '@storybook/vue3';
import { PVDropdown } from '../../index';
import { ref } from 'vue';

const cities = [
	{ name: 'New York', code: 'NY' },
	{ name: 'Rome', code: 'RM' },
	{ name: 'London', code: 'LDN' },
	{ name: 'Istanbul', code: 'IST' },
	{ name: 'Paris', code: 'PRS' },
];

const meta = {
	component: PVDropdown,
	title: 'PrimeVue/Dropdown',
	tags: ['autodocs'],
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
		components: { PVDropdown },
		setup() {
			const selected = ref<{ name: string; code: string } | null>(null);
			return { args, selected, cities };
		},
		template: `
			<PVDropdown v-model="selected" :options="cities" option-label="name" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const WithFilter: Story = {
	args: {
		placeholder: 'Select a City',
		filter: true,
	},
	render: args => ({
		components: { PVDropdown },
		setup() {
			const selected = ref<{ name: string; code: string } | null>(null);
			return { args, selected, cities };
		},
		template: `
			<PVDropdown v-model="selected" :options="cities" option-label="name" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const Clearable: Story = {
	args: {
		placeholder: 'Select a City',
		showClear: true,
	},
	render: args => ({
		components: { PVDropdown },
		setup() {
			const selected = ref<{ name: string; code: string } | null>(cities[0]);
			return { args, selected, cities };
		},
		template: `
			<PVDropdown v-model="selected" :options="cities" option-label="name" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const Disabled: Story = {
	args: {
		placeholder: 'Select a City',
		disabled: true,
	},
	render: args => ({
		components: { PVDropdown },
		setup() {
			return { args, cities };
		},
		template: `
			<PVDropdown :options="cities" option-label="name" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};
