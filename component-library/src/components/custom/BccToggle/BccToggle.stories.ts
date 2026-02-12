import type { Meta, StoryObj } from '@storybook/vue3';
import { expect, waitFor } from 'storybook/test';
import { ref } from 'vue';
import BccToggle from './BccToggle.vue';

const meta: Meta<typeof BccToggle> = {
	component: BccToggle,
	title: 'Wrapped/BccToggle',
	argTypes: {
		defaultValue: { control: 'boolean' },
		disabled: { control: 'boolean' },
		loading: { control: 'boolean' },
		wasToggled: { control: 'boolean' },
		withIcon: { control: 'boolean' },
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		defaultValue: false,
		disabled: false,
		loading: false,
		wasToggled: false,
		withIcon: true,
	},
	render: args => ({
		components: { BccToggle },
		setup() {
			const value = ref(args.defaultValue);
			return { args, value };
		},
		template: '<BccToggle v-model="value" v-bind="args" />',
	}),
	play: async ({ canvas, userEvent }) => {
		const toggle = canvas.getByRole('switch');

		expect(toggle).toHaveAttribute('aria-checked', 'false');

		await userEvent.click(toggle);
		await waitFor(() => {
			expect(toggle).toHaveAttribute('aria-checked', 'true');
		});

		await userEvent.click(toggle);
		await waitFor(() => {
			expect(toggle).toHaveAttribute('aria-checked', 'false');
		});
	},
};

export const Loading: Story = {
	args: {
		defaultValue: true,
		loading: true,
	},
	render: args => ({
		components: { BccToggle },
		setup() {
			const value = ref(args.defaultValue);
			return { args, value };
		},
		template: '<BccToggle v-model="value" v-bind="args" />',
	}),
};

export const WasToggled: Story = {
	args: {
		defaultValue: true,
		wasToggled: true,
	},
	render: args => ({
		components: { BccToggle },
		setup() {
			const value = ref(args.defaultValue);
			return { args, value };
		},
		template: '<BccToggle v-model="value" v-bind="args" />',
	}),
};

export const CustomContext: Story = {
	render: args => ({
		components: { BccToggle },
		setup() {
			const value = ref(args.defaultValue);
			const context = ref('blue');
			return { args, value, context };
		},
		template: `<div class="flex gap-4">
	<BccToggle v-model="value" v-bind="args" useCtx :class="value ? 'ctx-' + context + '-bolder' : 'ctx-' + context + '-subtler'" />
	<select v-model="context">
		<option value="blue" class="ctx-blue-bolder ctx-blue-subtler">Blue</option>
		<option value="green" class="ctx-green-bolder ctx-green-subtler">Green</option>
		<option value="red" class="ctx-red-bolder ctx-red-subtler">Red</option>
		<option value="yellow" class="ctx-yellow-bolder ctx-yellow-subtler">Yellow</option>
		<option value="purple" class="ctx-purple-bolder ctx-purple-subtler">Purple</option>
		<option value="orange" class="ctx-orange-bolder ctx-orange-subtler">Orange</option>
		<option value="magenta" class="ctx-magenta-bolder ctx-magenta-subtler">Magenta</option>
	</select>
</div>`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<BccToggle v-model="value" use-ctx :class="value ? 'ctx-blue-bolder' : 'ctx-blue-subtler'" />`,
			},
		},
	},
};
