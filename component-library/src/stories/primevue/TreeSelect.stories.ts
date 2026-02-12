import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccTreeSelect } from '../../index';

const nodes = [
	{
		key: '0',
		label: 'Root',
		children: [
			{
				key: '0-0',
				label: 'Node 0-0',
				children: [
					{ key: '0-0-0', label: 'Node 0-0-0' },
					{ key: '0-0-1', label: 'Node 0-0-1' },
				],
			},
			{
				key: '0-1',
				label: 'Node 0-1',
				children: [
					{ key: '0-1-0', label: 'Node 0-1-0' },
					{ key: '0-1-1', label: 'Node 0-1-1' },
				],
			},
		],
	},
];

const meta = {
	component: BccTreeSelect,
	title: 'PrimeVue/BccTreeSelect',
	argTypes: {
		placeholder: { control: 'text' },
		selectionMode: { control: 'select', options: ['single', 'multiple', 'checkbox'] },
		filter: { control: 'boolean' },
		showClear: { control: 'boolean' },
		disabled: { control: 'boolean' },
		display: { control: 'select', options: ['comma', 'chip'] },
		size: { control: 'select', options: ['small', 'medium', 'large'] },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: 'Select Item',
	},
	render: args => ({
		components: { BccTreeSelect },
		setup() {
			const selected = ref<string | null>(null);
			return { args, selected, nodes };
		},
		template: `
			<BccTreeSelect v-model="selected" :options="nodes" v-bind="args" class="w-full md:w-20rem" />
		`,
	}),
};

export const Multiple: Story = {
	args: {
		placeholder: 'Select Items',
		selectionMode: 'multiple',
		display: 'chip',
	},
	render: args => ({
		components: { BccTreeSelect },
		setup() {
			const selected = ref<Record<string, boolean>>({});
			return { args, selected, nodes };
		},
		template: `
			<BccTreeSelect v-model="selected" :options="nodes" v-bind="args" class="w-full md:w-20rem" />
		`,
	}),
};

export const Checkbox: Story = {
	args: {
		placeholder: 'Select Items',
		selectionMode: 'checkbox',
	},
	render: args => ({
		components: { BccTreeSelect },
		setup() {
			const selected = ref<Record<string, { checked: boolean; partialChecked: boolean }>>({});
			return { args, selected, nodes };
		},
		template: `
			<BccTreeSelect v-model="selected" :options="nodes" v-bind="args" class="w-full md:w-20rem" />
		`,
	}),
};

export const WithFilter: Story = {
	args: {
		placeholder: 'Select Item',
		filter: true,
	},
	render: args => ({
		components: { BccTreeSelect },
		setup() {
			const selected = ref<string | null>(null);
			return { args, selected, nodes };
		},
		template: `
			<BccTreeSelect v-model="selected" :options="nodes" v-bind="args" class="w-full md:w-20rem" />
		`,
	}),
};

export const Clearable: Story = {
	args: {
		placeholder: 'Select Item',
		showClear: true,
	},
	render: args => ({
		components: { BccTreeSelect },
		setup() {
			const selected = ref<string | null>('0-0-0');
			return { args, selected, nodes };
		},
		template: `
			<BccTreeSelect v-model="selected" :options="nodes" v-bind="args" class="w-full md:w-20rem" />
		`,
	}),
};

export const Disabled: Story = {
	args: {
		placeholder: 'Select Item',
		disabled: true,
	},
	render: args => ({
		components: { BccTreeSelect },
		setup() {
			return { args, nodes };
		},
		template: `
			<BccTreeSelect :options="nodes" v-bind="args" class="w-full md:w-20rem" />
		`,
	}),
};

export const Sizes: Story = {
	render: () => ({
		components: { BccTreeSelect },
		setup() {
			const value1 = ref<string | null>(null);
			const value2 = ref<string | null>(null);
			const value3 = ref<string | null>(null);
			return { value1, value2, value3, nodes };
		},
		template: `
			<div class="flex flex-col gap-4">
				<BccTreeSelect v-model="value1" :options="nodes" size="small" placeholder="Small" class="w-full md:w-20rem" />
				<BccTreeSelect v-model="value2" :options="nodes" placeholder="Normal" class="w-full md:w-20rem" />
				<BccTreeSelect v-model="value3" :options="nodes" size="large" placeholder="Large" class="w-full md:w-20rem" />
			</div>
		`,
	}),
};
