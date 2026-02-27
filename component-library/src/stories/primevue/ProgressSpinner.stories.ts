import type { Meta, StoryObj } from '@storybook/vue3';
import { BccProgressSpinner } from '../../index';

const meta = {
	component: BccProgressSpinner,
	title: 'PrimeVue/BccProgressSpinner',
	parameters: {
		docs: {
			description: {
				component:
					'Circular loading indicator. [Read more on PrimeVue →](https://primevue.org/progressspinner/)',
			},
		},
	},
	argTypes: {
		strokeWidth: { control: 'text' },
		animationDuration: { control: 'text' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { BccProgressSpinner },
		template: `
			<BccProgressSpinner />
		`,
	}),
};

export const CustomStyle: Story = {
	render: () => ({
		components: { BccProgressSpinner },
		template: `
			<BccProgressSpinner style="width: 50px; height: 50px" stroke-width="4" />
		`,
	}),
};
