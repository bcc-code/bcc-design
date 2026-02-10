import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { PVButton, PVDrawer } from '../../index';

const meta = {
	component: PVDrawer,
	title: 'PrimeVue/Drawer',
	tags: ['autodocs'],
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
		components: { PVDrawer, PVButton },
		setup() {
			const visible = ref(false);
			return { args, visible };
		},
		template: `
			<div>
				<Button label="Open" @click="visible = true" />
				<PVDrawer v-model:visible="visible" v-bind="args" header="Drawer">
					<p>Drawer content. Position: {{ args.position || 'left' }}.</p>
				</PVDrawer>
			</div>
		`,
	}),
};

export const Right: Story = {
	render: () => ({
		components: { PVDrawer, PVButton },
		setup() {
			const visible = ref(false);
			return { visible };
		},
		template: `
			<div>
				<Button label="Open right drawer" @click="visible = true" />
				<PVDrawer v-model:visible="visible" position="right" header="Right Drawer">
					<p>Content on the right.</p>
				</PVDrawer>
			</div>
		`,
	}),
};
