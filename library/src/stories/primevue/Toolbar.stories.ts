import type { Meta, StoryObj } from '@storybook/vue3';
import { PVButton, PVToolbar } from '../../index';

const meta = {
	component: PVToolbar,
	title: 'PrimeVue/Toolbar',
	tags: ['autodocs'],
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { PVToolbar, PVButton },
		template: `
			<PVToolbar>
				<template #start>
					<PVButton label="New" icon="pi pi-plus" class="mr-2" />
					<PVButton label="Save" icon="pi pi-check" severity="secondary" class="mr-2" />
				</template>
				<template #end>
					<PVButton icon="pi pi-search" rounded class="mr-2" />
					<PVButton icon="pi pi-ellipsis-v" rounded severity="secondary" />
				</template>
			</PVToolbar>
		`,
	}),
};

export const WithTitle: Story = {
	render: () => ({
		components: { PVToolbar, PVButton },
		template: `
			<PVToolbar>
				<template #start>
					<span class="font-semibold text-lg">Toolbar title</span>
				</template>
				<template #end>
					<PVButton label="Action" icon="pi pi-check" />
				</template>
			</PVToolbar>
		`,
	}),
};
