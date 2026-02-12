import type { Meta, StoryObj } from '@storybook/vue3';
import { BccFieldset } from '../../index';

const meta = {
	component: BccFieldset,
	title: 'PrimeVue/BccFieldset',
	argTypes: {
		toggleable: { control: 'boolean' },
		collapsed: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { BccFieldset },
		template: `
			<BccFieldset legend="Legend">
				<p class="m-0">Fieldset content. Group related form fields or content.</p>
			</BccFieldset>
		`,
	}),
};

export const Toggleable: Story = {
	args: { toggleable: true },
	render: args => ({
		components: { BccFieldset },
		setup() {
			return { args };
		},
		template: `
			<BccFieldset legend="Toggleable" v-bind="args">
				<p class="m-0">Click the legend to collapse or expand.</p>
			</BccFieldset>
		`,
	}),
};
