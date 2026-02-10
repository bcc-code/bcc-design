import type { Meta, StoryObj } from '@storybook/vue3';
import { PVColumn, PVDataTable } from '../../index';

const products = [
	{ id: 1, name: 'Product 1', category: 'Category A', quantity: 10 },
	{ id: 2, name: 'Product 2', category: 'Category B', quantity: 20 },
	{ id: 3, name: 'Product 3', category: 'Category A', quantity: 15 },
	{ id: 4, name: 'Product 4', category: 'Category C', quantity: 8 },
];

const meta = {
	component: PVDataTable,
	title: 'PrimeVue/DataTable',
	tags: ['autodocs'],
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
		components: { PVDataTable, PVColumn },
		setup() {
			return { args, products };
		},
		template: `
			<PVDataTable :value="products" v-bind="args" table-style="min-width: 50rem">
				<PVColumn field="id" header="ID" sortable style="width: 20%"></PVColumn>
				<PVColumn field="name" header="Name" sortable style="width: 30%"></PVColumn>
				<PVColumn field="category" header="Category" style="width: 25%"></PVColumn>
				<PVColumn field="quantity" header="Quantity" style="width: 25%"></PVColumn>
			</PVDataTable>
		`,
	}),
};

export const WithPaginator: Story = {
	args: { paginator: true },
	render: args => ({
		components: { PVDataTable, PVColumn },
		setup() {
			return { args, products };
		},
		template: `
			<PVDataTable :value="products" v-bind="args" :rows="2" table-style="min-width: 50rem">
				<PVColumn field="id" header="ID" style="width: 20%"></PVColumn>
				<PVColumn field="name" header="Name" style="width: 30%"></PVColumn>
				<PVColumn field="category" header="Category" style="width: 25%"></PVColumn>
				<PVColumn field="quantity" header="Quantity" style="width: 25%"></PVColumn>
			</PVDataTable>
		`,
	}),
};

export const Striped: Story = {
	args: { stripedRows: true },
	render: args => ({
		components: { PVDataTable, PVColumn },
		setup() {
			return { args, products };
		},
		template: `
			<PVDataTable :value="products" v-bind="args" table-style="min-width: 50rem">
				<PVColumn field="id" header="ID"></PVColumn>
				<PVColumn field="name" header="Name"></PVColumn>
				<PVColumn field="category" header="Category"></PVColumn>
				<PVColumn field="quantity" header="Quantity"></PVColumn>
			</PVDataTable>
		`,
	}),
};
