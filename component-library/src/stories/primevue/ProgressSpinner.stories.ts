import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { BccProgressSpinner } from '../../index';

const meta = {
	component: BccProgressSpinner,
	title: 'PrimeVue/BccProgressSpinner',
	parameters: {
		docs: {
			description: {
				component: 'Circular loading indicator. [Read more on PrimeVue →](https://primevue.org/progressspinner/)',
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

export const Size4: Story = {
	parameters: {
		docs: {
			source: {
				code: '<BccProgressSpinner class="size-4" />',
			},
		},
	},
	render: () => ({
		components: { BccProgressSpinner },
		template: `
			<BccProgressSpinner class="size-4" />
		`,
	}),
};

export const Size5: Story = {
	parameters: {
		docs: {
			source: {
				code: '<BccProgressSpinner class="size-5" />',
			},
		},
	},
	render: () => ({
		components: { BccProgressSpinner },
		template: `
			<BccProgressSpinner class="size-5" />
		`,
	}),
};

export const Size6: Story = {
	parameters: {
		docs: {
			source: {
				code: '<BccProgressSpinner class="size-6" />',
			},
		},
	},
	render: () => ({
		components: { BccProgressSpinner },
		template: `
			<BccProgressSpinner class="size-6" />
		`,
	}),
};
