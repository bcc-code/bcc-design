import { BCC_CONTEXT_LIST } from '@/contexts';
import { CelebrationIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { BccButton } from '../../../index';
import BccCallout from './BccCallout.vue';

const meta = {
	component: BccCallout,
	title: 'Custom/BccCallout',
	parameters: {
		docs: {
			description: {
				component:
					'A callout component for highlighting important information with an optional colored bar, icon, title, body text, and action buttons.',
			},
		},
	},
	argTypes: {
		title: {
			control: 'text',
			description: 'Title text for the callout',
		},
		message: {
			control: 'text',
			description: 'Body/description text for the callout',
		},
		context: {
			control: 'select',
			options: BCC_CONTEXT_LIST,
			description: 'Design context (controls background and accent bar color)',
		},
		icon: {
			control: 'boolean',
			description: 'Whether to show the default context icon',
		},
		bordered: {
			control: 'boolean',
			description: 'Whether to show a border around the callout',
		},
	},
} satisfies Meta<typeof BccCallout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Callout Title',
		message: 'This is a callout message with some important information.',
		icon: true,
	},
};

export const Contexts: Story = {
	render: () => ({
		components: { BccCallout },
		template: `
			<div class="flex flex-col gap-4">
				<BccCallout
					context="info-subtlest"
					icon
					title="Info Callout"
					message="This is an informational message."
				/>
				<BccCallout
					context="success-subtlest"
					icon
					title="Success Callout"
					message="This is a success message."
				/>
				<BccCallout
					context="warning-subtlest"
					icon
					title="Warning Callout"
					message="This is a warning message."
				/>
				<BccCallout
					context="danger-subtlest"
					icon
					title="Error Callout"
					message="This is an error message."
				/>
			</div>
		`,
	}),
};

export const WithActions: Story = {
	render: () => ({
		components: { BccCallout, BccButton },
		template: `
			<BccCallout
				context="info-subtlest"
				icon
				title="Action Required"
				message="Please review the changes before continuing."
			>
				<template #actions>
					<BccButton label="Review" severity="info" size="small" />
					<BccButton label="Skip" severity="secondary" size="small" text />
				</template>
			</BccCallout>
		`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<template>
	<BccCallout
		context="info-subtlest"
		icon
		title="Action Required"
		message="Please review the changes before continuing."
	>
		<template #actions>
			<BccButton label="Review" severity="info" size="small" />
			<BccButton label="Skip" severity="secondary" size="small" text />
		</template>
	</BccCallout>
</template>`,
			},
		},
	},
};

export const CustomIcon: Story = {
	render: () => ({
		components: { BccCallout, CelebrationIcon },
		setup() {
			return { CelebrationIcon };
		},
		template: `
			<BccCallout
				context="neutral-subtler"
				:icon="CelebrationIcon"
				title="Celebration!"
				message="You've completed all tasks."
			/>
		`,
	}),
};

export const TitleOnly: Story = {
	args: {
		title: 'Important Information',
		icon: true,
		context: 'info-subtlest',
	},
};

export const MessageOnly: Story = {
	args: {
		message: 'This callout only has a message without a title.',
		icon: true,
		context: 'neutral-subtler',
	},
};

export const Bordered: Story = {
	render: () => ({
		components: { BccCallout },
		template: `
			<div class="flex flex-col gap-4">
				<BccCallout
					context="info-subtlest"
					icon
					bordered
					title="Bordered Callout"
					message="This callout has a border."
				/>
				<BccCallout
					context="success-subtlest"
					icon
					bordered
					title="Success with Border"
					message="Bordered success callout."
				/>
			</div>
		`,
	}),
};

export const WithSlots: Story = {
	render: () => ({
		components: { BccCallout, BccButton },
		template: `
			<BccCallout context="brand-subtler">
				<template #title>
					Custom <strong>Title</strong> with HTML
				</template>
				<template #default>
					<p>Custom message content with <em>rich formatting</em>.</p>
					<ul>
						<li>List item 1</li>
						<li>List item 2</li>
					</ul>
				</template>
				<template #actions>
					<BccButton label="Primary Action" size="small" />
					<BccButton label="Secondary" severity="secondary" size="small" outlined />
				</template>
			</BccCallout>
		`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<template>
	<BccCallout context="brand-subtler">
		<template #title>
			Custom <strong>Title</strong> with HTML
		</template>
		<template #default>
			<p>Custom message content with <em>rich formatting</em>.</p>
			<ul>
				<li>List item 1</li>
				<li>List item 2</li>
			</ul>
		</template>
		<template #actions>
			<BccButton label="Primary Action" size="small" />
			<BccButton label="Secondary" severity="secondary" size="small" outlined />
		</template>
	</BccCallout>
</template>`,
			},
		},
	},
};

export const BolderContexts: Story = {
	render: () => ({
		components: { BccCallout },
		template: `
			<div class="flex flex-col gap-4">
				<BccCallout
					context="info-bolder"
					icon
					title="Info Bolder"
					message="This uses the bolder info context."
				/>
				<BccCallout
					context="success-bolder"
					icon
					title="Success Bolder"
					message="This uses the bolder success context."
				/>
				<BccCallout
					context="warning-bolder"
					icon
					title="Warning Bolder"
					message="This uses the bolder warning context."
				/>
				<BccCallout
					context="danger-bolder"
					icon
					title="Danger Bolder"
					message="This uses the bolder danger context."
				/>
			</div>
		`,
	}),
};
