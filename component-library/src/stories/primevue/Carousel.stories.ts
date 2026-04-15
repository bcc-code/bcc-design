import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { BccCarousel } from '../../index';
const meta = {
	component: BccCarousel,
	title: 'PrimeVue/BccCarousel',
	parameters: {
		docs: {
			description: {
				component:
					'Content slider with optional indicators and navigation. [Read more on PrimeVue →](https://primevue.org/carousel/)',
			},
		},
	},
} as Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const items = [
	{ id: 1, title: 'Slide 1', text: 'First slide content. Lorem ipsum dolor sit amet.' },
	{ id: 2, title: 'Slide 2', text: 'Second slide content. Consectetur adipiscing elit.' },
	{ id: 3, title: 'Slide 3', text: 'Third slide content. Sed do eiusmod tempor incididunt.' },
	{ id: 4, title: 'Slide 4', text: 'Fourth slide content. Ut labore et dolore magna aliqua.' },
	{ id: 5, title: 'Slide 5', text: 'Fifth slide content. Duis aute irure dolor in reprehenderit.' },
];
const responsiveOptions = [
	{ breakpoint: '1400px', numVisible: 3, numScroll: 1 },
	{ breakpoint: '768px', numVisible: 2, numScroll: 1 },
	{ breakpoint: '560px', numVisible: 1, numScroll: 1 },
];

export const Default: Story = {
	render: () => ({
		components: { BccCarousel },
		setup() {
			return { items, responsiveOptions };
		},
		template: `
			<BccCarousel :value="items" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions">
				<template #item="{ data }">
					<div class="border border-surface-200 dark:border-surface-700 rounded-lg m-2 p-4 bg-surface-0 dark:bg-surface-900">
						<div class="font-semibold mb-2">{{ data.title }}</div>
						<p class="m-0 text-surface-600 dark:text-surface-400 text-sm">{{ data.text }}</p>
					</div>
				</template>
			</BccCarousel>
		`,
	}),
};
export const Circular: Story = {
	render: () => ({
		components: { BccCarousel },
		setup() {
			return { items, responsiveOptions };
		},
		template: `
			<BccCarousel
				:value="items"
				:numVisible="3"
				:numScroll="1"
				:responsiveOptions="responsiveOptions"
				circular
				:autoplayInterval="3000"
			>
				<template #item="{ data }">
					<div class="border border-surface-200 dark:border-surface-700 rounded-lg m-2 p-4 bg-surface-0 dark:bg-surface-900">
						<div class="font-semibold mb-2">{{ data.title }}</div>
						<p class="m-0 text-surface-600 dark:text-surface-400 text-sm">{{ data.text }}</p>
					</div>
				</template>
			</BccCarousel>
		`,
	}),
};
export const Vertical: Story = {
	render: () => ({
		components: { BccCarousel },
		setup() {
			return { items, responsiveOptions };
		},
		template: `
			<BccCarousel
				:value="items"
				:numVisible="1"
				:numScroll="1"
				orientation="vertical"
				verticalViewPortHeight="330px"
				containerClass="flex items-center"
			>
				<template #item="{ data }">
					<div class="border border-surface-200 dark:border-surface-700 rounded-lg m-2 p-4 bg-surface-0 dark:bg-surface-900">
						<div class="font-semibold mb-2">{{ data.title }}</div>
						<p class="m-0 text-surface-600 dark:text-surface-400 text-sm">{{ data.text }}</p>
					</div>
				</template>
			</BccCarousel>
		`,
	}),
};
