import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccButton, BccMenu } from '../../index';

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
	component: BccMenu,
	title: 'PrimeVue/BccMenu',
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { BccMenu, BccButton },
		setup() {
			const menu = ref();
			const toggle = (event: Event) => {
				menu.value?.toggle(event);
			};
			return { menu, toggle, items };
		},
		template: `
			<div>
				<BccMenu ref="menu" :model="items" popup />
				<BccButton label="Toggle menu" icon="pi pi-bars" @click="toggle" />
			</div>
		`,
	}),
};
