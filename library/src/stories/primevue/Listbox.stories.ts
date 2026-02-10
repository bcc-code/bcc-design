import type { Meta, StoryObj } from '@storybook/vue3';
import { PVListbox } from '../../index';
import { ref } from 'vue';

const options = [
	{ name: 'New York', code: 'NY' },
	{ name: 'Rome', code: 'RM' },
	{ name: 'London', code: 'LDN' },
	{ name: 'Istanbul', code: 'IST' },
	{ name: 'Paris', code: 'PRS' },
];

const meta = {
	component: PVListbox,
	title: 'PrimeVue/Listbox',
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean' },
		filter: { control: 'boolean' },
		multiple: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { PVListbox },
		setup() {
			const selected = ref<(typeof options)[0] | null>(null);
			return { args, selected, options };
		},
		template: `
			<PVListbox v-model="selected" :options="options" option-label="name" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const Multiple: Story = {
	args: { multiple: true },
	render: args => ({
		components: { PVListbox },
		setup() {
			const selected = ref<typeof options>([]);
			return { args, selected, options };
		},
		template: `
			<PVListbox v-model="selected" :options="options" option-label="name" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const WithFilter: Story = {
	args: { filter: true },
	render: args => ({
		components: { PVListbox },
		setup() {
			const selected = ref<(typeof options)[0] | null>(null);
			return { args, selected, options };
		},
		template: `
			<PVListbox v-model="selected" :options="options" option-label="name" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};
