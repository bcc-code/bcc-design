import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccTextarea } from '../../index';

const meta = {
	component: BccTextarea,
	title: 'PrimeVue/BccTextarea',
	argTypes: {
		disabled: { control: 'boolean' },
		rows: { control: { type: 'number' } },
		autoResize: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { rows: 5 },
	render: args => ({
		components: { BccTextarea },
		setup() {
			const value = ref('');
			return { args, value };
		},
		template: `
			<BccTextarea v-model="value" v-bind="args" placeholder="Enter text..." class="w-full" />
		`,
	}),
};

export const Disabled: Story = {
	args: { disabled: true },
	render: args => ({
		components: { BccTextarea },
		setup() {
			const value = ref('Disabled content');
			return { args, value };
		},
		template: `
			<BccTextarea v-model="value" v-bind="args" class="w-full" />
		`,
	}),
};
