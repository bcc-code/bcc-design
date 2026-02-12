import { CalendarViewDayIcon, CheckIcon } from '@bcc-code/icons-vue';
import BccGraphic, { ratioClasses, roundingClasses } from './BccGraphic.vue';

import type { Meta, StoryFn } from '@storybook/vue3';

export default {
	title: 'Custom/BccGraphic',
	component: BccGraphic,
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
			control: { type: 'boolean' },
		},
	},
} as Meta<typeof BccGraphic>;

const Template: StoryFn<typeof BccGraphic> = args => ({
	components: { BccGraphic },
	setup() {
		return { args };
	},
	template: `
		<div class="flex flex-col gap-y-2">
			<BccGraphic v-bind="args" />
		</div>
	`,
});

export const Example = Template.bind({});
Example.args = {
	bannerSrc: 'https://event.bcc.no/wp-content/uploads/2023/10/Background-7.png?cache-bust=' + Date.now(),
	logoSrc: 'https://event.bcc.no/wp-content/uploads/2023/11/BUK4_Logo-Main.svg?cache-bust=' + Date.now(),
	rounding: 'xl',
	ratio: 'wide',
};
Example.parameters = {
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
};

/**
 * Without `bannerSrc` or `logoSrc`, the graphic shows the default brand gradient background.
 */
export const Default: StoryFn<typeof BccGraphic> = () => ({
	components: { BccGraphic },
	template: `
		<BccGraphic />
	`,
});

/**
 * Use the corner slots (`top-left`, `top-right`, `bottom-left`, `bottom-right`) to place content on the graphic.
 */
export const WithCornerSlots: StoryFn<typeof BccGraphic> = () => ({
	components: { BccGraphic, CalendarViewDayIcon, CheckIcon },
	template: `
		<BccGraphic
			bannerSrc="https://event.bcc.no/wp-content/uploads/2023/10/Background-7.png"
			logoSrc="https://event.bcc.no/wp-content/uploads/2023/11/BUK4_Logo-Main.svg"
		>
			<template #top-right>
				<CalendarViewDayIcon class="size-6 text-white drop-shadow-md" />
			</template>
			<template #top-left>
				<div class="flex size-8 items-center justify-center rounded-full bg-primary text-white">
					<CheckIcon class="size-5" />
				</div>
			</template>
		</BccGraphic>
	`,
});

/**
 * Link icon in the top-right corner slot.
 */
export const WithLinkIcon: StoryFn<typeof BccGraphic> = () => ({
	components: { BccGraphic, CalendarViewDayIcon },
	template: `
		<BccGraphic
			bannerSrc="https://event.bcc.no/wp-content/uploads/2023/10/Background-7.png"
			logoSrc="https://event.bcc.no/wp-content/uploads/2023/11/BUK4_Logo-Main.svg"
		>
			<template #top-right>
				<CalendarViewDayIcon class="size-6 text-white drop-shadow-md" />
			</template>
		</BccGraphic>
	`,
});

/**
 * Checkmark in the top-left corner slot to indicate a selected or checked state.
 */
export const WithCheckmark: StoryFn<typeof BccGraphic> = () => ({
	components: { BccGraphic, CheckIcon },
	template: `
		<BccGraphic
			bannerSrc="https://event.bcc.no/wp-content/uploads/2023/10/Background-7.png"
		>
			<template #top-left>
				<div class="flex size-8 items-center justify-center rounded-full bg-primary text-white">
					<CheckIcon class="size-5" />
				</div>
			</template>
		</BccGraphic>
	`,
});

/**
 * Predefined aspect ratios: ultraWide (21:9), wide (16:9), landscape (4:3), square (1:1), portrait (3:4).
 */
export const AspectRatios: StoryFn<typeof BccGraphic> = () => ({
	components: { BccGraphic },
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
		</div>
	`,
});
