import type { Meta, StoryObj } from '@storybook/vue3';
import { BccButton, BccToolbar } from '../../index';

const meta = {
	component: BccToolbar,
	title: 'PrimeVue/BccToolbar',
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { BccToolbar, BccButton },
		template: `
			<BccToolbar>
				<template #start>
					<BccButton label="New" icon="pi pi-plus" class="mr-2" />
					<BccButton label="Save" icon="pi pi-check" severity="secondary" class="mr-2" />
				</template>
				<template #end>
					<BccButton icon="pi pi-search" rounded class="mr-2" />
					<BccButton icon="pi pi-ellipsis-v" rounded severity="secondary" />
				</template>
			</BccToolbar>
		`,
	}),
};

export const WithTitle: Story = {
	render: () => ({
		components: { BccToolbar, BccButton },
		template: `
			<BccToolbar>
				<template #start>
					<span class="font-semibold text-lg">Toolbar title</span>
				</template>
				<template #end>
					<BccButton label="Action" icon="pi pi-check" />
				</template>
			</BccToolbar>
		`,
	}),
};
