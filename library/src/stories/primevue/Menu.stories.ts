import type { Meta, StoryObj } from '@storybook/vue3';
import { PVButton, PVMenu } from '../../index';
import { ref } from 'vue';

const items = [
	{
		label: 'Options',
		items: [
			{ label: 'New', icon: 'pi pi-plus' },
			{ label: 'Open', icon: 'pi pi-folder-open' },
			{ label: 'Save', icon: 'pi pi-check' },
			{ separator: true },
			{ label: 'Quit', icon: 'pi pi-times' },
		],
	},
];

const meta = {
	component: PVMenu,
	title: 'PrimeVue/Menu',
	tags: ['autodocs'],
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { PVMenu, PVButton },
		setup() {
			const menu = ref();
			const toggle = (event: Event) => {
				menu.value?.toggle(event);
			};
			return { menu, toggle, items };
		},
		template: `
			<div>
				<PVMenu ref="menu" :model="items" popup />
				<PVButton label="Toggle menu" icon="pi pi-bars" @click="toggle" />
			</div>
		`,
	}),
};
