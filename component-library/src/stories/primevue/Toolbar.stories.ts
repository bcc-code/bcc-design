import { AddIcon, CheckIcon, MoreVertIcon, SearchIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { BccButton, BccToolbar } from '../../index';

const meta = {
	component: BccToolbar,
	title: 'PrimeVue/BccToolbar',
	parameters: {
		docs: {
			description: {
				component:
					'Container for action buttons and controls. [Read more on PrimeVue →](https://primevue.org/toolbar/)',
			},
		},
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { BccToolbar, BccButton },
		setup() {
			return { AddIcon, CheckIcon, SearchIcon, MoreVertIcon };
		},
		template: `
			<BccToolbar>
				<template #start>
					<BccButton label="New" :icon="AddIcon" class="mr-2" />
					<BccButton label="Save" :icon="CheckIcon" severity="secondary" class="mr-2" />
				</template>
				<template #end>
					<BccButton :icon="SearchIcon" rounded class="mr-2" />
					<BccButton :icon="MoreVertIcon" rounded severity="secondary" />
				</template>
			</BccToolbar>
		`,
	}),
};

export const WithTitle: Story = {
	render: () => ({
		components: { BccToolbar, BccButton },
		setup() {
			return { CheckIcon };
		},
		template: `
			<BccToolbar>
				<template #start>
					<span class="font-semibold text-lg">Toolbar title</span>
				</template>
				<template #end>
					<BccButton label="Action" :icon="CheckIcon" />
				</template>
			</BccToolbar>
		`,
	}),
};
