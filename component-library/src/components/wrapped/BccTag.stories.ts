import { CheckCircleIcon, LabelIcon, TagIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BccTag from './BccTag.vue';

const meta: Meta<typeof BccTag> = {
	component: BccTag,
	title: 'Wrapped/BccTag',
	argTypes: {
		value: { control: 'text' },
		severity: {
			control: 'select',
			options: ['secondary', 'success', 'info', 'warn', 'danger', 'contrast'],
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
		icon: CheckCircleIcon,
		iconRight: true,
		value: 'Success',
		severity: 'success',
	},
};

export const Severities: Story = {
	render: () => ({
		components: { BccTag, LabelIcon },
		setup() {
			return { LabelIcon };
		},
		template: `
			<div class="flex flex-wrap gap-2">
				<BccTag value="Secondary" severity="secondary" :icon="LabelIcon" />
				<BccTag value="Success" severity="success" />
				<BccTag value="Info" severity="info" />
				<BccTag value="Warn" severity="warn" />
				<BccTag value="Danger" severity="danger" />
				<BccTag value="Contrast" severity="contrast" />
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

export const IconVariants: Story = {
	render: () => ({
		components: { BccTag, TagIcon, CheckCircleIcon, LabelIcon },
		setup() {
			return { TagIcon, CheckCircleIcon, LabelIcon };
		},
		template: `
			<div class="flex flex-wrap gap-2">
				<BccTag value="Tag icon left" :icon="TagIcon" />
				<BccTag value="Icon right" :icon="CheckCircleIcon" icon-right />
				<BccTag value="Label" :icon="LabelIcon" severity="info" />
			</div>
		`,
	}),
};
