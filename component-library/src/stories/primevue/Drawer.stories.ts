import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccButton, BccDrawer } from '../../index';

const meta = {
	component: BccDrawer,
	title: 'PrimeVue/BccDrawer',
	argTypes: {
		position: { control: 'select', options: ['left', 'right', 'top', 'bottom'] },
		modal: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Left: Story = {
	args: { position: 'left' },
	render: args => ({
		components: { BccDrawer, BccButton },
		setup() {
			const visible = ref(false);
			return { args, visible };
		},
		template: `
			<div>
				<Button label="Open" @click="visible = true" />
				<BccDrawer v-model:visible="visible" v-bind="args" header="Drawer">
					<p>Drawer content. Position: {{ args.position || 'left' }}.</p>
				</BccDrawer>
			</div>
		`,
	}),
};

export const Right: Story = {
	render: () => ({
		components: { BccDrawer, BccButton },
		setup() {
			const visible = ref(false);
			return { visible };
		},
		template: `
			<div>
				<Button label="Open right drawer" @click="visible = true" />
				<BccDrawer v-model:visible="visible" position="right" header="Right Drawer">
					<p>Content on the right.</p>
				</BccDrawer>
			</div>
		`,
	}),
};
