import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccCheckbox } from './index';

const meta = {
	component: BccCheckbox,
	title: 'PrimeVue/BccCheckbox',
	argTypes: {
		disabled: { control: 'boolean' },
		indeterminate: { control: 'boolean' },
		label: { control: 'text' },
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
			<div class="flex flex-col gap-4 max-w-xs">
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
