import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { BccButton, BccPopover } from '../../index';

const meta = {
	component: BccPopover,
	title: 'PrimeVue/BccPopover',
	parameters: {
		docs: {
			description: {
				component:
					'Overlay panel attached to a trigger element. [Read more on PrimeVue →](https://primevue.org/popover/)',
			},
		},
	},
	argTypes: {
		dismissable: { control: 'boolean' },
		closeOnEscape: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		dismissable: true,
		closeOnEscape: true,
	},
	render: args => ({
		components: { BccPopover, BccButton },
		setup() {
			const popover = ref<InstanceType<typeof BccPopover> | null>(null);
			const toggle = (event: Event) => {
				popover.value?.toggle(event);
			};
			return { args, popover, toggle };
		},
		template: `
			<div>
				<BccButton label="Toggle popover" @click="toggle" />
				<BccPopover ref="popover" v-bind="args">
					<div class="p-4 max-w-sm">
						<h4 class="font-semibold mb-2">Popover title</h4>
						<p class="text-surface-600 dark:text-surface-400 text-sm">
							Content shown in the overlay. Click outside or press Escape to close.
						</p>
					</div>
				</BccPopover>
			</div>
		`,
	}),
};

export const WithCustomContent: Story = {
	render: () => ({
		components: { BccPopover, BccButton },
		setup() {
			const popover = ref<InstanceType<typeof BccPopover> | null>(null);
			const toggle = (event: Event) => {
				popover.value?.toggle(event);
			};
			return { popover, toggle };
		},
		template: `
			<div>
				<BccButton label="Show details" @click="toggle" />
				<BccPopover ref="popover">
					<div class="p-4 space-y-3 min-w-64">
						<h4 class="font-semibold text-surface-900 dark:text-surface-100">Details</h4>
						<ul class="text-sm text-surface-600 dark:text-surface-400 space-y-1">
							<li>Item one</li>
							<li>Item two</li>
							<li>Item three</li>
						</ul>
						<BccButton label="Action" size="sm" />
					</div>
				</BccPopover>
			</div>
		`,
	}),
};
