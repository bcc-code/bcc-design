import { BccRadioButtonGroup } from '@/index';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import BccRadioButton from './BccRadioButton.vue';

const meta = {
	component: BccRadioButton,
	title: 'Wrapped/BccRadioButton',
	parameters: {
		docs: {
			description: {
				component:
					'Single selection from a set of options. [Read more on PrimeVue →](https://primevue.org/radiobutton/)',
			},
		},
	},
	argTypes: {
		disabled: { control: 'boolean' },
		size: { control: 'select', options: ['small', 'default', 'large'] },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { BccRadioButton },
		setup() {
			const selected = ref('opt1');
			const options = [
				{ label: 'Option 1', value: 'opt1' },
				{ label: 'Option 2', labelLeft: true, value: 'opt2' },
				{ label: 'Option 3', value: 'opt3' },
			];
			return { args, selected, options };
		},
		template: `
			<div>
				<div class="col left gap-2">
					<BccRadioButton v-for="opt in options" :key="opt.value"
						v-model="selected" :input-id="opt.value" name="group" v-bind="{...args, ...opt}" />
				</div>
				<br />
				<p class="text-sm text-surface-500">Selected: {{ selected }}</p>
			</div>
		`,
	}),
};

export const Disabled: Story = {
	render: () => ({
		components: { BccRadioButton },
		template: `
			<div class="col left gap-2">
				<BccRadioButton defaultValue="2" :value="1" disabled label="Disabled option" />
				<BccRadioButton defaultValue="2" value="2" disabled label="Disabled option" />
			</div>
		`,
	}),
};

export const Sizes: Story = {
	render: () => ({
		components: { BccRadioButton },
		setup() {
			const selected = ref('md');
			return { selected };
		},
		template: `
			<div class="col left gap-2">
				<BccRadioButton value="sm" size="small" label="Small" v-model="selected" />
				<BccRadioButton value="md" size="default" label="Default" v-model="selected" />
				<BccRadioButton value="lg" size="large" label="Large" v-model="selected" />
			</div>
		`,
	}),
};

export const WithRadioButtonGroup: Story = {
	render: () => ({
		components: { BccRadioButton, BccRadioButtonGroup },
		setup() {
			const selected = ref('opt2');
			const options = [
				{ label: 'Apple', value: 'opt1' },
				{ label: 'Banana', value: 'opt2' },
				{ label: 'Cherry', value: 'opt3' },
			];
			return { selected, options };
		},
		template: `
			<BccRadioButtonGroup v-model="selected" name="fruits" class="flex flex-wrap gap-4">
				<BccRadioButton v-for="opt in options" :key="opt.value" :input-id="'group-rb-' + opt.value" :value="opt.value" :label="opt.label" />
			</BccRadioButtonGroup>
		`,
	}),
};

export const JustifyBetweenWithCustomSlot: Story = {
	render: () => ({
		components: { BccRadioButton },
		setup() {
			const selected = ref('left');
			return { selected };
		},
		template: `
			<div class="w-full max-w-xl">
				<BccRadioButton
					justify="between"
					v-model="selected"
					value="left"
					label="Left"
				>
					<template #default>
						<span>
							<strong>Left-aligned</strong>
							<br />
							<small class="text-xs text-neutral-500">Choose this for left</small>
						</span>
					</template>
				</BccRadioButton>
				<BccRadioButton
					justify="between"
					v-model="selected"
					value="right"
					label="Right"
				>
					<template #default>
						<span>
							<strong>Right-aligned</strong>
							<br />
							<small class="text-xs text-neutral-500">Choose this for right</small>
						</span>
					</template>
				</BccRadioButton>
			</div>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story: 'Demonstrates use of `justify="between"` and custom slot HTML with rich content.',
			},
			source: {
				code: `
<script setup>
import { ref } from 'vue';
import { BccRadioButton } from '../../../index';
const selected = ref('left');
</script>
<template>
	<div class="w-full max-w-xl">
		<BccRadioButton
			justify="between"
			v-model="selected"
			value="left"
			label="Left"
		>
			<span>
				<strong>Left-aligned</strong>
				<br />
				<small class="text-xs text-neutral-500">Choose this for left</small>
			</span>
		</BccRadioButton>
		<BccRadioButton
			justify="between"
			v-model="selected"
			value="right"
			label="Right"
		>
			<span>
				<strong>Right-aligned</strong>
				<br />
				<small class="text-xs text-neutral-500">Choose this for right</small>
			</span>
		</BccRadioButton>
	</div>
</template>
				`,
			},
		},
	},
};
