import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccToggleSwitch } from '../../index';

const meta = {
	component: BccToggleSwitch,
	title: 'PrimeVue/BccToggleSwitch',
	argTypes: {
		disabled: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { BccToggleSwitch },
		setup() {
			const checked = ref(false);
			return { args, checked };
		},
		template: `
			<div class="flex align-items-center gap-2">
				<BccToggleSwitch v-model="checked" v-bind="args" />
				<span>{{ checked ? 'On' : 'Off' }}</span>
			</div>
		`,
	}),
};

export const Checked: Story = {
	render: () => ({
		components: { BccToggleSwitch },
		setup() {
			const checked = ref(true);
			return { checked };
		},
		template: `
			<BccToggleSwitch v-model="checked" />
		`,
	}),
};

export const Disabled: Story = {
	render: () => ({
		components: { BccToggleSwitch },
		setup() {
			const checked = ref(false);
			return { checked };
		},
		template: `
			<BccToggleSwitch v-model="checked" disabled />
		`,
	}),
};
