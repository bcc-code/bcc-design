import type { Meta, StoryObj } from '@storybook/vue3';
import { PVCheckbox } from '../../index';
import { ref } from 'vue';

const meta = {
	component: PVCheckbox,
	title: 'PrimeVue/Checkbox',
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean' },
		indeterminate: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { PVCheckbox },
		setup() {
			const checked = ref([]);
			return { args, checked };
		},
		template: `
			<div class="flex align-items-center gap-2">
				<PVCheckbox v-model="checked" v-bind="args" :value="true" input-id="cb1" />
				<label for="cb1">I agree</label>
			</div>
		`,
	}),
};

export const Checked: Story = {
	render: () => ({
		components: { PVCheckbox },
		setup() {
			const checked = ref([true]);
			return { checked };
		},
		template: `
			<div class="flex align-items-center gap-2">
				<PVCheckbox v-model="checked" :value="true" id="cb2" />
				<label for="cb2">Checked by default</label>
			</div>
		`,
	}),
};

export const Disabled: Story = {
	render: () => ({
		components: { PVCheckbox },
		setup() {
			const checked = ref([]);
			return { checked };
		},
		template: `
			<div class="flex align-items-center gap-2">
				<PVCheckbox v-model="checked" :value="true" disabled input-id="cb3" />
				<label for="cb3">Disabled</label>
			</div>
		`,
	}),
};
