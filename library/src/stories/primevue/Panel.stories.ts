import type { Meta, StoryObj } from '@storybook/vue3';
import { PVPanel } from '../../index';

const meta = {
	component: PVPanel,
	title: 'PrimeVue/Panel',
	tags: ['autodocs'],
	argTypes: {
		toggleable: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { PVPanel },
		template: `
			<PVPanel header="Panel Header">
				<p class="m-0">Panel content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			</PVPanel>
		`,
	}),
};

export const Toggleable: Story = {
	args: { toggleable: true },
	render: args => ({
		components: { PVPanel },
		setup() {
			return { args };
		},
		template: `
			<PVPanel header="Toggleable Panel" v-bind="args">
				<p class="m-0">Click the header to collapse or expand this panel.</p>
			</PVPanel>
		`,
	}),
};

export const WithFooter: Story = {
	render: () => ({
		components: { PVPanel },
		template: `
			<PVPanel header="Panel with footer">
				<p class="m-0">Panel content goes here.</p>
				<template #footer>
					<div class="flex gap-2 justify-end">
						<button class="p-button p-button-secondary p-button-sm">Cancel</button>
						<button class="p-button p-button-primary p-button-sm">Save</button>
					</div>
				</template>
			</PVPanel>
		`,
	}),
};
