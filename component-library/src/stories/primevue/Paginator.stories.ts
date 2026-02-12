import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccPaginator } from '../../index';

const meta = {
	component: BccPaginator,
	title: 'PrimeVue/BccPaginator',
	argTypes: {
		rows: { control: { type: 'number', min: 1 } },
		totalRecords: { control: { type: 'number', min: 0 } },
		rowsPerPageOptions: { control: 'object' },
		showFirstLastIcon: { control: 'boolean' },
		showCurrentPageReport: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		rows: 10,
		totalRecords: 120,
		rowsPerPageOptions: [10, 20, 30],
	},
	render: args => ({
		components: { BccPaginator },
		setup() {
			const first = ref(0);
			return { args, first };
		},
		template: `
			<BccPaginator v-model:first="first" v-bind="args" />
		`,
	}),
};

export const WithPageReport: Story = {
	args: {
		rows: 10,
		totalRecords: 120,
		rowsPerPageOptions: [10, 20, 30],
		template: 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown',
		currentPageReportTemplate: 'Showing {first} to {last} of {totalRecords}',
	},
	render: args => ({
		components: { BccPaginator },
		setup() {
			const first = ref(0);
			return { args, first };
		},
		template: `
			<BccPaginator v-model:first="first" v-bind="args" />
		`,
	}),
};

export const Minimal: Story = {
	args: {
		rows: 10,
		totalRecords: 120,
		template: 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
	},
	render: args => ({
		components: { BccPaginator },
		setup() {
			const first = ref(0);
			return { args, first };
		},
		template: `
			<BccPaginator v-model:first="first" v-bind="args" />
		`,
	}),
};
