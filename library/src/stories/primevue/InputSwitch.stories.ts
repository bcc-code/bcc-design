import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { PVToggleSwitch } from '../../index';

const meta = {
	component: PVToggleSwitch,
	title: 'PrimeVue/ToggleSwitch',
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { PVToggleSwitch },
		setup() {
			const checked = ref(false);
			return { args, checked };
		},
		template: `
			<div class="flex align-items-center gap-2">
				<PVToggleSwitch v-model="checked" v-bind="args" />
				<span>{{ checked ? 'On' : 'Off' }}</span>
			</div>
		`,
	}),
};

export const Checked: Story = {
	render: () => ({
		components: { PVToggleSwitch },
		setup() {
			const checked = ref(true);
			return { checked };
		},
		template: `
			<PVToggleSwitch v-model="checked" />
		`,
	}),
};

export const Disabled: Story = {
	render: () => ({
		components: { PVToggleSwitch },
		setup() {
			const checked = ref(false);
			return { checked };
		},
		template: `
			<PVToggleSwitch v-model="checked" disabled />
		`,
	}),
};
