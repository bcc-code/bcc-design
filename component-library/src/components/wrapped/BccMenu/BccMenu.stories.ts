import {
	AddIcon,
	CheckIcon,
	CloseIcon,
	FolderOpenIcon,
	LogoutIcon,
	SearchIcon,
	SettingsIcon,
} from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccButton, BccMenu, BccMenuItem } from '../../../index';

const meta = {
	component: BccMenu,
	title: 'Wrapped/BccMenu',
	parameters: {
		docs: {
			description: {
				component:
					'Overlay menu with a list of actions. **Why wrapped:** The item slot is overridden so `model[].icon` can be a Vue icon component (e.g. from `@bcc-code/icons-vue`). [Read more on PrimeVue →](https://primevue.org/menu/)',
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
			const items: BccMenuItem[] = [
				{ label: 'New', icon: AddIcon },
				{ label: 'Search', icon: SearchIcon },
			];
			return { items };
		},
		template: `
			<BccMenu :model="items" />
		`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<script setup>
				import { AddIcon, SearchIcon } from '@bcc-code/icons-vue';
				const items = [
					{ label: 'New', icon: AddIcon },
					{ label: 'Search', icon: SearchIcon },
				];
				</script>
				<template>
					<BccMenu :model="items" />
				</template>
			`,
			},
		},
	},
};

export const Group: Story = {
	render: () => ({
		components: { BccMenu },
		setup() {
			const items: BccMenuItem[] = [
				{
					label: 'Documents',
					items: [
						{ label: 'New', icon: AddIcon },
						{ label: 'Search', icon: SearchIcon },
					],
				},
				{
					label: 'Profile',
					items: [
						{ label: 'Settings', icon: SettingsIcon },
						{ label: 'Logout', icon: LogoutIcon },
					],
				},
			];
			return { items };
		},
		template: `
			<BccMenu :model="items" />
		`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<script setup>
				import { AddIcon, SettingsIcon, LogoutIcon, SearchIcon } from '@bcc-code/icons-vue';
				const items = [
					{
						label: 'Documents',
						items: [
							{ label: 'New', icon: AddIcon },
							{ label: 'Search', icon: SearchIcon },
						],
					},
					{
						label: 'Profile',
						items: [
							{ label: 'Settings', icon: SettingsIcon },
							{ label: 'Logout', icon: LogoutIcon },
						],
					},
				];
				</script>
				<template>
					<BccMenu :model="items" />
				</template>
			`,
			},
		},
	},
};

export const Popup: Story = {
	render: () => ({
		components: { BccMenu, BccButton },
		setup() {
			const menu = ref();
			const toggle = (event: Event) => {
				menu.value?.toggle(event);
			};
			const items: BccMenuItem[] = [
				{ label: 'New', icon: AddIcon },
				{ label: 'Open', icon: FolderOpenIcon },
				{ label: 'Save', icon: CheckIcon },
				{ separator: true },
				{ label: 'Quit', icon: CloseIcon },
			];
			return { menu, toggle, items };
		},
		template: `
			<div>
				<BccMenu ref="menu" :model="items" popup />
				<BccButton label="Toggle menu" @click="toggle" />
			</div>
		`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<script setup>
				import { AddIcon, FolderOpenIcon, CheckIcon, CloseIcon } from '@bcc-code/icons-vue';
				const menu = ref();
				const toggle = (event: Event) => {
					menu.value?.toggle(event);
				};
				const items = [
					{ label: 'New', icon: AddIcon },
					{ label: 'Open', icon: FolderOpenIcon },
					{ label: 'Save', icon: CheckIcon },
					{ separator: true },
					{ label: 'Quit', icon: CloseIcon },
				];
				</script>
				<template>
					<div>
						<BccMenu ref="menu" :model="items" popup />
						<BccButton label="Toggle menu" @click="toggle" />
					</div>
				</template>
			`,
			},
		},
	},
};

export const WithCustomItemTemplate = {
	render: args => ({
		components: { BccMenu, BccButton, AddIcon, FolderOpenIcon, CheckIcon, CloseIcon },
		setup() {
			const menu = ref();
			const toggle = (event: Event) => {
				menu.value?.toggle(event);
			};
			const items: BccMenuItem[] = [
				{ label: 'New', icon: AddIcon, info: 'Create new file' },
				{ label: 'Open', icon: FolderOpenIcon, info: 'Open existing file' },
				{ label: 'Save', icon: CheckIcon, info: 'Save your progress' },
				{ separator: true },
				{ label: 'Quit', icon: CloseIcon, info: 'Exit application' },
			];
			return { menu, toggle, items };
		},
		template: `
			<div>
				<BccMenu ref="menu" :model="items" popup>
					<template #item="{ item, props }">
						<div v-bind="props.action" class="flex items-center gap-2 px-3 py-2 hover:bg-brand-100 rounded cursor-pointer">
							<component :is="item.icon" class="w-5 h-5 opacity-70" v-if="item.icon" />
							<span class="font-medium">{{ item.label }}</span>
							<span v-if="item.info" class="ml-auto text-xs text-neutral-500">{{ item.info }}</span>
						</div>
					</template>
				</BccMenu>
				<BccButton label="Toggle menu" @click="toggle" />
			</div>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story: 'Demonstrates how to use a custom #item template for BccMenu.',
			},
			source: {
				code: `
<script setup>
import { ref } from 'vue'
import { BccMenu, BccButton } from '../../index'
import { AddIcon, FolderOpenIcon, CheckIcon, CloseIcon } from '@bcc-code/icons-vue'
const menu = ref();
const toggle = (event) => menu.value?.toggle(event);
const items = [
	{ label: 'New', icon: AddIcon, info: 'Create new file' },
	{ label: 'Open', icon: FolderOpenIcon, info: 'Open existing file' },
	{ label: 'Save', icon: CheckIcon, info: 'Save your progress' },
	{ separator: true },
	{ label: 'Quit', icon: CloseIcon, info: 'Exit application' },
];
<\/script>
<template>
	<div>
		<BccMenu ref="menu" :model="items" popup>
			<template #item="{ item, props }">
				<div v-bind="props.action" class="flex items-center gap-2 px-3 py-2 hover:bg-brand-100 rounded cursor-pointer">
					<component :is="item.icon" class="w-5 h-5 opacity-70" v-if="item.icon" />
					<span class="font-medium">{{ item.label }}</span>
					<span v-if="item.info" class="ml-auto text-xs text-neutral-500">{{ item.info }}</span>
				</div>
			</template>
		</BccMenu>
		<BccButton label="Toggle menu" @click="toggle" />
	</div>
</template>
				`,
			},
		},
	},
};
