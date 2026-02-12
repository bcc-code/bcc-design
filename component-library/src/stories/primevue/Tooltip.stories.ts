import type { Meta, StoryObj } from '@storybook/vue3';
import { BccButton } from '../../index';

/**
 * Tooltip is registered globally in Storybook (see preview.ts).
 * Use the v-tooltip directive: v-tooltip="'Text'" or v-tooltip.top, v-tooltip.bottom, etc.
 */
const meta = {
	component: BccButton,
	title: 'PrimeVue/BccTooltip',
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { BccButton },
		setup() {
			return {};
		},
		template: `
			<div>
				<BccButton v-tooltip.top="'Top tooltip'" label="Hover (top)" class="mr-2" />
				<BccButton v-tooltip.bottom="'Bottom tooltip'" label="Hover (bottom)" class="mr-2" />
				<BccButton v-tooltip.left="'Left tooltip'" label="Hover (left)" class="mr-2" />
				<BccButton v-tooltip.right="'Right tooltip'" label="Hover (right)" />
			</div>
		`,
	}),
};

export const WithComponent: Story = {
	render: () => ({
		components: { BccButton },
		setup() {
			return {};
		},
		template: `
			<div>
				<BccButton label="Show tooltip" v-tooltip="'Tooltip text'" />
			</div>
		`,
	}),
};
