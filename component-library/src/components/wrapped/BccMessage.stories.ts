import { CelebrationIcon, InfoIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
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
				<template #title>
					Info message content.
				</template>
				<template #message>
					Multiple lines of text are also supported
				</template>
			</BccMessage>
		`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<template>
				<BccMessage severity="info" icon>
					<template #title>Info message content.</template>
					<template #message>
						Multiple lines of text are also supported
					</template>
				</BccMessage>
			</template>
			`,
			},
		},
	},
};

export const Success: Story = {
	args: { severity: 'success', icon: true },
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
	args: { severity: 'warn', icon: true },
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
	args: { severity: 'error', icon: true },
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
	args: { severity: 'secondary', icon: true },
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
	args: { severity: 'contrast', icon: true },
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
			<BccMessage severity="info" :icon="true" :icon-right="CelebrationIcon" title="Info message content." message="Multiple lines of text are also supported" />
		`,
	}),
};

export const TitleSlotOnly: Story = {
	args: {
		severity: 'info',
		icon: true,
		message: 'Change message text below to test longer or shorter text.\nWhitespace is maintained',
	},
	render: args => ({
		components: { BccMessage },
		setup() {
			return { args };
		},
		template: `
			<BccMessage v-bind="args">
				<template #title>
					Custom title <i>slot</i> content
				</template>
			</BccMessage>
		`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<template>
				<BccMessage severity="info" icon message="Message from args">
					<template #title>
						Custom title <i>slot</i> content
					</template>
				</BccMessage>
			</template>
			`,
			},
		},
	},
};

export const MessageSlotOnly: Story = {
	args: {
		severity: 'info',
		icon: true,
		title: 'Title from args',
	},
	render: args => ({
		components: { BccMessage },
		setup() {
			return { args };
		},
		template: `
			<BccMessage v-bind="args">
				<template #message>
					Custom message <b>slot content.</b>
				</template>
			</BccMessage>
		`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<template>
				<BccMessage severity="info" icon title="Title from args">
					<template #message>
						Custom message <b>slot content.</b>
					</template>
				</BccMessage>
			</template>
			`,
			},
		},
	},
};

export const Sizes: Story = {
	render: () => ({
		components: { BccMessage },
		template: `
			<BccMessage severity="info" icon size="small" title="Small message content." message="Multiple lines of text are also supported" />
			<br />
			<BccMessage severity="info" icon title="Default message content." message="Multiple lines of text are also supported" />
			<br />
			<BccMessage severity="info" icon size="large" title="Large message content." message="Multiple lines of text are also supported" />
		`,
	}),
};
