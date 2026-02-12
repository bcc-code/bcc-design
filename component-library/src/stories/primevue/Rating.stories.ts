import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccRating } from '../../index';

const meta = {
	component: BccRating,
	title: 'PrimeVue/BccRating',
	argTypes: {
		disabled: { control: 'boolean' },
		readonly: { control: 'boolean' },
		cancel: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { BccRating },
		setup() {
			const value = ref(0);
			return { args, value };
		},
		template: `
			<BccRating v-model="value" v-bind="args" />
		`,
	}),
};

export const WithValue: Story = {
	render: () => ({
		components: { BccRating },
		setup() {
			const value = ref(4);
			return { value };
		},
		template: `
			<BccRating v-model="value" />
		`,
	}),
};

export const Readonly: Story = {
	args: { readonly: true },
	render: args => ({
		components: { BccRating },
		setup() {
			const value = ref(3);
			return { args, value };
		},
		template: `
			<BccRating v-model="value" v-bind="args" />
		`,
	}),
};

export const Disabled: Story = {
	args: { disabled: true },
	render: args => ({
		components: { BccRating },
		setup() {
			const value = ref(2);
			return { args, value };
		},
		template: `
			<BccRating v-model="value" v-bind="args" />
		`,
	}),
};
