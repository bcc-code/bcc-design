import type { Meta, StoryObj } from '@storybook/vue3';
import { PVProgressSpinner } from '../../index';

const meta = {
	component: PVProgressSpinner,
	title: 'PrimeVue/ProgressSpinner',
	tags: ['autodocs'],
	argTypes: {
		strokeWidth: { control: 'text' },
		animationDuration: { control: 'text' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { PVProgressSpinner },
		template: `
			<PVProgressSpinner />
		`,
	}),
};

export const CustomStyle: Story = {
	render: () => ({
		components: { PVProgressSpinner },
		template: `
			<PVProgressSpinner style="width: 50px; height: 50px" stroke-width="4" />
		`,
	}),
};
