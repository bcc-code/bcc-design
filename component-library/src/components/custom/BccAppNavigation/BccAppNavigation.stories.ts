import { CalendarTodayIcon, HomeIcon, PersonIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccAppNavigation, type BccAppNavigationItem } from '../../../index';

const meta: Meta<typeof BccAppNavigation> = {
	component: BccAppNavigation,
	title: 'Custom/BccAppNavigation',
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
		modelValue: { control: 'text', description: 'Active item key' },
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

const baseItems: BccAppNavigationItem[] = [
	{
		key: 'home',
		link: '/home',
		title: 'Home',
		icon: HomeIcon,
	},
	{
		key: 'events',
		link: '/events',
		title: 'Events',
		icon: CalendarTodayIcon,
		pin: 3,
	},
	{
		key: 'profile',
		link: '/profile',
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
				<BccAppNavigation v-model="current" :items="items" />
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
					link: '/tasks',
					title: 'Tasks',
					icon: CalendarTodayIcon,
					pin: 1,
				},
				{
					key: 'settings',
					link: '/settings',
					title: 'Settings',
					icon: PersonIcon,
				},
			];
			const current = ref<BccAppNavigationItem['key'] | null>('home');
			return { items, current };
		},
		template: `
			<div class="relative min-h-[280px] bg-surface-100 dark:bg-surface-900">
				<BccAppNavigation v-model="current" :items="items" />
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
					link: '/inbox',
					title: 'Inbox',
					icon: HomeIcon,
					pin: 12,
				},
				{
					key: 'alerts',
					link: '/alerts',
					title: 'Alerts',
					icon: CalendarTodayIcon,
					pin: 99,
				},
				{
					key: 'me',
					link: '/me',
					title: 'Me',
					icon: PersonIcon,
				},
			];
			const current = ref<BccAppNavigationItem['key'] | null>('alerts');
			return { items, current };
		},
		template: `
			<div class="relative min-h-[280px] bg-surface-100 dark:bg-surface-900">
				<BccAppNavigation v-model="current" :items="items" />
			</div>
		`,
	}),
};
