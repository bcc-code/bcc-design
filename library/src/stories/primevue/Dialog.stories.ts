import type { Meta, StoryObj } from '@storybook/vue3';
import { PVButton, PVDialog } from '../../index';
import { ref } from 'vue';

const meta = {
	component: PVDialog,
	title: 'PrimeVue/Dialog',
	tags: ['autodocs'],
	argTypes: {
		visible: { control: 'boolean' },
		modal: { control: 'boolean' },
		closable: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		visible: true,
		modal: false,
		closable: true,
	},
	render: args => ({
		components: { PVDialog, PVButton },
		setup() {
			const visible = ref((args as { visible?: boolean }).visible ?? true);
			return { args, visible };
		},
		template: `
			<div>
				<PVButton label="Show" @click="visible = true" />
				<PVDialog v-model:visible="visible" v-bind="args" header="Dialog Title" :style="{ width: '30rem' }">
					<p>Dialog content. Close with the header icon or the button below.</p>
					<template #footer>
						<PVButton label="Close" severity="secondary" @click="visible = false" />
					</template>
				</PVDialog>
			</div>
		`,
	}),
};

export const Modal: Story = {
	render: () => ({
		components: { PVDialog, PVButton },
		setup() {
			const visible = ref(false);
			return { visible };
		},
		template: `
			<div>
				<PVButton label="Open modal" @click="visible = true" />
				<PVDialog v-model:visible="visible" modal header="Modal Dialog" :style="{ width: '30rem' }">
					<p>This dialog blocks interaction with the rest of the page.</p>
					<template #footer>
						<PVButton label="Close" severity="secondary" @click="visible = false" />
					</template>
				</PVDialog>
			</div>
		`,
	}),
};
