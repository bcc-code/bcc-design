import type { Meta, StoryObj } from '@storybook/vue3';
import { BccTab, BccTabList, BccTabPanel, BccTabPanels, BccTabs } from '../../index';

const meta = {
	component: BccTabs,
	title: 'PrimeVue/BccTabView',
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { BccTabs, BccTabList, BccTab, BccTabPanels, BccTabPanel },
		template: `
			<BccTabs>
				<BccTabList>
					<BccTab value="0">Tab 1</BccTab>
					<BccTab value="1">Tab 2</BccTab>
					<BccTab value="2">Tab 3</BccTab>
				</BccTabList>
				<BccTabPanels>
					<BccTabPanel value="0">
						<p class="m-0">Content for tab 1.</p>
					</BccTabPanel>
					<BccTabPanel value="1">
						<p class="m-0">Content for tab 2.</p>
					</BccTabPanel>
					<BccTabPanel value="2">
						<p class="m-0">Content for tab 3.</p>
					</BccTabPanel>
				</BccTabPanels>
			</BccTabs>
		`,
	}),
};
