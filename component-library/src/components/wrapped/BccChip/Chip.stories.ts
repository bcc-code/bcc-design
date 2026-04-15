import { CheckIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import BccChip from './BccChip.vue';

const meta = {
	component: BccChip,
	title: 'Wrapped/BccChip',
	parameters: {
		docs: {
			description: {
				component:
					'Small element for labels, tags or input tokens. [Read more on PrimeVue →](https://primevue.org/chip/)',
			},
		},
	},
	argTypes: {
		removable: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { removable: false },
	render: args => ({
		components: { BccChip },
		setup() {
			return { args };
		},
		template: `
			<BccChip v-bind="args" label="Default chip" />
		`,
	}),
};

export const WithIcon: Story = {
	render: () => ({
		components: { BccChip, CheckIcon },
		setup() {
			return { CheckIcon };
		},
		template: `
			<BccChip label="With icon" :icon="CheckIcon" />
		`,
	}),
};

export const Removable: Story = {
	args: { removable: true },
	render: args => ({
		components: { BccChip },
		setup() {
			return { args };
		},
		template: `
			<BccChip label="Removable" v-bind="args" />
		`,
	}),
};

export const WithImage: Story = {
	render: () => ({
		components: { BccChip },
		template: `
			<BccChip label="Amy Elsner" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
		`,
	}),
};
