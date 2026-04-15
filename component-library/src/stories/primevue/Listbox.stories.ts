import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { BccListbox } from '../../index';

const options = [
	{ name: 'New York', code: 'NY' },
	{ name: 'Rome', code: 'RM' },
	{ name: 'London', code: 'LDN' },
	{ name: 'Istanbul', code: 'IST' },
	{ name: 'Paris', code: 'PRS' },
];

const meta = {
	component: BccListbox,
	title: 'PrimeVue/BccListbox',
	parameters: {
		docs: {
			description: {
				component:
					'List component for single or multiple selection. [Read more on PrimeVue →](https://primevue.org/listbox/)',
			},
		},
	},
	argTypes: {
		disabled: { control: 'boolean' },
		filter: { control: 'boolean' },
		multiple: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { BccListbox },
		setup() {
			const selected = ref<(typeof options)[0] | null>(null);
			return { args, selected, options };
		},
		template: `
			<BccListbox v-model="selected" :options="options" option-label="name" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
	parameters: {
		docs: {
			source: {
				code: `
				<script setup>
					const options = [
						{ name: 'New York', code: 'NY' },
						{ name: 'Rome', code: 'RM' },
						{ name: 'London', code: 'LDN' },
						{ name: 'Istanbul', code: 'IST' },
						{ name: 'Paris', code: 'PRS' },
					];
					const selected = ref<(typeof options)[0] | null>(null);
				</script>
				<template>
					<BccListbox v-model="selected" :options="options" option-label="name" v-bind="args" class="w-full md:w-14rem" />
				</template>
			`,
			},
		},
	},
};

export const Multiple: Story = {
	args: { multiple: true },
	render: args => ({
		components: { BccListbox },
		setup() {
			const selected = ref<typeof options>([]);
			return { args, selected, options };
		},
		template: `
			<BccListbox v-model="selected" :options="options" option-label="name" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const WithFilter: Story = {
	args: { filter: true },
	render: args => ({
		components: { BccListbox },
		setup() {
			const selected = ref<(typeof options)[0] | null>(null);
			return { args, selected, options };
		},
		template: `
			<BccListbox v-model="selected" :options="options" option-label="name" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const WithCheckmark: Story = {
	args: {
		checkmark: true, // assuming BccListbox supports a prop to show checkmark
		multiple: true,
	},
	name: 'With Checkmark',
	render: args => ({
		components: { BccListbox },
		setup() {
			const selected = ref<(typeof options)[0] | null>(null);
			return { args, selected, options };
		},
		template: `
			<BccListbox
				v-model="selected"
				:options="options"
				option-label="name"
				v-bind="args"
				class="w-full md:w-14rem"
			/>
		`,
	}),
	parameters: {
		docs: {
			source: {
				code: `
<script setup>
	const options = [
		{ name: 'New York', code: 'NY' },
		{ name: 'Rome', code: 'RM' },
		{ name: 'London', code: 'LDN' },
		{ name: 'Istanbul', code: 'IST' },
		{ name: 'Paris', code: 'PRS' },
	];
	const selected = ref<(typeof options)[0] | null>(null);
</script>
<template>
	<BccListbox v-model="selected" :options="options" option-label="name" checkmark class="w-full md:w-14rem" />
</template>
				`,
			},
		},
	},
};

export const CustomOptionSlot: Story = {
	args: {},
	name: 'Custom Option Slot',
	render: args => ({
		components: { BccListbox },
		setup() {
			const selected = ref<(typeof options)[0] | null>(null);
			return { args, selected, options };
		},
		template: `
			<BccListbox
				v-model="selected"
				:options="options"
				option-label="name"
				v-bind="args"
				class="w-full md:w-14rem"
			>
				<template #option="{ option, index, selected }">
					<div class="flex items-center gap-2">
						<span>{{ index + 1 }}.</span>
						<strong>{{ option.name }}</strong>
						<span v-if="selected" style="color: var(--green-600)">✓</span>
						<em class="text-surface-400 ml-2">({{ option.code }})</em>
					</div>
				</template>
			</BccListbox>
		`,
	}),
	parameters: {
		docs: {
			source: {
				code: `
<script setup>
	const options = [
		{ name: 'New York', code: 'NY' },
		{ name: 'Rome', code: 'RM' },
		{ name: 'London', code: 'LDN' },
		{ name: 'Istanbul', code: 'IST' },
		{ name: 'Paris', code: 'PRS' },
	];
	const selected = ref<(typeof options)[0] | null>(null);
</script>
<template>
	<BccListbox v-model="selected" :options="options" option-label="name" class="w-full md:w-14rem">
		<template #option="{ option, index, selected }">
			<div class="flex items-center gap-2">
				<span>{{ index + 1 }}.</span>
				<strong>{{ option.name }}</strong>
				<span v-if="selected" style="color: var(--green-600)">✓</span>
				<em class="text-surface-400 ml-2">({{ option.code }})</em>
			</div>
		</template>
	</BccListbox>
</template>
				`,
			},
		},
	},
};
