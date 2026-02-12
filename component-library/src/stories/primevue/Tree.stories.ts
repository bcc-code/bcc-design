import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccTree } from '../../index';

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
	component: BccTree,
	title: 'PrimeVue/BccTree',
	argTypes: {
		selectionMode: { control: 'select', options: [null, 'single', 'multiple', 'checkbox'] },
		filter: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { BccTree },
		setup() {
			const selectionKeys = ref<Record<string, boolean>>({});
			return { args, selectionKeys, nodes };
		},
		template: `
			<BccTree v-model:selection-keys="selectionKeys" :value="nodes" v-bind="args" class="w-full md:w-20rem" />
		`,
	}),
};

export const SelectionSingle: Story = {
	args: { selectionMode: 'single' },
	render: args => ({
		components: { BccTree },
		setup() {
			const selectionKeys = ref<Record<string, boolean>>({});
			return { args, selectionKeys, nodes };
		},
		template: `
			<div>
				<BccTree v-model:selection-keys="selectionKeys" :value="nodes" v-bind="args" class="w-full md:w-20rem" />
				<p class="mt-2 text-sm text-surface-500">Selected: {{ selectionKeys }}</p>
			</div>
		`,
	}),
};

export const WithFilter: Story = {
	args: { filter: true },
	render: args => ({
		components: { BccTree },
		setup() {
			const selectionKeys = ref<Record<string, boolean>>({});
			return { args, selectionKeys, nodes };
		},
		template: `
			<BccTree v-model:selection-keys="selectionKeys" :value="nodes" v-bind="args" class="w-full md:w-20rem" />
		`,
	}),
};
