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
		maximizable: { control: 'boolean' },
		header: { control: 'text' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		modal: false,
		closable: true,
		maximizable: false,
		header: 'Dialog Title',
	},
	render: args => ({
		components: { BccDialog, BccButton },
		setup() {
			const visible = ref(false);
			return { args, visible };
		},
		template: `
			<div>
				<BccButton label="Show" @click="visible = true" />
				<BccDialog v-model:visible="visible" v-bind="args">
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
	args: {
		modal: true,
	},
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
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ullamcorper lorem in egestas luctus. Vestibulum vel lacus vel nunc tincidunt molestie. Vivamus eget velit eu ipsum pellentesque efficitur vel accumsan purus. Mauris auctor velit eget auctor efficitur. Mauris ligula tortor, sodales sit amet arcu ut, sollicitudin rhoncus lorem. Phasellus dapibus sapien augue, at feugiat ligula aliquet eu. Integer eget nulla eu massa blandit finibus at et dui.</p>
					<template #footer>
						<BccButton label="Cancel" severity="secondary" @click="visible = false" />
						<BccButton label="Save" />
					</template>
				</BccDialog>
			</div>
		`,
	}),
};
