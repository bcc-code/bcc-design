import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { BccDivider } from '../../index';

const meta = {
	component: BccDivider,
	title: 'PrimeVue/BccDivider',
	parameters: {
		docs: {
			description: {
				component:
					'Visual separator between content sections. [Read more on PrimeVue →](https://primevue.org/divider/)',
			},
		},
	},
	argTypes: {
		layout: { control: 'select', options: ['horizontal', 'vertical'] },
		type: { control: 'select', options: ['solid', 'dashed', 'dotted'] },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
	args: { layout: 'horizontal' },
	render: args => ({
		components: { BccDivider },
		setup() {
			return { args };
		},
		template: `
			<div>
				<p>Content above</p>
				<BccDivider v-bind="args" />
				<p>Content below</p>
			</div>
		`,
	}),
};

export const Vertical: Story = {
	render: () => ({
		components: { BccDivider },
		template: `
			<div class="flex align-items-center gap-2">
				<span>Item 1</span>
				<BccDivider layout="vertical" />
				<span>Item 2</span>
				<BccDivider layout="vertical" />
				<span>Item 3</span>
			</div>
		`,
	}),
};

export const WithContent: Story = {
	render: () => ({
		components: { BccDivider },
		template: `
			<div>
				<p>Content above</p>
				<BccDivider>
					<span class="text-sm text-surface-500">or</span>
				</BccDivider>
				<p>Content below</p>
			</div>
		`,
	}),
};
