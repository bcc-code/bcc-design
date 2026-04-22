import { CalendarViewDayIcon, CheckIcon } from '@bcc-code/icons-vue';
import BccGraphic, { ratioClasses, roundingClasses } from './BccGraphic.vue';

import type { Meta, StoryObj } from '@storybook/vue3-vite';

const meta: Meta<typeof BccGraphic> = {
	title: 'Custom/BccGraphic',
	component: BccGraphic,
	tags: ['autodocs'],
	argTypes: {
		rounding: {
			options: Object.keys(roundingClasses),
			control: { type: 'radio' },
		},
		ratio: {
			description:
				"Aspect ratio as predefined key (ultraWide, wide, etc.) or custom format: '16/9' (ratio) or '75%' (percentage)",
			options: Object.keys(ratioClasses),
			control: { type: 'radio' },
		},
		grayscale: {
			description: 'Render the banner image in grayscale.',
			control: { type: 'boolean' },
		},
		highlight: {
			description: 'Render the banner image with a brightness of 150%.',
			control: { type: 'boolean' },
		},
	},
	args: {
		rounding: 'xl',
		ratio: 'wide',
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
	args: {
		bannerSrc: 'https://event.bcc.no/wp-content/uploads/2023/10/Background-7.png',
		logoSrc: 'https://event.bcc.no/wp-content/uploads/2023/11/BUK4_Logo-Main.svg',
		rounding: 'xl',
		ratio: 'wide',
	},
	render: args => ({
		components: { BccGraphic },
		setup() {
			return { args };
		},
		template: `
			<div class="flex flex-col gap-y-2">
				<BccGraphic v-bind="args" />
			</div>
		`,
	}),
	parameters: {
		docs: {
			source: {
				language: 'html',
				code: `
<BccGraphic
  bannerSrc="https://event.bcc.no/..."
  logoSrc="https://event.bcc.no/..."
  rounding="xl"
  ratio="wide"
/>
				`,
			},
		},
	},
};

/**
 * Without `bannerSrc` or `logoSrc`, the graphic shows the default brand gradient background.
 */
export const Default: Story = {
	render: () => ({
		components: { BccGraphic },
		template: `
			<BccGraphic />
		`,
	}),
};

/**
 * Use the corner slots (`topLeft`, `topRight`, `bottomLeft`, `bottomRight`) to place content on the graphic.
 */
export const WithCornerSlots: Story = {
	render: () => ({
		components: { BccGraphic, CalendarViewDayIcon, CheckIcon },
		template: `
			<BccGraphic
				bannerSrc="https://event.bcc.no/wp-content/uploads/2023/10/Background-7.png"
				logoSrc="https://event.bcc.no/wp-content/uploads/2023/11/BUK4_Logo-Main.svg"
			>
				<template #topRight>
					<CalendarViewDayIcon class="size-6 text-white drop-shadow-md" />
				</template>
				<template #topLeft>
					<div class="flex items-center justify-center gap-2 rounded-full bg-primary text-white">
						<CheckIcon class="size-5" />
						<p class="heading-xs">I can be anything</p>
					</div>
				</template>
				<template #bottomRight>
					<CheckIcon class="size-5 text-white drop-shadow-md" />
				</template>
				<template #bottomLeft>
					<CalendarViewDayIcon class="size-6 text-white drop-shadow-md" />
				</template>
			</BccGraphic>
		`,
	}),
};

/**
 * Link icon in the topRight corner slot.
 */
export const WithLinkIcon: Story = {
	render: () => ({
		components: { BccGraphic, CalendarViewDayIcon },
		template: `
			<BccGraphic
				bannerSrc="https://event.bcc.no/wp-content/uploads/2023/10/Background-7.png"
				logoSrc="https://event.bcc.no/wp-content/uploads/2023/11/BUK4_Logo-Main.svg"
			>
				<template #topRight>
					<CalendarViewDayIcon class="size-6 text-white drop-shadow-md" />
				</template>
			</BccGraphic>
		`,
	}),
};

/**
 * Checkmark in the topLeft corner slot to indicate a selected or checked state.
 */
export const WithCheckmark: Story = {
	render: () => ({
		components: { BccGraphic, CheckIcon },
		template: `
			<BccGraphic
				bannerSrc="https://event.bcc.no/wp-content/uploads/2023/10/Background-7.png"
			>
				<template #topLeft>
					<div class="flex size-8 items-center justify-center rounded-full bg-primary text-white">
						<CheckIcon class="size-5" />
					</div>
				</template>
			</BccGraphic>
		`,
	}),
};

/**
 * Predefined aspect ratios: ultraWide (21:9), wide (16:9), landscape (4:3), square (1:1), portrait (3:4).
 */
export const AspectRatios: Story = {
	render: () => ({
		components: { BccGraphic },
		setup() {
			return { ratioClasses };
		},
		template: `
			<div class="flex max-w-2xl flex-col gap-6">
				<div>
					<p class="mb-2 text-sm font-medium text-surface-500">Wide (16:9)</p>
					<BccGraphic
						ratio="wide"
						bannerSrc="https://event.bcc.no/wp-content/uploads/2023/10/Background-7.png"
					/>
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-surface-500">Square (1:1)</p>
					<BccGraphic
						ratio="square"
						bannerSrc="https://event.bcc.no/wp-content/uploads/2023/10/Background-7.png"
					/>
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-surface-500">Portrait (3:4)</p>
					<BccGraphic
						ratio="portrait"
						bannerSrc="https://event.bcc.no/wp-content/uploads/2023/10/Background-7.png"
					/>
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-surface-500">Custom ratio string (21/9)</p>
					<BccGraphic
						ratio="21/9"
						bannerSrc="https://event.bcc.no/wp-content/uploads/2023/10/Background-7.png"
					/>
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-surface-500">Custom ratio percentage (40%)</p>
					<BccGraphic
						ratio="40%"
						bannerSrc="https://event.bcc.no/wp-content/uploads/2023/10/Background-7.png"
					/>
				</div>
			</div>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story: `Predefined ratios: ${Object.keys(ratioClasses).join(', ')}. You can also pass custom values like "21/9" or "40%".`,
			},
		},
	},
};
