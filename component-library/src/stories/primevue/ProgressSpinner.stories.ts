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
		strokeWidth: { control: 'text', description: 'Width of the stroke (e.g. `2` or `1rem`)' },
		animationDuration: { control: 'text', description: 'Duration of the animation in seconds (e.g. `2s`)' },
		fill: { control: 'color', description: 'Fill color of the spinner' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { BccProgressSpinner },
		setup() {
			return { args };
		},
		template: `
			<BccProgressSpinner v-bind="args" />
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
