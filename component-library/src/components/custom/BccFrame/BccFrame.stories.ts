import BccButton from '@/components/wrapped/BccButton.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BccFrame from './BccFrame.vue';

const meta: Meta<typeof BccFrame> = {
	component: BccFrame,
	title: 'Custom/BccFrame',
	argTypes: {
		shadow: { control: 'boolean', description: 'Shadow styling' },
		rounded: { control: 'boolean', description: 'Rounded styling' },
		raised: { control: 'boolean', description: 'Raised surface with shadow' },
		overlay: { control: 'boolean', description: 'Overlay surface styling' },
		sunken: { control: 'boolean', description: 'Sunken surface styling' },
		/* Flex options */
		center: { control: 'boolean', description: 'Center layout' },
		between: { control: 'boolean', description: 'Between layout' },
		left: { control: 'boolean', description: 'Content Left' },
		right: { control: 'boolean', description: 'Content Right' },
		top: { control: 'boolean', description: 'Content Top' },
		bottom: { control: 'boolean', description: 'Content Bottom' },
		stretch: { control: 'boolean', description: 'Content Stretch' },
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
		components: { BccFrame, BccButton },
		setup: () => ({ args }),
		template: `
			<BccFrame v-bind="args" class="p-4 gap-4">
				<h1>Default frame content</h1>
				<p>This is a default frame content</p>
				<BccButton label="Click me" />
			</BccFrame>
		`,
	}),
};

export const Sunken: Story = {
	args: {
		sunken: true,
	},
	render: args => ({
		components: { BccFrame },
		setup: () => ({ args }),
		template: `
			<BccFrame class="p-4">
				<BccFrame v-bind="args" class="p-4">
					Sunken frame
				</BccFrame>
			</BccFrame>
		`,
	}),
};

export const Raised: Story = {
	args: {
		raised: true,
		shadow: true,
		rounded: true,
	},
	render: args => ({
		components: { BccFrame },
		setup: () => ({ args }),
		template: `
			<BccFrame class="p-4">
				<BccFrame v-bind="args" class="p-4">
					Raised frame with shadow
				</BccFrame>
			</BccFrame>
		`,
	}),
};

export const Overlay: Story = {
	args: {
		shadow: true,
		rounded: true,
		overlay: true,
	},
	render: args => ({
		components: { BccFrame },
		setup: () => ({ args }),
		template: `
			<BccFrame v-bind="args" class="p-4">
				Overlay frame
			</BccFrame>
		`,
	}),
};

export const AllVariants: Story = {
	render: () => ({
		components: { BccFrame },
		template: `
			<div class="flex flex-col gap-6 max-w-md">
				<BccFrame class="p-4 flex flex-col gap-4">
					Default
					<BccFrame sunken class="p-4">
						Sunken
						<BccFrame raised class="p-4">
							Raised
						</BccFrame>
					</BccFrame>
					<BccFrame overlay shadow class="p-4">
						Overlay
					</BccFrame>
				</BccFrame>
			</div>
		`,
	}),
};
