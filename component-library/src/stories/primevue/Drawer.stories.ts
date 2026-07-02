import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { BccButton, BccDrawer } from '../../index';

const meta = {
	component: BccDrawer,
	title: 'PrimeVue/BccDrawer',
	parameters: {
		docs: {
			description: {
				component: 'Side panel that slides in from an edge. [Read more on PrimeVue →](https://v4.primevue.org/drawer/)',
			},
		},
	},
	argTypes: {
		position: { control: 'select', options: ['left', 'right', 'top', 'bottom', 'full'] },
		modal: { control: 'boolean' },
		header: { control: 'text' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Left: Story = {
	args: { position: 'left', modal: true, header: 'Drawer' },
	render: args => ({
		components: { BccDrawer, BccButton },
		setup() {
			const visible = ref(false);
			return { args, visible };
		},
		template: `
			<div>
				<BccButton label="Open" @click="visible = true" :aria-controls="visible ? 'sbar' : null" :aria-expanded="visible" />
				<BccDrawer v-model:visible="visible" v-bind="args">
					<p>Drawer content. Position: {{ args.position || 'left' }}.</p>
				</BccDrawer>
			</div>
		`,
	}),
	parameters: {
		docs: {
			source: {
				code: `
				<template>
					<div>
						<BccButton label="Open" @click="visible = true" :aria-controls="visible ? 'sbar' : null" :aria-expanded="visible" />
						<BccDrawer v-model:visible="visible" :position :modal :header>
							<p>Drawer content. Position: {{ position }}.</p>
						</BccDrawer>
					</div>
				</template>`,
			},
		},
	},
};
