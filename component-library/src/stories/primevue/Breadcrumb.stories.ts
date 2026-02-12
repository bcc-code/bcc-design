import type { Meta, StoryObj } from '@storybook/vue3';
import { BccBreadcrumb } from '../../index';

const items = [{ label: 'Home', to: '#' }, { label: 'Components', to: '#' }, { label: 'Breadcrumb' }];

const meta = {
	component: BccBreadcrumb,
	title: 'PrimeVue/BccBreadcrumb',
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { BccBreadcrumb },
		setup() {
			return { items };
		},
		template: `
			<BccBreadcrumb :model="items" />
		`,
	}),
};

export const WithHome: Story = {
	render: () => ({
		components: { BccBreadcrumb },
		setup() {
			const itemsWithHome = [{ icon: 'pi pi-home', to: '#' }, ...items];
			return { items: itemsWithHome };
		},
		template: `
			<BccBreadcrumb :model="items" />
		`,
	}),
};
