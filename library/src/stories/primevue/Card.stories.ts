import type { Meta, StoryObj } from '@storybook/vue3';
import { PVCard } from '../../index';

const meta = {
	component: PVCard,
	title: 'PrimeVue/Card',
	tags: ['autodocs'],
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { PVCard },
		template: `
			<PVCard>
				<template #title>Card Title</template>
				<template #subtitle>Subtitle</template>
				<template #content>
					<p>Card content goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</template>
				<template #footer>
					<div class="flex gap-2 justify-end">
						<button class="p-button p-button-secondary p-button-sm">Cancel</button>
						<button class="p-button p-button-primary p-button-sm">Save</button>
					</div>
				</template>
			</PVCard>
		`,
	}),
};

export const ContentOnly: Story = {
	render: () => ({
		components: { PVCard },
		template: `
			<PVCard>
				<template #content>
					<p class="m-0">Simple card with content only.</p>
				</template>
			</PVCard>
		`,
	}),
};
