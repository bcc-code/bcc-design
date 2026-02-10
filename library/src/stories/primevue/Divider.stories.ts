import type { Meta, StoryObj } from '@storybook/vue3';
import { PVDivider } from '../../index';

const meta = {
	component: PVDivider,
	title: 'PrimeVue/Divider',
	tags: ['autodocs'],
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
		components: { PVDivider },
		setup() {
			return { args };
		},
		template: `
			<div>
				<p>Content above</p>
				<PVDivider v-bind="args" />
				<p>Content below</p>
			</div>
		`,
	}),
};

export const Vertical: Story = {
	render: () => ({
		components: { PVDivider },
		template: `
			<div class="flex align-items-center gap-2">
				<span>Item 1</span>
				<PVDivider layout="vertical" />
				<span>Item 2</span>
				<PVDivider layout="vertical" />
				<span>Item 3</span>
			</div>
		`,
	}),
};

export const WithContent: Story = {
	render: () => ({
		components: { PVDivider },
		template: `
			<div>
				<p>Content above</p>
				<PVDivider>
					<span class="text-sm text-surface-500">or</span>
				</PVDivider>
				<p>Content below</p>
			</div>
		`,
	}),
};
