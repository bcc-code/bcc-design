import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccButton, BccDialog } from '../../index';

const meta = {
	component: BccDialog,
	title: 'PrimeVue/BccDialog',
	parameters: {
		docs: {
			description: {
				component: 'Modal dialog for focused user interaction. [Read more on PrimeVue →](https://primevue.org/dialog/)',
			},
		},
	},
	argTypes: {
		modal: { control: 'boolean' },
		closable: { control: 'boolean' },
		header: { control: 'text' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		modal: false,
		closable: true,
		header: 'Dialog Title',
	},
	render: args => ({
		components: { BccDialog, BccButton },
		setup() {
			const active = ref(true);
			return { args, active };
		},
		template: `
			<div>
				<BccButton label="Show" @click="active = true" />
				<BccDialog v-model:visible="active" v-bind="args" :style="{ width: '30rem' }">
					<p>Dialog content. Close with the header icon or the button below.</p>
					<template #footer>
						<BccButton label="Close" severity="secondary" @click="active = false" />
					</template>
				</BccDialog>
			</div>
		`,
	}),
};

export const Modal: Story = {
	args: {
		modal: true,
	},
	render: () => ({
		components: { BccDialog, BccButton },
		setup() {
			const active = ref(false);
			return { active };
		},
		template: `
			<div>
				<BccButton label="Open modal" @click="active = true" />
				<BccDialog v-model:visible="active" modal header="Modal Dialog" :style="{ width: '30rem' }">
					<p>This dialog blocks interaction with the rest of the page.</p>
					<template #footer>
						<BccButton label="Close" severity="secondary" @click="active = false" />
					</template>
				</BccDialog>
			</div>
		`,
	}),
};
