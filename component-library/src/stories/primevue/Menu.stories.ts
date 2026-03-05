import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccButton, BccMenu } from '../../index';

const meta = {
	component: BccMenu,
	title: 'PrimeVue/BccMenu',
	parameters: {
		docs: {
			description: {
				component: 'Overlay menu with a list of actions. [Read more on PrimeVue →](https://primevue.org/menu/)',
			},
		},
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { BccMenu },
		setup() {
			return {
				items: [
					{ label: 'New', icon: 'pi pi-plus' },
					{ label: 'Search', icon: 'pi pi-search' },
				],
			};
		},
		template: `
			<BccMenu :model="items" />
		`,
	}),
};

export const Group: Story = {
	render: () => ({
		components: { BccMenu },
		setup() {
			return {
				items: [
					{
						label: 'Documents',
						items: [
							{ label: 'New', icon: 'pi pi-file-plus' },
							{ label: 'Search', icon: 'pi pi-search' },
						],
					},
					{
						label: 'Profile',
						items: [
							{ label: 'Settings', icon: 'pi pi-cog' },
							{ label: 'Logout', icon: 'pi pi-sign-out' },
						],
					},
				],
			};
		},
		template: `
			<BccMenu :model="items" />
		`,
	}),
};

export const Popup: Story = {
	render: () => ({
		components: { BccMenu, BccButton },
		setup() {
			const menu = ref();
			const toggle = (event: Event) => {
				menu.value?.toggle(event);
			};
			return {
				menu,
				toggle,
				items: [
					{ label: 'New', icon: 'pi pi-plus' },
					{ label: 'Open', icon: 'pi pi-folder-open' },
					{ label: 'Save', icon: 'pi pi-check' },
					{ separator: true },
					{ label: 'Quit', icon: 'pi pi-times' },
				],
			};
		},
		template: `
			<div>
				<BccMenu ref="menu" :model="items" popup />
				<BccButton label="Toggle menu" @click="toggle" />
			</div>
		`,
	}),
};
