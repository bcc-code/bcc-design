import { CalendarTodayIcon, HomeIcon, MoreVertIcon, PersonIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { BccAppNavigation, BccDrawer, type BccAppNavigationItem } from '../../../index';

const meta: Meta<typeof BccAppNavigation> = {
	component: BccAppNavigation,
	title: 'Custom/Layouts/BccAppNavigation',
	parameters: {
		docs: {
			description: {
				component:
					'Bottom app navigation bar with icon buttons, optional badge pins, and a controlled `modelValue` indicating the active item.',
			},
		},
	},
	argTypes: {
		items: { control: false },
		activeKey: { control: 'text', description: 'Active item key' },
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

const baseItems: BccAppNavigationItem[] = [
	{
		key: 'home',
		title: 'Home',
		icon: HomeIcon,
	},
	{
		key: 'events',
		title: 'Events',
		icon: CalendarTodayIcon,
		pin: 3,
	},
	{
		key: 'profile',
		title: 'Profile',
		icon: PersonIcon,
	},
];

export const Default: Story = {
	render: () => ({
		components: { BccAppNavigation, HomeIcon, CalendarTodayIcon, PersonIcon },
		setup() {
			const current = ref<BccAppNavigationItem['key'] | null>('home');
			return { items: baseItems, current };
		},
		template: `
			<div class="relative min-h-[280px] bg-surface-100 dark:bg-surface-900">
				<BccAppNavigation :active-key="current" @select="item => current = item.key" :items="items" />
			</div>
		`,
	}),
};

export const ManyItems: Story = {
	render: () => ({
		components: { BccAppNavigation, HomeIcon, CalendarTodayIcon, PersonIcon },
		setup() {
			const items: BccAppNavigationItem[] = [
				...baseItems,
				{
					key: 'tasks',
					title: 'Tasks',
					icon: CalendarTodayIcon,
					pin: 1,
				},
				{
					key: 'settings',
					title: 'Settings',
					icon: PersonIcon,
				},
			];
			const current = ref<BccAppNavigationItem['key'] | null>('home');
			return { items, current };
		},
		template: `
			<div class="relative min-h-[280px] bg-surface-100 dark:bg-surface-900">
				<BccAppNavigation :active-key="current" @select="item => current = item.key" :items="items" />
			</div>
		`,
	}),
};

export const WithPins: Story = {
	render: () => ({
		components: { BccAppNavigation, HomeIcon, CalendarTodayIcon, PersonIcon },
		setup() {
			const items: BccAppNavigationItem[] = [
				{
					key: 'inbox',
					title: 'Inbox',
					icon: HomeIcon,
					pin: 12,
				},
				{
					key: 'alerts',
					title: 'Alerts',
					icon: CalendarTodayIcon,
					pin: 99,
				},
				{
					key: 'me',
					title: 'Me',
					icon: PersonIcon,
				},
			];
			const current = ref<BccAppNavigationItem['key'] | null>('alerts');
			return { items, current };
		},
		template: `
			<div class="relative min-h-[280px] bg-surface-100 dark:bg-surface-900">
				<BccAppNavigation :active-key="current" @select="item => current = item.key" :items="items" />
			</div>
		`,
	}),
};

export const WithMoreDrawer: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"Use a navigation item with `component: 'button'` when the action should open UI (like `BccDrawer`) instead of navigating. This prevents link behavior and ensures the `select` handler can trigger drawer state changes safely.",
			},
			source: {
				code: `<script setup lang="ts">
import { CalendarTodayIcon, HomeIcon, MoreVertIcon, PersonIcon } from '@bcc-code/icons-vue';
import { ref } from 'vue';
import { BccAppNavigation, BccDrawer, type BccAppNavigationItem } from '@bcc-code/component-library';

const items: BccAppNavigationItem[] = [
	{ key: 'home', title: 'Home', icon: HomeIcon },
	{ key: 'events', title: 'Events', icon: CalendarTodayIcon },
	{ key: 'profile', title: 'Profile', icon: PersonIcon },
	{
		key: 'more',
		title: 'More',
		icon: MoreVertIcon,
		component: 'button',
		type: 'button',
	},
];

const current = ref<BccAppNavigationItem['key'] | null>('home');
const drawerVisible = ref(false);

const onSelect = (item: BccAppNavigationItem) => {
	if (item.key === 'more') {
		drawerVisible.value = true;
		return;
	}

	current.value = item.key;
};
</script>

<template>
	<div class="relative min-h-[280px] bg-surface-100 dark:bg-surface-900">
		<BccAppNavigation :active-key="current" :items="items" @select="onSelect" />
		<BccDrawer v-model:visible="drawerVisible" position="right" header="More">
			<p class="m-0">Extra actions can live here instead of a route navigation.</p>
		</BccDrawer>
	</div>
</template>`,
			},
		},
	},
	render: () => ({
		components: {
			BccAppNavigation,
			BccDrawer,
			HomeIcon,
			CalendarTodayIcon,
			PersonIcon,
			MoreVertIcon,
		},
		setup() {
			const items: BccAppNavigationItem[] = [
				{
					key: 'home',
					title: 'Home',
					icon: HomeIcon,
				},
				{
					key: 'events',
					title: 'Events',
					icon: CalendarTodayIcon,
				},
				{
					key: 'profile',
					title: 'Profile',
					icon: PersonIcon,
				},
				{
					key: 'more',
					title: 'More',
					icon: MoreVertIcon,
					component: 'button',
					type: 'button',
				},
			];

			const current = ref<BccAppNavigationItem['key'] | null>('home');
			const drawerVisible = ref(false);

			const onSelect = (item: BccAppNavigationItem) => {
				if (item.key === 'more') {
					drawerVisible.value = true;
					return;
				}

				current.value = item.key;
			};

			return { items, current, drawerVisible, onSelect };
		},
		template: `
			<div class="relative min-h-[280px] bg-surface-100 dark:bg-surface-900">
				<BccAppNavigation :active-key="current" :items="items" @select="onSelect" />
				<BccDrawer v-model:visible="drawerVisible" position="right" header="More">
					<p class="m-0">Extra actions can live here instead of a route navigation.</p>
				</BccDrawer>
			</div>
		`,
	}),
};
