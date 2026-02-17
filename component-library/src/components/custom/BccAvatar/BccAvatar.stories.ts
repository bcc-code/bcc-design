import { GroupsIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BccAvatar from './BccAvatar.vue';

const meta = {
	component: BccAvatar,
	title: 'Wrapped/BccAvatar',
	argTypes: {
		icon: { control: 'boolean' },
		shape: { control: 'select', options: ['circle', 'square'] },
		size: { control: 'select', options: ['normal', 'large', 'xlarge'] },
		gender: {
			control: 'select',
			options: ['male', 'female', 'M', 'F', 'unknown', 'U'],
			description:
				'BCC context styling: blue (male), purple (female), gray (unknown). Child overrides to teal/magenta.',
		},
		child: {
			control: 'boolean',
			description: 'Child variant; combines with gender for teal (male) or magenta (female).',
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof BccAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { label: 'AB' },
	render: args => ({
		components: { BccAvatar },
		setup() {
			return { args };
		},
		template: `<BccAvatar v-bind="args" />`,
	}),
};

export const Label: Story = {
	args: { label: 'AB' },
	render: args => ({
		components: { BccAvatar },
		setup() {
			return { args };
		},
		template: `<BccAvatar v-bind="args" />`,
	}),
};

export const Image: Story = {
	render: () => ({
		components: { BccAvatar },
		template: `
			<BccAvatar
				image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
				shape="circle"
			/>
		`,
	}),
};

export const Icon: Story = {
	render: () => ({
		components: { BccAvatar, GroupsIcon },
		setup() {
			return { GroupsIcon };
		},
		template: `
		<div class="flex flex-wrap gap-2">
			<BccAvatar :icon="GroupsIcon" shape="circle" />
			<BccAvatar :icon="true" />
		</div>
		`,
	}),
};

export const Sizes: Story = {
	render: () => ({
		components: { BccAvatar },
		template: `
			<div class="flex align-items-center gap-2">
				<BccAvatar label="S" size="normal" />
				<BccAvatar label="M" size="large" />
				<BccAvatar label="L" size="xlarge" />
			</div>
		`,
	}),
};

/** BCC extension: `gender` applies context colors (blue, purple, gray). */
export const Gender: Story = {
	render: () => ({
		components: { BccAvatar },
		template: `
			<div class="flex flex-wrap align-items-center gap-3">
				<div class="flex flex-column align-items-center gap-2">
					<BccAvatar label="M" gender="male" />
					<span class="text-sm">male</span>
				</div>
				<div class="flex flex-column align-items-center gap-2">
					<BccAvatar label="F" gender="female" />
					<span class="text-sm">female</span>
				</div>
				<div class="flex flex-column align-items-center gap-2">
					<BccAvatar label="?" gender="unknown" />
					<span class="text-sm">unknown</span>
				</div>
			</div>
		`,
	}),
};

/** BCC extension: `child` with gender uses teal (male) or magenta (female). */
export const Child: Story = {
	render: () => ({
		components: { BccAvatar },
		template: `
			<div class="flex flex-wrap align-items-center gap-3">
				<div class="flex flex-column align-items-center gap-2">
					<BccAvatar label="B" gender="male" :child="true" />
					<span class="text-sm">male + child</span>
				</div>
				<div class="flex flex-column align-items-center gap-2">
					<BccAvatar label="G" gender="female" :child="true" />
					<span class="text-sm">female + child</span>
				</div>
			</div>
		`,
	}),
};
