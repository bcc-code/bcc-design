import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { BccPassword } from '../../index';

const meta = {
	component: BccPassword,
	title: 'PrimeVue/BccPassword',
	parameters: {
		docs: {
			description: {
				component:
					'Password input with optional visibility toggle. [Read more on PrimeVue →](https://primevue.org/password/)',
			},
		},
	},
	argTypes: {
		disabled: { control: 'boolean' },
		toggleMask: { control: 'boolean' },
		feedback: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { BccPassword },
		setup() {
			const value = ref('');
			return { args, value };
		},
		template: `
			<BccPassword v-model="value" v-bind="args" placeholder="Enter password" class="w-full md:w-14rem" />
		`,
	}),
};

export const WithFeedback: Story = {
	args: { feedback: true },
	render: args => ({
		components: { BccPassword },
		setup() {
			const value = ref('');
			return { args, value };
		},
		template: `
			<BccPassword v-model="value" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const Disabled: Story = {
	args: { disabled: true },
	render: args => ({
		components: { BccPassword },
		setup() {
			const value = ref('secret');
			return { args, value };
		},
		template: `
			<BccPassword v-model="value" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};
