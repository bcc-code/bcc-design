import type { Meta, StoryObj } from '@storybook/vue3';
import BccFrame from './BccFrame.vue';

const meta: Meta<typeof BccFrame> = {
	component: BccFrame,
	title: 'Custom/BccFrame',
	argTypes: {
		raised: { control: 'boolean', description: 'Raised surface with shadow' },
		overlay: { control: 'boolean', description: 'Overlay surface styling' },
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		raised: false,
		overlay: false,
	},
	render: args => ({
		components: { BccFrame },
		setup: () => ({ args }),
		template: `
			<BccFrame v-bind="args">
				<div class="p-4">Default frame content</div>
			</BccFrame>
		`,
	}),
};

export const Raised: Story = {
	args: {
		raised: true,
		overlay: false,
	},
	render: args => ({
		components: { BccFrame },
		setup: () => ({ args }),
		template: `
			<BccFrame class="p-4">
				<BccFrame v-bind="args">
					<div class="p-4">Raised frame with shadow</div>
				</BccFrame>
			</BccFrame>
		`,
	}),
};

export const Overlay: Story = {
	args: {
		raised: false,
		overlay: true,
	},
	render: args => ({
		components: { BccFrame },
		setup: () => ({ args }),
		template: `
			<BccFrame v-bind="args">
				<div class="p-4">Overlay frame</div>
			</BccFrame>
		`,
	}),
};

export const AllVariants: Story = {
	render: () => ({
		components: { BccFrame },
		template: `
			<div class="flex flex-col gap-6 max-w-md">
				<BccFrame>
					<div class="p-4">Default</div>
				</BccFrame>
				<BccFrame raised>
					<div class="p-4">Raised</div>
				</BccFrame>
				<BccFrame overlay>
					<div class="p-4">Overlay</div>
				</BccFrame>
			</div>
		`,
	}),
};
