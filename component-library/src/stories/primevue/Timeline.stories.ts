import type { Meta, StoryObj } from '@storybook/vue3';
import { BccTimeline } from '../../index';

const events = [
	{ status: 'Ordered', date: '15/10/2020 10:30' },
	{ status: 'Processing', date: '15/10/2020 14:00' },
	{ status: 'Shipped', date: '15/10/2020 16:15' },
	{ status: 'Delivered', date: '16/10/2020 10:00' },
];

const meta = {
	component: BccTimeline,
	title: 'PrimeVue/BccTimeline',
	argTypes: {
		align: { control: 'select', options: ['left', 'right', 'alternate'] },
		layout: { control: 'select', options: ['vertical', 'horizontal'] },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { BccTimeline },
		setup() {
			return { args, events };
		},
		template: `
			<BccTimeline :value="events" v-bind="args" class="w-full md:w-20rem">
				<template #content="slotProps">
					{{ slotProps.item.status }}
				</template>
			</BccTimeline>
		`,
	}),
};

export const WithOpposite: Story = {
	render: () => ({
		components: { BccTimeline },
		setup() {
			return { events };
		},
		template: `
			<BccTimeline :value="events" class="w-full md:w-20rem">
				<template #opposite="slotProps">
					<small class="text-surface-500">{{ slotProps.item.date }}</small>
				</template>
				<template #content="slotProps">
					{{ slotProps.item.status }}
				</template>
			</BccTimeline>
		`,
	}),
};

export const AlignRight: Story = {
	args: { align: 'right' },
	render: args => ({
		components: { BccTimeline },
		setup() {
			return { args, events };
		},
		template: `
			<BccTimeline :value="events" v-bind="args" class="w-full md:w-20rem">
				<template #content="slotProps">
					{{ slotProps.item.status }}
				</template>
			</BccTimeline>
		`,
	}),
};

export const AlignAlternate: Story = {
	args: { align: 'alternate' },
	render: args => ({
		components: { BccTimeline },
		setup() {
			return { args, events };
		},
		template: `
			<BccTimeline :value="events" v-bind="args" class="w-full md:w-20rem">
				<template #content="slotProps">
					{{ slotProps.item.status }}
				</template>
			</BccTimeline>
		`,
	}),
};

export const Horizontal: Story = {
	args: { layout: 'horizontal', align: 'top' },
	render: args => ({
		components: { BccTimeline },
		setup() {
			const years = ['2020', '2021', '2022', '2023'];
			return { args, years };
		},
		template: `
			<BccTimeline :value="years" v-bind="args" class="w-full">
				<template #content="slotProps">
					{{ slotProps.item }}
				</template>
			</BccTimeline>
		`,
	}),
};
