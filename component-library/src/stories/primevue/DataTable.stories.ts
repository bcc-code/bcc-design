import type { Meta, StoryObj } from '@storybook/vue3';
import { BccColumn, BccDataTable } from '../../index';

const products = [
	{ id: 1, name: 'Product 1', category: 'Category A', quantity: 10 },
	{ id: 2, name: 'Product 2', category: 'Category B', quantity: 20 },
	{ id: 3, name: 'Product 3', category: 'Category A', quantity: 15 },
	{ id: 4, name: 'Product 4', category: 'Category C', quantity: 8 },
];

const meta = {
	component: BccDataTable,
	title: 'PrimeVue/BccDataTable',
	argTypes: {
		stripedRows: { control: 'boolean' },
		showGridlines: { control: 'boolean' },
		paginator: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { BccDataTable, BccColumn },
		setup() {
			return { args, products };
		},
		template: `
			<BccDataTable :value="products" v-bind="args" table-style="min-width: 50rem">
				<BccColumn field="id" header="ID" sortable style="width: 20%"></BccColumn>
				<BccColumn field="name" header="Name" sortable style="width: 30%"></BccColumn>
				<BccColumn field="category" header="Category" style="width: 25%"></BccColumn>
				<BccColumn field="quantity" header="Quantity" style="width: 25%"></BccColumn>
			</BccDataTable>
		`,
	}),
};

export const WithPaginator: Story = {
	args: { paginator: true },
	render: args => ({
		components: { BccDataTable, BccColumn },
		setup() {
			return { args, products };
		},
		template: `
			<BccDataTable :value="products" v-bind="args" :rows="2" table-style="min-width: 50rem">
				<BccColumn field="id" header="ID" style="width: 20%"></BccColumn>
				<BccColumn field="name" header="Name" style="width: 30%"></BccColumn>
				<BccColumn field="category" header="Category" style="width: 25%"></BccColumn>
				<BccColumn field="quantity" header="Quantity" style="width: 25%"></BccColumn>
			</BccDataTable>
		`,
	}),
};

export const Striped: Story = {
	args: { stripedRows: true },
	render: args => ({
		components: { BccDataTable, BccColumn },
		setup() {
			return { args, products };
		},
		template: `
			<BccDataTable :value="products" v-bind="args" table-style="min-width: 50rem">
				<BccColumn field="id" header="ID"></BccColumn>
				<BccColumn field="name" header="Name"></BccColumn>
				<BccColumn field="category" header="Category"></BccColumn>
				<BccColumn field="quantity" header="Quantity"></BccColumn>
			</BccDataTable>
		`,
	}),
};
