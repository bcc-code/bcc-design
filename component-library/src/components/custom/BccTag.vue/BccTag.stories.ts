import { BCC_CONTEXT_LIST } from '@/contexts';
import { CheckCircleIcon, LabelIcon, TagIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BccTag from './BccTag.vue';

const meta: Meta<typeof BccTag> = {
	component: BccTag,
	title: 'Custom/BccTag',
	argTypes: {
		value: { control: 'text' },
		context: {
			control: 'select',
			options: BCC_CONTEXT_LIST,
		},
		rounded: { control: 'boolean' },
		iconRight: { control: 'boolean' },
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: 'Tag',
	},
};

export const WithValue: Story = {
	args: {
		value: 'Label text',
	},
};

export const WithLeftIcon: Story = {
	args: {
		icon: TagIcon,
		value: 'With icon',
	},
};

export const WithRightIcon: Story = {
	args: {
		iconRight: CheckCircleIcon,
		value: 'Success',
		context: 'success',
	},
};

export const Contexts: Story = {
	render: () => ({
		components: { BccTag, LabelIcon },
		setup() {
			return { LabelIcon };
		},
		template: `
			<div class="flex flex-wrap gap-2">
				<BccTag clickable context="brand-bolder" :icon="LabelIcon">Brand</BccTag>
				<BccTag clickable context="success">Success</BccTag>
				<BccTag clickable context="info">Info</BccTag>
				<BccTag clickable context="warning">Warn</BccTag>
				<BccTag clickable context="danger">Danger</BccTag>
				<BccTag clickable context="magenta-subtler">Other</BccTag>
			</div>
		`,
	}),
};

export const Rounded: Story = {
	args: {
		value: 'Rounded tag',
		rounded: true,
	},
};

export const Sizes: Story = {
	render: () => ({
		components: { BccTag },
		template: `
			<div class="flex flex-wrap gap-2">
				<BccTag size="sm">Small</BccTag>
				<BccTag size="md">Medium</BccTag>
				<BccTag size="lg">Large</BccTag>
			</div>
		`,
	}),
};

export const IconVariants: Story = {
	render: () => ({
		components: { BccTag, TagIcon, CheckCircleIcon, LabelIcon },
		setup() {
			return { TagIcon, CheckCircleIcon, LabelIcon };
		},
		template: `
			<div class="flex flex-wrap gap-2">
				<BccTag :icon="TagIcon">Tag icon left</BccTag>
				<BccTag :icon="LabelIcon" :icon-right="CheckCircleIcon">Icon right</BccTag>
				<BccTag :icon="LabelIcon" context="info">Label</BccTag>
			</div>
		`,
	}),
};
