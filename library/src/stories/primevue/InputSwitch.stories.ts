import type { Meta, StoryObj } from '@storybook/vue3';
import { PVInputSwitch } from '../../index';
import { ref } from 'vue';

const meta = {
	component: PVInputSwitch,
	title: 'PrimeVue/InputSwitch',
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { PVInputSwitch },
		setup() {
			const checked = ref(false);
			return { args, checked };
		},
		template: `
			<div class="flex align-items-center gap-2">
				<PVInputSwitch v-model="checked" v-bind="args" />
				<span>{{ checked ? 'On' : 'Off' }}</span>
			</div>
		`,
	}),
};

export const Checked: Story = {
	render: () => ({
		components: { PVInputSwitch },
		setup() {
			const checked = ref(true);
			return { checked };
		},
		template: `
			<PVInputSwitch v-model="checked" />
		`,
	}),
};

export const Disabled: Story = {
	render: () => ({
		components: { PVInputSwitch },
		setup() {
			const checked = ref(false);
			return { checked };
		},
		template: `
			<PVInputSwitch v-model="checked" disabled />
		`,
	}),
};
