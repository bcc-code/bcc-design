import { BCC_CONTEXT_LIST } from '@/contexts';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import BccCapacityIndicator from './BccCapacityIndicator.vue';

const meta: Meta<typeof BccCapacityIndicator> = {
	component: BccCapacityIndicator,
	title: 'Custom/BccCapacityIndicator',
	argTypes: {
		total: { control: 'number' },
		used: { control: 'number' },
		size: { control: 'select', options: ['xs', 'sm', 'base', 'lg'] },
		animationDuration: { control: 'number' },
		squared: { control: 'boolean' },
		colored: { control: 'boolean' },
		context: { control: 'select', options: BCC_CONTEXT_LIST.filter(ctx => ctx.includes('-subtle')) },
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
		colored: false,
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
		<BccCapacityIndicator colored :total="12" :used="1" />
		<BccCapacityIndicator colored :total="12" :used="6" />
		<BccCapacityIndicator colored :total="12" :used="12" />
		<BccCapacityIndicator colored :total="-1" :used="12" />
	</div>
		`,
	}),
};

export const WithContext: Story = {
	render: () => ({
		components: { BccCapacityIndicator },
		setup() {
			const value = ref(false);
			const context = ref('blue');
			return { context, value };
		},
		template: `<div class="flex gap-4">
	<BccCapacityIndicator @click="value = !value" :context="value ? context + '-bolder' : context + '-subtler'" :total="100" :used="70" />
	<select v-model="context">
		<option value="blue">Blue</option>
		<option value="green">Green</option>
		<option value="red">Red</option>
		<option value="yellow">Yellow</option>
		<option value="purple">Purple</option>
		<option value="orange">Orange</option>
		<option value="magenta">Magenta</option>
	</select>
</div>`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<BccButton v-model="value" use-ctx :class="value ? 'ctx-blue-bolder' : 'ctx-blue-subtler'" />`,
			},
		},
	},
};
