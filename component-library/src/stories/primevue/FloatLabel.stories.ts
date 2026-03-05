import type { Meta, StoryObj } from '@storybook/vue3';
import type { Component } from 'vue';
import { ref } from 'vue';
import { BccFloatLabel, BccInput } from '../../index';

const FloatLabelComponent: Component = BccFloatLabel as Component;
const components = { BccFloatLabel, BccInput } as Record<string, Component>;

const meta: Meta = {
	component: FloatLabelComponent,
	title: 'PrimeVue/BccFloatLabel',
	parameters: {
		docs: {
			description: {
				component:
					'Visually integrates a label with its form element. Use the variant prop for label position: over (default), in, or on. [Read more on PrimeVue →](https://primevue.org/floatlabel/)',
			},
		},
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['over', 'on', 'in'],
			description: 'The variant of the float label',
			defaultValue: 'over',
		},
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		variant: 'over',
	},
	render: args => ({
		components,
		setup() {
			const value = ref('');
			return { args, value };
		},
		template: `
			<BccFloatLabel v-bind="args">
				<BccInput id="username" v-model="value" />
				<label for="username">Username</label>
			</BccFloatLabel>
		`,
	}),
};

export const Over: Story = {
	render: () => ({
		components,
		setup() {
			const value = ref('');
			return { value };
		},
		template: `
			<BccFloatLabel variant="over">
				<BccInput id="username-over" v-model="value" />
				<label for="username-over">Username</label>
			</BccFloatLabel>
		`,
	}),
};

export const In: Story = {
	render: () => ({
		components,
		setup() {
			const value = ref('');
			return { value };
		},
		template: `
			<BccFloatLabel variant="in">
				<BccInput id="username-in" v-model="value" />
				<label for="username-in">Username</label>
			</BccFloatLabel>
		`,
	}),
};

export const On: Story = {
	render: () => ({
		components,
		setup() {
			const value = ref('');
			return { value };
		},
		template: `
			<BccFloatLabel variant="on">
				<BccInput id="username-on" v-model="value" />
				<label for="username-on">Username</label>
			</BccFloatLabel>
		`,
	}),
};

export const Invalid: Story = {
	render: () => ({
		components,
		setup() {
			const value = ref('');
			return { value };
		},
		template: `
			<BccFloatLabel>
				<BccInput id="username-invalid" v-model="value" :invalid="!value" />
				<label for="username-invalid">Username</label>
			</BccFloatLabel>
		`,
	}),
};

export const Disabled: Story = {
	render: () => ({
		components,
		setup() {
			const value = ref('');
			return { value };
		},
		template: `
			<BccFloatLabel>
				<BccInput id="username-disabled" v-model="value" disabled />
				<label for="username-disabled">Username</label>
			</BccFloatLabel>
		`,
	}),
};
