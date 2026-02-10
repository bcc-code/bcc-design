import type { Meta, StoryObj } from '@storybook/vue3';
import { PVTab, PVTabList, PVTabPanel, PVTabPanels, PVTabs } from '../../index';

const meta = {
	component: PVTabs,
	title: 'PrimeVue/TabView',
	tags: ['autodocs'],
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { PVTabs, PVTabList, PVTab, PVTabPanels, PVTabPanel },
		template: `
			<PVTabs>
				<PVTabList>
					<PVTab value="0">Tab 1</PVTab>
					<PVTab value="1">Tab 2</PVTab>
					<PVTab value="2">Tab 3</PVTab>
				</PVTabList>
				<PVTabPanels>
					<PVTabPanel value="0">
						<p class="m-0">Content for tab 1.</p>
					</PVTabPanel>
					<PVTabPanel value="1">
						<p class="m-0">Content for tab 2.</p>
					</PVTabPanel>
					<PVTabPanel value="2">
						<p class="m-0">Content for tab 3.</p>
					</PVTabPanel>
				</PVTabPanels>
			</PVTabs>
		`,
	}),
};
