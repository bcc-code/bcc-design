import { GroupsIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { BccAvatarGroup, BccDivider, BccOverlayBadge } from '../../../index';
import BccAvatar from './BccAvatar.vue';

const meta = {
	component: BccAvatar,
	title: 'Wrapped/BccAvatar',
	parameters: {
		docs: {
			description: {
				component:
					'Avatar for user initials, image, or icon. **Why wrapped:** BCC-specific sizing (xs–xxl), gender/child context colors, squared variant, bordered option, and icon as Vue component (default person icon when no image). [Read more on PrimeVue →](https://primevue.org/avatar/)',
			},
		},
	},
	argTypes: {
		icon: { control: 'boolean' },
		squared: { control: 'boolean' },
		size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'] },
		gender: {
			control: 'select',
			options: ['male', 'female', 'unknown'],
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
		components: { BccAvatar, BccDivider },
		setup() {
			return { GroupsIcon };
		},
		template: `
			<div class="flex align-items-center gap-2">
				<BccAvatar label="xs" size="xs" />
				<BccAvatar label="sm" size="sm" />
				<BccAvatar label="md" size="md" />
				<BccAvatar label="lg" size="lg" />
				<BccAvatar label="xl" size="xl" />
				<BccAvatar label="2x" size="xxl" />
				<BccAvatar label="3x" size="xxxl" />
			</div>
			<BccDivider align="left">
				Squared
			</BccDivider>
			<div class="flex align-items-center gap-2">
				<BccAvatar label="xs" size="xs" squared />
				<BccAvatar label="sm" size="sm" squared />
				<BccAvatar label="md" size="md" squared />
				<BccAvatar label="lg" size="lg" squared />
				<BccAvatar label="xl" size="xl" squared />
				<BccAvatar label="2x" size="xxl" squared />
				<BccAvatar label="3x" size="xxxl" squared />
			</div>
			<BccDivider align="left">
				With icon
			</BccDivider>
			<div class="flex align-items-center gap-2">
				<BccAvatar size="xs" :icon="GroupsIcon" />
				<BccAvatar size="sm" :icon="GroupsIcon" />
				<BccAvatar size="md" :icon="GroupsIcon" />
				<BccAvatar size="lg" :icon="GroupsIcon" />
				<BccAvatar size="xl" :icon="GroupsIcon" />
				<BccAvatar size="xxl" :icon="GroupsIcon" />
				<BccAvatar size="xxxl" :icon="GroupsIcon" />
			</div>
			<BccDivider align="left">
				Squared with icon
			</BccDivider>
			<div class="flex align-items-center gap-2">
				<BccAvatar size="xs" :icon="GroupsIcon" squared />
				<BccAvatar size="sm" :icon="GroupsIcon" squared />
				<BccAvatar size="md" :icon="GroupsIcon" squared />
				<BccAvatar size="lg" :icon="GroupsIcon" squared />
				<BccAvatar size="xl" :icon="GroupsIcon" squared />
				<BccAvatar size="xxl" :icon="GroupsIcon" squared />
				<BccAvatar size="xxxl" :icon="GroupsIcon" squared />
			</div>
			<BccDivider align="left">
				With image
			</BccDivider>
			<div class="flex align-items-center gap-2">
				<BccAvatar size="xs" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
				<BccAvatar size="sm" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
				<BccAvatar size="md" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
				<BccAvatar size="lg" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
				<BccAvatar size="xl" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
				<BccAvatar size="xxl" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
				<BccAvatar size="xxxl" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
			</div>
			<BccDivider align="left">
				Squared with image
			</BccDivider>
			<div class="flex align-items-center gap-2">
				<BccAvatar size="xs" image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" squared />
				<BccAvatar size="sm" image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" squared />
				<BccAvatar size="md" image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" squared />
				<BccAvatar size="lg" image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" squared />
				<BccAvatar size="xl" image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" squared />
				<BccAvatar size="xxl" image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" squared />
				<BccAvatar size="xxxl" image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" squared />
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
					<BccAvatar label="B" gender="male" child />
					<span class="text-sm">male + child</span>
				</div>
				<div class="flex flex-column align-items-center gap-2">
					<BccAvatar label="G" gender="female" child />
					<span class="text-sm">female + child</span>
				</div>
			</div>
		`,
	}),
};

/** BCC extension: `bordered` adds a border to the avatar. */
export const Bordered: Story = {
	render: () => ({
		components: { BccAvatar },
		template: `<BccAvatar label="B" gender="female" child bordered size="large" shape="circle" />`,
	}),
};

/** Group of avatars using BccAvatarGroup (overlapping stack). */
export const AvatarGroup: Story = {
	render: () => ({
		components: { BccAvatar, BccAvatarGroup },
		template: `
			<BccAvatarGroup>
				<BccAvatar label="A" gender="male" />
				<BccAvatar label="B" gender="female" />
				<BccAvatar label="C" gender="unknown" />
				<BccAvatar label="+2" />
			</BccAvatarGroup>
		`,
	}),
};

export const WithBadge: Story = {
	args: { label: 'B', gender: 'female', child: true, size: 'xxl' },
	render: args => ({
		components: { BccAvatar, BccOverlayBadge },
		setup() {
			const sizeMap = {
				xs: 'small',
				sm: 'small',
				md: 'medium',
				lg: 'large',
				xl: 'large',
				xxl: 'xlarge',
				xxxl: 'xlarge',
			};
			return { args, sizeMap };
		},
		template: `
			<BccOverlayBadge value="3" :size="sizeMap[args.size]">
				<BccAvatar v-bind="args" />
			</BccOverlayBadge>
		`,
	}),
};
