import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import BccToggle from './BccToggle.vue';

const meta: Meta<typeof BccToggle> = {
	component: BccToggle,
	title: 'Custom/BccToggle',
	tags: ['autodocs'],
	argTypes: {
		modelValue: { control: 'boolean' },
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
		modelValue: false,
		disabled: false,
		loading: false,
		wasToggled: false,
		withIcon: true,
	},
	render: args => ({
		components: { BccToggle },
		setup() {
			const value = ref(args.modelValue);
			return { args, value };
		},
		template: '<BccToggle v-model="value" v-bind="args" />',
	}),
};

export const Loading: Story = {
	args: {
		modelValue: true,
		loading: true,
	},
	render: args => ({
		components: { BccToggle },
		setup() {
			const value = ref(args.modelValue);
			return { args, value };
		},
		template: '<BccToggle v-model="value" v-bind="args" />',
	}),
};

export const WasToggled: Story = {
	args: {
		modelValue: true,
		wasToggled: true,
	},
	render: args => ({
		components: { BccToggle },
		setup() {
			const value = ref(args.modelValue);
			return { args, value };
		},
		template: '<BccToggle v-model="value" v-bind="args" />',
	}),
};
