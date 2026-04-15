import { CheckIcon, CloseIcon, InfoIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { BccSelectButton } from '../../index';

const options = [
	{ label: 'Left', value: 'left' },
	{ label: 'Center', value: 'center' },
	{ label: 'Right', value: 'right' },
];

const meta = {
	component: BccSelectButton,
	title: 'Wrapped/BccSelectButton',
	parameters: {
		docs: {
			description: {
				component:
					'Button group for selecting one or more options. [Read more on PrimeVue →](https://primevue.org/selectbutton/)',
			},
		},
	},
	argTypes: {
		allowEmpty: { control: 'boolean' },
		disabled: { control: 'boolean' },
		multiple: { control: 'boolean' },
		invalid: { control: 'boolean' },
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
	parameters: {
		docs: {
			description: {
				component:
					'Button group for selecting one or more options. [Read more on PrimeVue →](https://primevue.org/selectbutton/)',
			},
			source: {
				code: `
					<script setup>
						const value = ref('left');
						const options = [
							{ label: 'Left', value: 'left' },
							{ label: 'Center', value: 'center' },
							{ label: 'Right', value: 'right' },
						];
					</script>
					<template>
						<BccSelectButton v-model="value" :options="options" 
							option-label="label" option-value="value"
						/>
					</template>
				`,
			},
		},
	},
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

export const invalid: Story = {
	args: { invalid: true },
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

export const WithIcons: Story = {
	render: () => ({
		components: { BccSelectButton },
		setup() {
			const value = ref('left');
			const options = [
				{ value: 'left', icon: CheckIcon },
				{ value: 'center', icon: CloseIcon },
				{ value: 'right', icon: InfoIcon },
			];
			return { value, options, CheckIcon, CloseIcon };
		},
		template: `
			<BccSelectButton v-model="value" :options="options" option-icon="icon" option-value="value" />
		`,
	}),
};

export const WithStringArrayOptions: Story = {
	render: () => ({
		components: { BccSelectButton },
		setup() {
			const value = ref('left');
			const options = ['left', 'center', 'right'];
			return { value, options };
		},
		template: `
			<BccSelectButton v-model="value" :options="options" />
		`,
	}),
};
