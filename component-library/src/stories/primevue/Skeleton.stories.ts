import type { Meta, StoryObj } from '@storybook/vue3';
import { BccSkeleton } from '../../index';

const meta = {
	component: BccSkeleton,
	title: 'PrimeVue/BccSkeleton',
	argTypes: {
		shape: { control: 'select', options: ['rectangle', 'circle'] },
		size: { control: 'select', options: ['normal', 'large'] },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Rectangle: Story = {
	args: { shape: 'rectangle' },
	render: args => ({
		components: { BccSkeleton },
		setup() {
			return { args };
		},
		template: `
			<BccSkeleton v-bind="args" class="w-full" height="2rem" />
		`,
	}),
};

export const Circle: Story = {
	args: { shape: 'circle' },
	render: args => ({
		components: { BccSkeleton },
		setup() {
			return { args };
		},
		template: `
			<BccSkeleton v-bind="args" size="large" />
		`,
	}),
};

export const CardPlaceholder: Story = {
	render: () => ({
		components: { BccSkeleton },
		template: `
			<div class="border border-surface-200 dark:border-surface-700 rounded-lg p-4 w-20rem">
				<div class="flex align-items-center gap-2 mb-3">
					<BccSkeleton shape="circle" size="large" />
					<div class="flex-1">
						<BccSkeleton width="10rem" height="1rem" class="mb-2" />
						<BccSkeleton width="5rem" height="0.75rem" />
					</div>
				</div>
				<BccSkeleton width="100%" height="4rem" class="mb-2" />
				<BccSkeleton width="100%" height="4rem" />
			</div>
		`,
	}),
};
