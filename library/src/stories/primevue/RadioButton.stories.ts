import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { PVRadioButton } from '../../index';

const meta = {
	component: PVRadioButton,
	title: 'PrimeVue/RadioButton',
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { PVRadioButton },
		setup() {
			const selected = ref('opt1');
			const options = [
				{ name: 'Option 1', value: 'opt1' },
				{ name: 'Option 2', value: 'opt2' },
				{ name: 'Option 3', value: 'opt3' },
			];
			return { args, selected, options };
		},
		template: `
			<div>
				<div v-for="opt in options" :key="opt.value" class="flex align-items-center gap-2">
					<PVRadioButton v-model="selected" :input-id="opt.value" name="group" :value="opt.value" v-bind="args" />
					<label :for="opt.value">{{ opt.name }}</label>
				</div>
				<br />
				<p class="text-sm text-surface-500">Selected: {{ selected }}</p>
			</div>
		`,
	}),
};

export const Disabled: Story = {
	render: () => ({
		components: { PVRadioButton },
		setup() {
			const selected = ref('opt1');
			return { selected };
		},
		template: `
			<div class="flex align-items-center gap-2">
				<PVRadioButton v-model="selected" input-id="rb-disabled" name="dg" value="opt1" disabled />
				<label for="rb-disabled">Disabled option</label>
			</div>
		`,
	}),
};
