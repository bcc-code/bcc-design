import type { Meta, StoryObj } from '@storybook/vue3';
import { BccSplitter, BccSplitterPanel } from '../../index';

const meta = {
	component: BccSplitter,
	title: 'PrimeVue/BccSplitter',
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { BccSplitter, BccSplitterPanel },
		template: `
			<BccSplitter style="height: 18rem" class="mb-5">
				<BccSplitterPanel :size="25" :min-size="10">
					<div class="flex align-items-center justify-content-center h-full bg-surface-100 dark:bg-surface-800 p-4">
						Panel 1
					</div>
				</BccSplitterPanel>
				<BccSplitterPanel :size="75" :min-size="20">
					<div class="flex align-items-center justify-content-center h-full bg-surface-50 dark:bg-surface-900 p-4">
						Panel 2
					</div>
				</BccSplitterPanel>
			</BccSplitter>
		`,
	}),
};

export const Vertical: Story = {
	render: () => ({
		components: { BccSplitter, BccSplitterPanel },
		template: `
			<BccSplitter layout="vertical" style="height: 18rem">
				<BccSplitterPanel :size="25" :min-size="10">
					<div class="flex align-items-center justify-content-center h-full bg-surface-100 dark:bg-surface-800 p-4">
						Panel 1
					</div>
				</BccSplitterPanel>
				<BccSplitterPanel :size="75" :min-size="20">
					<div class="flex align-items-center justify-content-center h-full bg-surface-50 dark:bg-surface-900 p-4">
						Panel 2
					</div>
				</BccSplitterPanel>
			</BccSplitter>
		`,
	}),
};
