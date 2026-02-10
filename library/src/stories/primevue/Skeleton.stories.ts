import type { Meta, StoryObj } from '@storybook/vue3';
import { PVSkeleton } from '../../index';

const meta = {
	component: PVSkeleton,
	title: 'PrimeVue/Skeleton',
	tags: ['autodocs'],
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
		components: { PVSkeleton },
		setup() {
			return { args };
		},
		template: `
			<PVSkeleton v-bind="args" class="w-full" height="2rem" />
		`,
	}),
};

export const Circle: Story = {
	args: { shape: 'circle' },
	render: args => ({
		components: { PVSkeleton },
		setup() {
			return { args };
		},
		template: `
			<PVSkeleton v-bind="args" size="large" />
		`,
	}),
};

export const CardPlaceholder: Story = {
	render: () => ({
		components: { PVSkeleton },
		template: `
			<div class="border border-surface-200 dark:border-surface-700 rounded-lg p-4 w-20rem">
				<div class="flex align-items-center gap-2 mb-3">
					<PVSkeleton shape="circle" size="large" />
					<div class="flex-1">
						<PVSkeleton width="10rem" height="1rem" class="mb-2" />
						<PVSkeleton width="5rem" height="0.75rem" />
					</div>
				</div>
				<PVSkeleton width="100%" height="4rem" class="mb-2" />
				<PVSkeleton width="100%" height="4rem" />
			</div>
		`,
	}),
};
