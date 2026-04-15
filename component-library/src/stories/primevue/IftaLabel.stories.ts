import type { Meta, StoryObj } from '@storybook/vue3-vite';
import type { Component } from 'vue';
import { ref } from 'vue';
import { BccIftaLabel, BccInput } from '../../index';

const IftaLabelComponent: Component = BccIftaLabel as Component;
const components = { BccIftaLabel, BccInput } as Record<string, Component>;

const meta: Meta = {
	component: IftaLabelComponent,
	title: 'PrimeVue/BccIftaLabel',
	parameters: {
		docs: {
			description: {
				component:
					'Creates infield top-aligned labels: wrap an input and its label so the label sits above the field. When the form element is invalid, the label is highlighted. [Read more on PrimeVue →](https://primevue.org/iftalabel/)',
			},
		},
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components,
		setup() {
			const value = ref('');
			return { value };
		},
		template: `
			<BccIftaLabel>
				<BccInput id="username" v-model="value" />
				<label for="username">Username</label>
			</BccIftaLabel>
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
			<BccIftaLabel>
				<BccInput id="username-invalid" v-model="value" :invalid="!value" />
				<label for="username-invalid">Username</label>
			</BccIftaLabel>
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
			<BccIftaLabel>
				<BccInput id="username-disabled" v-model="value" disabled />
				<label for="username-disabled">Username</label>
			</BccIftaLabel>
		`,
	}),
};
