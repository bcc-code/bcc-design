import { CelebrationIcon, InfoIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BccMessage from './BccMessage.vue';

const meta = {
	component: BccMessage,
	title: 'Wrapped/BccMessage',
	parameters: {
		docs: {
			description: {
				component:
					'Inline message or alert with severity styling. **Why wrapped:** Icons as Vue components (e.g. from `@bcc-code/icons-vue`), optional severity-based default icons, and `iconRight` support. [Read more on PrimeVue →](https://primevue.org/message/)',
			},
		},
	},
	argTypes: {
		severity: {
			control: 'select',
			options: ['success', 'info', 'warn', 'error', 'secondary', 'contrast'],
		},
		closable: { control: 'boolean' },
		icon: { control: 'boolean' },
		iconRight: { control: 'boolean' },
		title: { control: 'text' },
		message: { control: 'text' },
		size: { control: 'select', options: ['default', 'small', 'large'] },
	},
} satisfies Meta<typeof BccMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		severity: 'info',
		icon: true,
		title: 'Info message content.',
		message: 'Multiple lines of text are also supported',
	},
	render: args => ({
		components: { BccMessage },
		setup() {
			return { args };
		},
		template: `
			<BccMessage v-bind="args" />
		`,
	}),
};

export const Info: Story = {
	render: () => ({
		components: { BccMessage },
		template: `
			<BccMessage severity="info" icon>
				<b>Info message content.</b><br />
				Multiple lines of text are also supported
			</BccMessage>
		`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<template>
				<BccMessage severity="info" icon>
					<b>Info message content.</b><br />
					Multiple lines of text are also supported
				</BccMessage>
			</template>
			`,
			},
		},
	},
};

export const Success: Story = {
	args: { severity: 'success' },
	render: args => ({
		components: { BccMessage },
		setup() {
			return { args };
		},
		template: `
			<BccMessage v-bind="args">Operation completed successfully.</BccMessage>
		`,
	}),
};

export const Warn: Story = {
	args: { severity: 'warn' },
	render: args => ({
		components: { BccMessage },
		setup() {
			return { args };
		},
		template: `
			<BccMessage v-bind="args">Please review before continuing.</BccMessage>
		`,
	}),
};

export const Error: Story = {
	args: { severity: 'error' },
	render: args => ({
		components: { BccMessage },
		setup() {
			return { args };
		},
		template: `
			<BccMessage v-bind="args">Something went wrong.</BccMessage>
		`,
	}),
};

export const Secondary: Story = {
	args: { severity: 'secondary' },
	render: args => ({
		components: { BccMessage },
		setup() {
			return { args };
		},
		template: `
			<BccMessage v-bind="args">Secondary message content.</BccMessage>
		`,
	}),
};

export const Contrast: Story = {
	args: { severity: 'contrast' },
	render: args => ({
		components: { BccMessage },
		setup() {
			return { args };
		},
		template: `
			<BccMessage v-bind="args">Contrast message content.</BccMessage>
		`,
	}),
};

export const CustomIcon: Story = {
	args: { icon: CelebrationIcon },
	render: args => ({
		components: { BccMessage, CelebrationIcon },
		setup() {
			return { args, CelebrationIcon };
		},
		template: `
			<BccMessage v-bind="args" :icon="CelebrationIcon" icon-right message="Custom icon message content." />
		`,
	}),
};

export const TwoIcons: Story = {
	render: () => ({
		components: { BccMessage, CelebrationIcon, InfoIcon },
		setup() {
			return { CelebrationIcon, InfoIcon };
		},
		template: `
			<BccMessage severity="info" :icon="InfoIcon" :icon-right="CelebrationIcon" title="Info message content." message="Multiple lines of text are also supported" />
		`,
	}),
};

export const Sizes: Story = {
	render: () => ({
		components: { BccMessage },
		template: `
			<BccMessage severity="info" icon size="small" title="Small message content." message="Multiple lines of text are also supported" />
			<BccMessage severity="info" icon size="large" title="Large message content." message="Multiple lines of text are also supported" />
		`,
	}),
};
