import type { Meta, StoryObj } from '@storybook/vue3';
import { PVSplitter, PVSplitterPanel } from '../../index';

const meta = {
	component: PVSplitter,
	title: 'PrimeVue/Splitter',
	tags: ['autodocs'],
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { PVSplitter, PVSplitterPanel },
		template: `
			<PVSplitter style="height: 18rem" class="mb-5">
				<PVSplitterPanel :size="25" :min-size="10">
					<div class="flex align-items-center justify-content-center h-full bg-surface-100 dark:bg-surface-800 p-4">
						Panel 1
					</div>
				</PVSplitterPanel>
				<PVSplitterPanel :size="75" :min-size="20">
					<div class="flex align-items-center justify-content-center h-full bg-surface-50 dark:bg-surface-900 p-4">
						Panel 2
					</div>
				</PVSplitterPanel>
			</PVSplitter>
		`,
	}),
};

export const Vertical: Story = {
	render: () => ({
		components: { PVSplitter, PVSplitterPanel },
		template: `
			<PVSplitter layout="vertical" style="height: 18rem">
				<PVSplitterPanel :size="25" :min-size="10">
					<div class="flex align-items-center justify-content-center h-full bg-surface-100 dark:bg-surface-800 p-4">
						Panel 1
					</div>
				</PVSplitterPanel>
				<PVSplitterPanel :size="75" :min-size="20">
					<div class="flex align-items-center justify-content-center h-full bg-surface-50 dark:bg-surface-900 p-4">
						Panel 2
					</div>
				</PVSplitterPanel>
			</PVSplitter>
		`,
	}),
};
