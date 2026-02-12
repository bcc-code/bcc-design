import type { Meta, StoryObj } from '@storybook/vue3';
import { BccPanel } from '../../index';

const meta = {
	component: BccPanel,
	title: 'PrimeVue/BccPanel',
	argTypes: {
		toggleable: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { BccPanel },
		template: `
			<BccPanel header="Panel Header">
				<p class="m-0">Panel content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			</BccPanel>
		`,
	}),
};

export const Toggleable: Story = {
	args: { toggleable: true },
	render: args => ({
		components: { BccPanel },
		setup() {
			return { args };
		},
		template: `
			<BccPanel header="Toggleable Panel" v-bind="args">
				<p class="m-0">Click the header to collapse or expand this panel.</p>
			</BccPanel>
		`,
	}),
};

export const WithFooter: Story = {
	render: () => ({
		components: { BccPanel },
		template: `
			<BccPanel header="Panel with footer">
				<p class="m-0">Panel content goes here.</p>
				<template #footer>
					<div class="flex gap-2 justify-end">
						<button class="p-button p-button-secondary p-button-sm">Cancel</button>
						<button class="p-button p-button-primary p-button-sm">Save</button>
					</div>
				</template>
			</BccPanel>
		`,
	}),
};
