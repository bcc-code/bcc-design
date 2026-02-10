import type { Meta, StoryObj } from '@storybook/vue3';
import { PVTextarea } from '../../index';
import { ref } from 'vue';

const meta = {
	component: PVTextarea,
	title: 'PrimeVue/Textarea',
	tags: ['autodocs'],
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
		components: { PVTextarea },
		setup() {
			const value = ref('');
			return { args, value };
		},
		template: `
			<PVTextarea v-model="value" v-bind="args" placeholder="Enter text..." class="w-full" />
		`,
	}),
};

export const Disabled: Story = {
	args: { disabled: true },
	render: args => ({
		components: { PVTextarea },
		setup() {
			const value = ref('Disabled content');
			return { args, value };
		},
		template: `
			<PVTextarea v-model="value" v-bind="args" class="w-full" />
		`,
	}),
};
