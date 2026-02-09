import type { Meta, StoryObj } from '@storybook/vue3';
import BccCapacityIndicator from './BccCapacityIndicator.vue';

const meta: Meta<typeof BccCapacityIndicator> = {
	component: BccCapacityIndicator,
	title: 'Custom/BccCapacityIndicator',
	tags: ['autodocs'],
	argTypes: {
		total: { control: 'number' },
		used: { control: 'number' },
		size: { control: 'select', options: ['xs', 'sm', 'base', 'lg'] },
		animationDuration: { control: 'number' },
		squared: { control: 'boolean' },
		context: { control: 'select', options: ['default', 'colored'] },
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		total: 20,
		used: 14,
		size: 'base',
		animationDuration: 1000,
		squared: false,
		context: 'default',
	},
};

export const Sizes: Story = {
	render: () => ({
		components: { BccCapacityIndicator },
		template: `
			<div class="flex items-center gap-4">
				<BccCapacityIndicator :total="30" :used="7" size="sm" />
				<BccCapacityIndicator :total="30" :used="21" size="base" />
				<BccCapacityIndicator :total="30" :used="30" size="lg" />
			</div>
		`,
	}),
};

export const Squared: Story = {
	render: () => ({
		components: { BccCapacityIndicator },
		template: `
	<div class="flex items-center space-x-4">
		<BccCapacityIndicator squared :total="0" :used="0" />
		<BccCapacityIndicator size="sm" squared :total="12" :used="1" />
		<BccCapacityIndicator size="base" squared :total="12" :used="6" />
		<BccCapacityIndicator size="lg" squared :total="-1" :used="0" />
	</div>
		`,
	}),
};

export const Colored: Story = {
	render: () => ({
		components: { BccCapacityIndicator },
		template: `
	<div class="flex items-center space-x-4">
		<BccCapacityIndicator context="colored" :total="12" :used="1" />
		<BccCapacityIndicator context="colored" :total="12" :used="6" />
		<BccCapacityIndicator context="colored" :total="12" :used="12" />
		<BccCapacityIndicator context="colored" :total="-1" :used="12" />
	</div>
		`,
	}),
};
