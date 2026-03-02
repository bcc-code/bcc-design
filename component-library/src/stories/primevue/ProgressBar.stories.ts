import type { Meta, StoryObj } from '@storybook/vue3';
import { BccProgressBar } from '../../index';

const meta = {
	component: BccProgressBar,
	title: 'PrimeVue/BccProgressBar',
	parameters: {
		docs: {
			description: {
				component: 'Progress indicator bar. [Read more on PrimeVue →](https://primevue.org/progressbar/)',
			},
		},
	},
	argTypes: {
		value: { control: { type: 'number', min: 0, max: 100 } },
		showValue: { control: 'boolean' },
		mode: { control: 'select', options: ['determinate', 'indeterminate'] },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { value: 50, showValue: true },
	render: args => ({
		components: { BccProgressBar },
		setup() {
			return { args };
		},
		template: `
			<BccProgressBar v-bind="args" />
		`,
	}),
};

export const Indeterminate: Story = {
	args: { mode: 'indeterminate' },
	render: args => ({
		components: { BccProgressBar },
		setup() {
			return { args };
		},
		template: `
			<BccProgressBar v-bind="args" />
		`,
	}),
};

export const NoValue: Story = {
	args: { value: 75, showValue: false },
	render: args => ({
		components: { BccProgressBar },
		setup() {
			return { args };
		},
		template: `
			<BccProgressBar v-bind="args" />
		`,
	}),
};

export const CustomHeight: Story = {
	args: { value: 50, showValue: false },
	render: args => ({
		components: { BccProgressBar },
		setup() {
			return { args };
		},
		template: `
		<div class="flex flex-col gap-1">
			<pre>class="h-1"</pre>
			<BccProgressBar v-bind="args" class="h-1 mb-4" />
			<pre>class="h-1.5"</pre>
			<BccProgressBar v-bind="args" class="h-1.5 mb-4" />
			<pre>class="h-2"</pre>
			<BccProgressBar v-bind="args" class="h-2 mb-4" />
			<pre>class="h-3"</pre>
			<BccProgressBar v-bind="args" class="h-3 mb-4" />
			<pre>class="h-4"</pre>
			<BccProgressBar v-bind="args" class="h-4 mb-4" />
		</div>
		`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<BccProgressBar :show-value="false" class="h-1.5" />`,
			},
		},
	},
};
