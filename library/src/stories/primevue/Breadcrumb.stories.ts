import type { Meta, StoryObj } from '@storybook/vue3';
import { PVBreadcrumb } from '../../index';

const items = [{ label: 'Home', to: '#' }, { label: 'Components', to: '#' }, { label: 'Breadcrumb' }];

const meta = {
	component: PVBreadcrumb,
	title: 'PrimeVue/Breadcrumb',
	tags: ['autodocs'],
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { PVBreadcrumb },
		setup() {
			return { items };
		},
		template: `
			<PVBreadcrumb :model="items" />
		`,
	}),
};

export const WithHome: Story = {
	render: () => ({
		components: { PVBreadcrumb },
		setup() {
			const itemsWithHome = [{ icon: 'pi pi-home', to: '#' }, ...items];
			return { items: itemsWithHome };
		},
		template: `
			<PVBreadcrumb :model="items" />
		`,
	}),
};
