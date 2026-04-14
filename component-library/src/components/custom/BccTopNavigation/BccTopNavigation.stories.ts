import { BccButton, BccTopNavigation } from '@/index';
import { SearchIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import type { Component } from 'vue';

const TopNavigationComponent: Component = BccTopNavigation as Component;
const components = { BccTopNavigation, BccButton } as Record<string, Component>;

const meta: Meta = {
	component: TopNavigationComponent,
	title: 'Custom/BccTopNavigation',
	parameters: {
		docs: {
			description: {
				component:
					'Top bar navigation with optional back button, title, subtitle, and left/right slots or components. Supports variants: padded, transparent, glass, fixed, titleLeft.',
			},
		},
	},
	argTypes: {
		title: { control: 'text' },
		subtitle: { control: 'text' },
		backTitle: { control: 'text' },
		hideBack: { control: 'boolean' },
		padded: { control: 'boolean' },
		transparent: { control: 'boolean' },
		white: { control: 'boolean' },
		fixed: { control: 'boolean' },
		titleLeft: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Page title',
		subtitle: 'Optional subtitle',
	},
	render: args => ({
		components,
		setup() {
			return { args };
		},
		template: `
			<BccTopNavigation v-bind="args" @back="() => {}" />
		`,
	}),
};

export const WithBackTitle: Story = {
	args: {
		title: 'Details',
		subtitle: 'Item information',
		backTitle: 'Back',
	},
	render: args => ({
		components,
		setup() {
			return { args };
		},
		template: `
			<BccTopNavigation v-bind="args" @back="() => {}" />
		`,
	}),
};

export const HideBack: Story = {
	args: {
		title: 'Dashboard',
		subtitle: 'Overview',
		hideBack: true,
	},
	render: args => ({
		components,
		setup() {
			return { args };
		},
		template: `
			<BccTopNavigation v-bind="args" />
		`,
	}),
};

export const WithRightAction: Story = {
	args: {
		title: 'Search',
		hideBack: true,
	},
	render: args => ({
		components: { ...components, SearchIcon },
		setup() {
			return { args };
		},
		template: `
			<BccTopNavigation v-bind="args">
				<template #right>
					<button type="button" class="p-2" aria-label="Search">
						<SearchIcon class="size-6" />
					</button>
				</template>
			</BccTopNavigation>
		`,
	}),
};

export const White: Story = {
	args: {
		title: 'White style',
		subtitle: 'With default surface background and default text color',
		white: true,
		padded: true,
	},
	render: args => ({
		components,
		setup() {
			return { args };
		},
		template: `
			<div class="min-h-[200px] bg-surface-200 dark:bg-surface-800">
				<BccTopNavigation v-bind="args" @back="() => {}" />
			</div>
		`,
	}),
};

export const Transparent: Story = {
	args: {
		title: 'Transparent',
		subtitle: 'No background',
		transparent: true,
		padded: true,
	},
	render: args => ({
		components,
		setup() {
			return { args };
		},
		template: `
			<div class="min-h-[200px] bg-linear-to-b from-brand-800 to-surface-200 dark:to-surface-800 pt-20">
				<BccTopNavigation v-bind="args" @back="() => {}" />
			</div>
		`,
	}),
};

export const TitleLeft: Story = {
	args: {
		title: 'Left-aligned title',
		subtitle: 'When titleLeft is true',
		hideBack: true,
		titleLeft: true,
		padded: true,
	},
	render: args => ({
		components,
		setup() {
			return { args };
		},
		template: `
			<BccTopNavigation v-bind="args" />
		`,
	}),
};

export const Padded: Story = {
	args: {
		title: 'Padded bar',
		subtitle: 'With horizontal padding',
		padded: true,
	},
	render: args => ({
		components,
		setup() {
			return { args };
		},
		template: `
			<BccTopNavigation v-bind="args" @back="() => {}" />
		`,
	}),
};

export const TitleAndSubtitleSlots: Story = {
	args: {
		title: 'Slotted Title',
		subtitle: 'Slotted subtitle is here',
	},
	render: args => ({
		components,
		setup() {
			return { args };
		},
		template: `
			<BccTopNavigation v-bind="args" @back="() => {}">
				<template #title="{ title }">
					<span class="text-brand-300 font-bold tracking-wider">
						⚡&nbsp;{{ title.toUpperCase() }}&nbsp;⚡
					</span>
				</template>
				<template #subtitle="{ subtitle }">
					<span class="italic text-brand-100">
						🔎 {{ subtitle }}
					</span>
				</template>
			</BccTopNavigation>
		`,
	}),
};

export const OnlySubtitleSlot: Story = {
	args: {
		title: 'Normal Title',
		subtitle: 'Custom subtitle',
	},
	render: args => ({
		components,
		setup() {
			return { args };
		},
		template: `
			<BccTopNavigation v-bind="args" @back="() => {}">
				<template #subtitle="{ subtitle }">
					<span class="text-default bg-elevation-surface-default rounded px-2 py-0.5 font-mono">
						{{ subtitle }} — via slot
					</span>
				</template>
			</BccTopNavigation>
		`,
	}),
};

export const OverrideAllViaDefaultSlot: Story = {
	args: {
		title: 'Should not appear',
		subtitle: 'Should not appear',
	},
	render: args => ({
		components,
		setup() {
			return { args };
		},
		template: `
			<BccTopNavigation v-bind="args" @back="() => {}">
				<template #default>
					<div class="flex items-center gap-4 px-6 py-3 bg-linear-to-r from-brand-800 to-brand-400 rounded shadow-lg w-full">
						<BccButton icon="back" size="sm" @click="() => {}">Go Back</BccButton>
						<div class="flex-1">
							<h2 class="text-white font-extrabold text-xl">⚡ All via default slot! ⚡</h2>
							<p class="text-brand-100 font-mono">This replaces the <strong>entire</strong> top navigation content via <code>&lt;template #default&gt;</code>.</p>
						</div>
						<BccButton icon="user" size="sm" />
					</div>
				</template>
			</BccTopNavigation>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story: 'Demonstrates overriding *all* layout/content in `<BccTopNavigation>` using the default slot.',
			},
		},
	},
};
