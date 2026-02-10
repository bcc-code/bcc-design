import type { Meta, StoryObj } from '@storybook/vue3';
import { PVButton, PVSidebar } from '../../index';
import { ref } from 'vue';

const meta = {
	component: PVSidebar,
	title: 'PrimeVue/Sidebar',
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
		components: { PVSidebar, PVButton },
		setup() {
			const visible = ref(false);
			return { args, visible };
		},
		template: `
			<div>
				<Button label="Open" @click="visible = true" />
				<PVSidebar v-model:visible="visible" v-bind="args" header="Sidebar">
					<p>Sidebar content. Position: {{ args.position || 'left' }}.</p>
				</PVSidebar>
			</div>
		`,
	}),
};

export const Right: Story = {
	render: () => ({
		components: { PVSidebar, PVButton },
		setup() {
			const visible = ref(false);
			return { visible };
		},
		template: `
			<div>
				<Button label="Open right sidebar" @click="visible = true" />
				<PVSidebar v-model:visible="visible" position="right" header="Right Sidebar">
					<p>Content on the right.</p>
				</PVSidebar>
			</div>
		`,
	}),
};
