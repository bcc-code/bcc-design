import { BccButton, BccTopNavigation } from '@/index';
import { SearchIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import type { Component } from 'vue';

const TopNavigationComponent: Component = BccTopNavigation as Component;
const components = { BccTopNavigation, BccButton } as Record<string, Component>;

const meta: Meta = {
	component: TopNavigationComponent,
	title: 'Custom/Layouts/BccTopNavigation',
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
	parameters: {
		docs: {
			description: {
				story:
					'Basic usage of BccTopNavigation with title and optional subtitle. The `@back` event can be handled for navigation.',
			},
		},
	},
};

export const WithBackTitle: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Shows a back button with a custom label using the `backTitle` prop.',
			},
			source: {
				code: `<template>
					<BccTopNavigation title="Details" subtitle="Item information" back-title="Back" @back="() => {}" />
				</template>`,
			},
		},
	},
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
	parameters: {
		docs: {
			description: {
				story: 'Hides the back button using the `hideBack` prop.',
			},
			source: {
				code: `<template>
					<BccTopNavigation title="Dashboard" subtitle="Overview" hide-back />
				</template>`,
			},
		},
	},
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
	parameters: {
		docs: {
			description: {
				story: 'Demonstrates using the `right` slot to add a custom action button (e.g., search).',
			},
			source: {
				code: `<script setup lang="ts">
					import { BccTopNavigation } from '@bcc-code/component-library';
					import { SearchIcon } from '@bcc-code/icons-vue';
					</script>

					<template>
						<BccTopNavigation title="Search" hide-back>
							<template #right>
								<button type="button" class="p-2" aria-label="Search">
									<SearchIcon class="size-6" />
								</button>
							</template>
						</BccTopNavigation>
					</template>`,
			},
		},
	},
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
	parameters: {
		docs: {
			description: {
				story: 'Shows the white variant with padding and a surface background.',
			},
			source: {
				code: `<template>
						<div class="min-h-[200px] bg-surface-200 dark:bg-surface-800">
							<BccTopNavigation title="White style" subtitle="With default surface background and default text color" white padded @back="() => {}" />
						</div>
					</template>`,
			},
		},
	},
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
	parameters: {
		docs: {
			description: {
				story: 'Shows the transparent variant with a custom background.',
			},
			source: {
				code: `<template>
						<div class="min-h-[200px] bg-linear-to-b from-brand-800 to-surface-200 dark:to-surface-800 pt-20">
							<BccTopNavigation title="Transparent" subtitle="No background" transparent padded @back="() => {}" />
						</div>
					</template>`,
			},
		},
	},
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
	parameters: {
		docs: {
			description: {
				story: 'Aligns the title to the left using the `titleLeft` prop.',
			},
			source: {
				code: `<template>
						<BccTopNavigation title="Left-aligned title" subtitle="When titleLeft is true" hide-back title-left padded />
					</template>`,
			},
		},
	},
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
	parameters: {
		docs: {
			description: {
				story: 'Adds horizontal padding to the navigation bar.',
			},
			source: {
				code: `<template>
						<BccTopNavigation title="Padded bar" subtitle="With horizontal padding" padded @back="() => {}" />
					</template>`,
			},
		},
	},
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
	parameters: {
		docs: {
			description: {
				story: 'Customizes the title and subtitle using the `title` and `subtitle` slots.',
			},
			source: {
				code: `<template>
					<BccTopNavigation title="Slotted Title" subtitle="Slotted subtitle is here" @back="() => {}">
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
				</template>`,
			},
		},
	},
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
	parameters: {
		docs: {
			description: {
				story: 'Overrides only the subtitle using the `subtitle` slot.',
			},
			source: {
				code: `<template>
					<BccTopNavigation title="Normal Title" subtitle="Custom subtitle" @back="() => {}">
						<template #subtitle="{ subtitle }">
							<span class="text-default bg-elevation-surface-default rounded px-2 py-0.5 font-mono">
								{{ subtitle }} — via slot
							</span>
						</template>
					</BccTopNavigation>
				</template>`,
			},
		},
	},
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
			source: {
				code: `<template>
						<BccTopNavigation @back="() => {}">
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
					</template>`,
			},
		},
	},
};
