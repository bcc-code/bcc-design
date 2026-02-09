import type { Meta, StoryObj } from '@storybook/vue3';
import BccCard from './BccCard.vue';

const meta: Meta<typeof BccCard> = {
	component: BccCard,
	title: 'Custom/BccCard',
	tags: ['autodocs'],
	argTypes: {
		title: { control: 'text' },
		elevated: { control: 'boolean' },
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Card title',
		elevated: false,
	},
	render: (args) => ({
		components: { BccCard },
		setup: () => ({ args }),
		template: `
			<BccCard v-bind="args">
				<p>Card content goes here.</p>
			</BccCard>
		`,
	}),
};

export const Elevated: Story = {
	args: {
		title: 'Elevated card',
		elevated: true,
	},
	render: (args) => ({
		components: { BccCard },
		setup: () => ({ args }),
		template: `
			<BccCard v-bind="args">
				<p>This card has a shadow.</p>
			</BccCard>
		`,
	}),
};
