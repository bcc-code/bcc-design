import { BlockIcon, CheckIcon, DoneAllIcon, ExclamationIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BccBadge from './BccBadge.vue';

const meta = {
	component: BccBadge,
	title: 'Other/BccBadge',
	argTypes: {
		value: {
			description:
				'Content to show: string, number, or Vue component (e.g. icon). Text longer than 1 character uses the text badge style.',
			control: 'text',
		},
		size: {
			description: 'Size of the badge',
			control: 'select',
			options: ['sm', 'md', 'lg', 'xl'],
		},
		bordered: {
			description: 'Show a border',
			control: 'boolean',
		},
		squared: {
			description: 'Use squared corners instead of circular',
			control: 'boolean',
		},
	},
} as Meta<typeof BccBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * A small badge to show an icon or a short value (e.g. count). Pass a string/number or an icon component as `value`.
 */
export const Default: Story = {
	args: {
		value: 5,
		size: 'md',
		bordered: false,
		squared: false,
	},
};

export const WithIcon: Story = {
	render: () => ({
		components: { BccBadge },
		setup: () => ({ CheckIcon }),
		template: `
			<div class="flex items-center gap-2">
				<BccBadge :value="CheckIcon" />
				<BccBadge :value="CheckIcon" size="sm" />
				<BccBadge :value="CheckIcon" size="lg" />
				<BccBadge :value="CheckIcon" size="xl" />
			</div>
		`,
	}),
};

export const WithText: Story = {
	render: () => ({
		components: { BccBadge },
		template: `
			<div class="flex items-center gap-2">
				<BccBadge :value="1" />
				<BccBadge :value="2" />
				<BccBadge :value="10" />
				<BccBadge :value="43" />
				<BccBadge value="4 / 10" />
			</div>
		`,
	}),
};

export const Sizes: Story = {
	render: () => ({
		components: { BccBadge },
		setup: () => ({ CheckIcon }),
		template: `
			<div class="flex items-center gap-2">
				<BccBadge :value="CheckIcon" size="sm" />
				<BccBadge :value="CheckIcon" size="md" />
				<BccBadge :value="CheckIcon" size="lg" />
				<BccBadge :value="CheckIcon" size="xl" />
			</div>
		`,
	}),
};

export const BorderedAndSquared: Story = {
	render: () => ({
		components: { BccBadge },
		setup: () => ({ CheckIcon, DoneAllIcon, ExclamationIcon, BlockIcon }),
		template: `
			<div class="flex items-center gap-2">
				<BccBadge :value="CheckIcon" bordered squared size="lg" />
				<BccBadge :value="DoneAllIcon" bordered squared size="lg" />
				<BccBadge :value="ExclamationIcon" bordered squared size="lg" />
				<BccBadge :value="BlockIcon" bordered squared size="lg" />
			</div>
		`,
	}),
};
