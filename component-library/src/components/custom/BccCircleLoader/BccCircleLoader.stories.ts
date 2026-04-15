import type { Meta, StoryObj } from '@storybook/vue3-vite';
import type { Component } from 'vue';
import { BccCircleLoader } from '../../../index';

const CircleLoaderComponent: Component = BccCircleLoader as unknown as Component;

const meta: Meta = {
	component: CircleLoaderComponent,
	title: 'Custom/BccCircleLoader',
	parameters: {
		docs: {
			description: {
				component:
					'Animated circular loader. Supports preset `size` values (sm, md, base, lg, xl, 2xl, 3xl) or any custom size class string.',
			},
		},
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'base', 'lg', 'xl', '2xl', '3xl'],
		},
		left: { control: 'boolean' },
		right: { control: 'boolean' },
		icon: { control: false },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		size: 'base',
	},
};

export const Sizes: Story = {
	render: () => ({
		components: { BccCircleLoader },
		template: `
			<div class="flex flex-wrap items-center gap-6">
				<div class="flex items-center gap-2"><BccCircleLoader size="sm" /><span class="text-sm text-surface-600 dark:text-surface-400">sm</span></div>
				<div class="flex items-center gap-2"><BccCircleLoader size="md" /><span class="text-sm text-surface-600 dark:text-surface-400">md</span></div>
				<div class="flex items-center gap-2"><BccCircleLoader size="base" /><span class="text-sm text-surface-600 dark:text-surface-400">base</span></div>
				<div class="flex items-center gap-2"><BccCircleLoader size="lg" /><span class="text-sm text-surface-600 dark:text-surface-400">lg</span></div>
				<div class="flex items-center gap-2"><BccCircleLoader size="xl" /><span class="text-sm text-surface-600 dark:text-surface-400">xl</span></div>
				<div class="flex items-center gap-2"><BccCircleLoader size="2xl" /><span class="text-sm text-surface-600 dark:text-surface-400">2xl</span></div>
				<div class="flex items-center gap-2"><BccCircleLoader size="3xl" /><span class="text-sm text-surface-600 dark:text-surface-400">3xl</span></div>
			</div>
		`,
	}),
};

export const WithSpacingHelpers: Story = {
	render: () => ({
		components: { BccCircleLoader },
		template: `
			<div class="flex flex-col gap-4">
				<div class="flex items-center">
					<BccCircleLoader left />
					<span>Loader with <code>left</code> spacing (adds <code>ml-4</code>)</span>
				</div>
				<div class="flex items-center">
					<span>Loader with <code>right</code> spacing (adds <code>mr-4</code>)</span>
					<BccCircleLoader right />
				</div>
			</div>
		`,
	}),
};
