import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import BccCheckbox from './BccCheckbox.vue';

const meta = {
	component: BccCheckbox,
	title: 'Wrapped/BccCheckbox',
	parameters: {
		docs: {
			description: {
				component:
					'Checkbox for single or multiple selection. **Why wrapped:** Custom check/indeterminate icons from the design system, and built-in label with optional `labelLeft` placement. [Read more on PrimeVue →](https://primevue.org/checkbox/)',
			},
		},
	},
	argTypes: {
		disabled: { control: 'boolean' },
		indeterminate: { control: 'boolean' },
		label: { control: 'text' },
		labelLeft: { control: 'boolean' },
		size: { control: 'select', options: ['small', 'default', 'large'] },
	},
	args: {
		label: 'I agree',
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		disabled: false,
		indeterminate: false,
	},

	render: args => ({
		components: { BccCheckbox },
		setup() {
			const checked = ref(false);
			return { args, checked };
		},
		template: `
			<BccCheckbox v-model="checked" v-bind="args" input-id="cb1" />
		`,
	}),
};

export const Indeterminate: Story = {
	args: {
		indeterminate: true,
	},
};

export const MultipleOptions: Story = {
	render: () => ({
		components: { BccCheckbox },
		setup() {
			const checked = ref([]);
			return { checked };
		},
		template: `
			<div class="flex flex-col gap-8 max-w-xs">
				<BccCheckbox v-model="checked" value="Pizza" input-id="cb2" label="Pizza" />
				<BccCheckbox v-model="checked" value="Pasta" input-id="cb3" label="Pasta" />
				<BccCheckbox v-model="checked" value="Salad" input-id="cb4" label="Salad" />
				<BccCheckbox v-model="checked" value="Dessert" input-id="cb5" label="Dessert" />
				<BccCheckbox v-model="checked" value="Drink" input-id="cb6" label="Drink" />
				<BccCheckbox v-model="checked" value="Other" input-id="cb7" label="Other" />

				<br />

				You have selected: {{ checked.join(', ') }}
			</div>
		`,
	}),
};

export const Disabled: Story = {
	render: () => ({
		components: { BccCheckbox },
		setup() {
			const checked = ref([]);
			return { checked };
		},
		template: `
			<BccCheckbox v-model="checked" :value="true" disabled input-id="cb3" label="Disabled" />
		`,
	}),
};

export const Sizes: Story = {
	render: () => ({
		components: { BccCheckbox },
		template: `
			<div class="flex gap-8 max-w-xs">
				<BccCheckbox :value="true" size="small" input-id="cb4" label="Small" />
				<BccCheckbox :value="true" size="default" input-id="cb5" label="Default" />
				<BccCheckbox :value="true" size="large" input-id="cb6" label="Large" />
			</div>
		`,
	}),
};

export const JustifyBetweenWithCustomSlot: Story = {
	render: () => ({
		components: { BccCheckbox },
		setup() {
			const checked = ref(['left']);
			return { checked };
		},
		template: `
			<div class="w-full max-w-xl flex flex-col gap-2">
				<BccCheckbox
					justify="between"
					v-model="checked"
					value="left"
				>
					<span>
						<strong>Left-aligned</strong>
						<br />
						<small class="text-xs text-neutral-500">Choose this for left</small>
					</span>
				</BccCheckbox>
				<BccCheckbox
					justify="between"
					v-model="checked"
					value="right"
				>
					<span>
						<strong>Right-aligned</strong>
						<br />
						<small class="text-xs text-neutral-500">Choose this for right</small>
					</span>
				</BccCheckbox>
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
import { BccCheckbox } from '@bcc-code/component-library-vue';
const checked = ref(['left']);
</script>
<template>
	<div class="w-full max-w-xl flex flex-col gap-2">
		<BccCheckbox
			justify="between"
			v-model="checked"
			value="left"
		>
			<span>
				<strong>Left-aligned</strong>
				<br />
				<small class="text-xs text-neutral-500">Choose this for left</small>
			</span>
		</BccCheckbox>
		<BccCheckbox
			justify="between"
			v-model="checked"
			value="right"
		>
			<span>
				<strong>Right-aligned</strong>
				<br />
				<small class="text-xs text-neutral-500">Choose this for right</small>
			</span>
		</BccCheckbox>
	</div>
</template>
				`,
			},
		},
	},
};

export const LabelClass: Story = {
	render: () => ({
		components: { BccCheckbox },
		setup() {
			const checked = ref([]);
			return { checked };
		},
		template: `
			<div class="flex flex-col gap-4 max-w-md">
				<BccCheckbox
					v-model="checked"
					value="default"
					label="Default label class"
				/>
				<BccCheckbox
					v-model="checked"
					value="custom"
					label="Custom label class"
					labelClass="text-brand text-lg font-semibold"
				/>
			</div>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story: 'Applies custom typography and color styles to the built-in label via `labelClass`.',
			},
		},
	},
};
