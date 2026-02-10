import type { Meta, StoryObj } from '@storybook/vue3';
import { PVFieldset } from '../../index';

const meta = {
	component: PVFieldset,
	title: 'PrimeVue/Fieldset',
	tags: ['autodocs'],
	argTypes: {
		toggleable: { control: 'boolean' },
		collapsed: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { PVFieldset },
		template: `
			<PVFieldset legend="Legend">
				<p class="m-0">Fieldset content. Group related form fields or content.</p>
			</PVFieldset>
		`,
	}),
};

export const Toggleable: Story = {
	args: { toggleable: true },
	render: args => ({
		components: { PVFieldset },
		setup() {
			return { args };
		},
		template: `
			<PVFieldset legend="Toggleable" v-bind="args">
				<p class="m-0">Click the legend to collapse or expand.</p>
			</PVFieldset>
		`,
	}),
};
