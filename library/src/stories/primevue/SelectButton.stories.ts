import type { Meta, StoryObj } from '@storybook/vue3';
import { PVSelectButton } from '../../index';
import { ref } from 'vue';

const options = [
	{ label: 'Left', value: 'left' },
	{ label: 'Center', value: 'center' },
	{ label: 'Right', value: 'right' },
];

const meta = {
	component: PVSelectButton,
	title: 'PrimeVue/SelectButton',
	tags: ['autodocs'],
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
		components: { PVSelectButton },
		setup() {
			const value = ref('left');
			return { args, value, options };
		},
		template: `
			<PVSelectButton v-model="value" :options="options" option-label="label" option-value="value" v-bind="args" />
		`,
	}),
};

export const Multiple: Story = {
	args: { multiple: true },
	render: args => ({
		components: { PVSelectButton },
		setup() {
			const value = ref<string[]>(['left']);
			return { args, value, options };
		},
		template: `
			<PVSelectButton v-model="value" :options="options" option-label="label" option-value="value" v-bind="args" />
		`,
	}),
};

export const Disabled: Story = {
	args: { disabled: true },
	render: args => ({
		components: { PVSelectButton },
		setup() {
			const value = ref('center');
			return { args, value, options };
		},
		template: `
			<PVSelectButton v-model="value" :options="options" option-label="label" option-value="value" v-bind="args" />
		`,
	}),
};
