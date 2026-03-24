import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccDatePicker } from '../../index';

const meta = {
	component: BccDatePicker,
	title: 'PrimeVue/BccDatePicker',
	parameters: {
		docs: {
			description: {
				component:
					'Form component for date and time input. [Read more on PrimeVue →](https://primevue.org/datepicker/)',
			},
		},
	},
	argTypes: {
		showIcon: { control: 'boolean' },
		showButtonBar: { control: 'boolean' },
		dateFormat: { control: 'text' },
		disabled: { control: 'boolean' },
		showWeek: { control: 'boolean' },
		showTime: { control: 'boolean' },
		hourFormat: { control: 'select', options: ['12', '24'] },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { BccDatePicker },
		setup() {
			const date = ref<Date | null>(null);
			return { args, date };
		},
		template: `
			<BccDatePicker v-model="date" v-bind="args" />
		`,
	}),
};

export const WithIcon: Story = {
	args: { showIcon: true },
	render: args => ({
		components: { BccDatePicker },
		setup() {
			const date = ref<Date | null>(null);
			return { args, date };
		},
		template: `
			<BccDatePicker v-model="date" v-bind="args" />
		`,
	}),
};

export const WithTime: Story = {
	render: () => ({
		components: { BccDatePicker },
		setup() {
			const date = ref<Date | null>(null);
			return { date };
		},
		template: `
			<BccDatePicker v-model="date" show-time />
		`,
	}),
	parameters: {
		docs: {
			description: {
				story: 'Show time picker with 24-hour format.',
			},
			source: {
				code: `<script setup>
				const date = ref<Date | null>(null);
				</script>
				
				<template>
					<BccDatePicker v-model="date" show-time />
				</template>`,
			},
		},
	},
};

export const Disabled: Story = {
	args: { disabled: true },
	render: args => ({
		components: { BccDatePicker },
		setup() {
			const date = ref<Date | null>(new Date());
			return { args, date };
		},
		template: `
			<BccDatePicker v-model="date" v-bind="args" />
		`,
	}),
};

export const Inline: Story = {
	args: { inline: true },
	render: args => ({
		components: { BccDatePicker },
		setup() {
			const date = ref<Date | null>(null);
			return { args, date };
		},
		template: `
			<BccDatePicker v-model="date" v-bind="args" />
		`,
	}),
};
