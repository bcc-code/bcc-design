import type { Meta, StoryObj } from '@storybook/vue3';
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
