import type { Meta, StoryObj } from '@storybook/vue3';
import { PVRating } from '../../index';
import { ref } from 'vue';

const meta = {
	component: PVRating,
	title: 'PrimeVue/Rating',
	tags: ['autodocs'],
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
		components: { PVRating },
		setup() {
			const value = ref(0);
			return { args, value };
		},
		template: `
			<PVRating v-model="value" v-bind="args" />
		`,
	}),
};

export const WithValue: Story = {
	render: () => ({
		components: { PVRating },
		setup() {
			const value = ref(4);
			return { value };
		},
		template: `
			<PVRating v-model="value" />
		`,
	}),
};

export const Readonly: Story = {
	args: { readonly: true },
	render: args => ({
		components: { PVRating },
		setup() {
			const value = ref(3);
			return { args, value };
		},
		template: `
			<PVRating v-model="value" v-bind="args" />
		`,
	}),
};

export const Disabled: Story = {
	args: { disabled: true },
	render: args => ({
		components: { PVRating },
		setup() {
			const value = ref(2);
			return { args, value };
		},
		template: `
			<PVRating v-model="value" v-bind="args" />
		`,
	}),
};
