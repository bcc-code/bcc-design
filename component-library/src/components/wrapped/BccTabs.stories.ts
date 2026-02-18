import { BCC_CONTEXTS } from '@/contexts';
import { HomeIcon, PersonIcon, SettingsIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BccTabs from './BccTabs.vue';

const meta: Meta<typeof BccTabs> = {
	component: BccTabs,
	title: 'Wrapped/BccTabs',
	argTypes: {
		fill: { control: 'boolean' },
		noPanels: { control: 'boolean' },
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

const simpleTabs = [{ title: 'Tab 1' }, { title: 'Tab 2' }, { title: 'Tab 3' }];

export const Default: Story = {
	args: {
		tabs: simpleTabs,
	},
};

export const WithIcons: Story = {
	args: {
		tabs: [
			{ title: 'Home', icon: HomeIcon },
			{ title: 'Profile', icon: PersonIcon },
			{ title: 'Settings', icon: SettingsIcon },
		],
	},
};

export const WithPins: Story = {
	args: {
		tabs: [
			{ title: 'Inbox', badge: { value: '3', context: BCC_CONTEXTS.info.subtlest } },
			{ title: 'Archive' },
			{ title: 'Spam', badge: { value: '1', context: BCC_CONTEXTS.danger.subtlest } },
		],
	},
};

export const WithIconsAndPins: Story = {
	args: {
		tabs: [
			{ title: 'Home', icon: HomeIcon },
			{ title: 'Profile', icon: PersonIcon, badge: { value: '2' } },
			{ title: 'Settings', icon: SettingsIcon },
		],
	},
};

export const Fill: Story = {
	args: {
		tabs: simpleTabs,
		fill: true,
	},
};

export const NoPanels: Story = {
	args: {
		tabs: simpleTabs,
		noPanels: true,
	},
};

export const WithPanelContent: Story = {
	args: {
		tabs: [{ title: 'First' }, { title: 'Second' }, { title: 'Third' }],
	},
	render: args => ({
		components: { BccTabs },
		setup() {
			return { args };
		},
		template: `
			<BccTabs v-bind="args">
				<template #tab-1>Content for first tab</template>
				<template #tab-2>Content for second tab</template>
				<template #tab-3>Content for third tab</template>
			</BccTabs>
		`,
	}),
};
