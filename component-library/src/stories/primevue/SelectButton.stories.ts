import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccSelectButton } from '../../index';

const options = [
	{ label: 'Left', value: 'left' },
	{ label: 'Center', value: 'center' },
	{ label: 'Right', value: 'right' },
];

const meta = {
	component: BccSelectButton,
	title: 'PrimeVue/BccSelectButton',
	argTypes: {
		allowEmpty: { control: 'boolean' },
		disabled: { control: 'boolean' },
		multiple: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { BccSelectButton },
		setup() {
			const value = ref('left');
			return { args, value, options };
		},
		template: `
			<BccSelectButton v-model="value" :options="options" option-label="label" option-value="value" v-bind="args" />
		`,
	}),
};

export const Multiple: Story = {
	args: { multiple: true },
	render: args => ({
		components: { BccSelectButton },
		setup() {
			const value = ref<string[]>(['left']);
			return { args, value, options };
		},
		template: `
			<BccSelectButton v-model="value" :options="options" option-label="label" option-value="value" v-bind="args" />
		`,
	}),
};

export const Disabled: Story = {
	args: { disabled: true },
	render: args => ({
		components: { BccSelectButton },
		setup() {
			const value = ref('center');
			return { args, value, options };
		},
		template: `
			<BccSelectButton v-model="value" :options="options" option-label="label" option-value="value" v-bind="args" />
		`,
	}),
};
