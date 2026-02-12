import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccButton, BccDialog } from '../../index';

const meta = {
	component: BccDialog,
	title: 'PrimeVue/BccDialog',
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
		components: { BccDialog, BccButton },
		setup() {
			const visible = ref((args as { visible?: boolean }).visible ?? true);
			return { args, visible };
		},
		template: `
			<div>
				<BccButton label="Show" @click="visible = true" />
				<BccDialog v-model:visible="visible" v-bind="args" header="Dialog Title" :style="{ width: '30rem' }">
					<p>Dialog content. Close with the header icon or the button below.</p>
					<template #footer>
						<BccButton label="Close" severity="secondary" @click="visible = false" />
					</template>
				</BccDialog>
			</div>
		`,
	}),
};

export const Modal: Story = {
	render: () => ({
		components: { BccDialog, BccButton },
		setup() {
			const visible = ref(false);
			return { visible };
		},
		template: `
			<div>
				<BccButton label="Open modal" @click="visible = true" />
				<BccDialog v-model:visible="visible" modal header="Modal Dialog" :style="{ width: '30rem' }">
					<p>This dialog blocks interaction with the rest of the page.</p>
					<template #footer>
						<BccButton label="Close" severity="secondary" @click="visible = false" />
					</template>
				</BccDialog>
			</div>
		`,
	}),
};
