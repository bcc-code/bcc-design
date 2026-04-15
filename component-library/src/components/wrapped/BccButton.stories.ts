import { CheckIcon, ErrorIcon, HelpIcon, InfoIcon, OpenInBrowserIcon, WarningIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import type { ButtonProps } from './BccButton.vue';
import BccButton from './BccButton.vue';

const meta = {
	component: BccButton,
	title: 'Wrapped/BccButton',
	parameters: {
		docs: {
			description: {
				component:
					'Button for actions and navigation. **Why wrapped:** Vue component icons (e.g. from `@bcc-code/icons-vue`) via `icon` and `iconRight`, plus `useCtx` for context-aware styling (e.g. `ctx-blue-subtler`). [Read more on PrimeVue →](https://primevue.org/button/)',
			},
		},
	},
	argTypes: {
		label: { control: 'text' },
		severity: {
			control: 'select',
			options: ['secondary', 'success', 'info', 'warn', 'help', 'danger', 'contrast'],
		},
		disabled: { control: 'boolean' },
		rounded: { control: 'boolean' },
		loading: { control: 'boolean' },
		outlined: { control: 'boolean' },
		text: { control: 'boolean' },
		raised: { control: 'boolean' },
		iconRight: { control: 'boolean' },
		size: {
			control: 'select',
			options: ['small', 'default', 'large'],
		},
	},
} as Meta<typeof BccButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { label: 'Default', icon: CheckIcon } as unknown as Story['args'],
	render: args => ({
		components: { BccButton },
		setup() {
			return { args };
		},
		template: `
			<div class="flex flex-wrap gap-2 p-2">
				<BccButton v-bind="args" />
				<BccButton v-bind="args" label="Outlined" outlined />
				<BccButton v-bind="args" label="Text" text />
				<BccButton v-bind="args" label="Rounded" rounded />
				<BccButton v-bind="args" label="Rounded Outlined" rounded outlined />
			</div>
		`,
	}),
};

export const Sizes: Story = {
	render: () => ({
		components: { BccButton },
		template: `
			<div class="flex flex-col gap-4 max-w-xs">
				<BccButton label="Small" size="small" outlined />
				<BccButton label="Default" />
				<BccButton label="Large" size="large" outlined />
			</div>
		`,
	}),
};

export const WithIcons: Story = {
	render: () => ({
		components: { BccButton },
		setup() {
			return { CheckIcon, InfoIcon, HelpIcon };
		},
		template: `
			<div class="flex flex-wrap gap-2">
				<BccButton label="With Icon Left" :icon="CheckIcon" />
				<BccButton :icon="HelpIcon" />
				<BccButton label="With Icon Right" :icon="InfoIcon" icon-right />
			</div>
		`,
	}),
};

export const WithIconsAndSizes: Story = {
	render: () => ({
		components: { BccButton },
		setup() {
			return { OpenInBrowserIcon };
		},
		template: `
			<div class="flex flex-wrap gap-2">
				<BccButton
					label="Small outlined"
					outlined use-ctx
					:icon="OpenInBrowserIcon"
					size="small"
					class="ctx-neutral-subtle border-0"
				/>
				<BccButton
					label="Small"
					use-ctx
					:icon="OpenInBrowserIcon"
					size="small"
					class="ctx-neutral-subtle border-0"
				/>
			</div>
			<div class="flex flex-wrap gap-2 mt-2">
				<BccButton
					label="Default outlined"
					outlined use-ctx
					:icon="OpenInBrowserIcon"
					size="default"
					class="ctx-neutral-subtle border-0"
				/>
				<BccButton
					label="Default"
					use-ctx
					:icon="OpenInBrowserIcon"
					size="default"
					class="ctx-neutral-subtle border-0"
				/>
			</div>
			<div class="flex flex-wrap gap-2 mt-2">
				<BccButton
					label="Large outlined"
					outlined use-ctx
					:icon="OpenInBrowserIcon"
					size="large"
					class="ctx-neutral-subtle border-0"
				/>
				<BccButton
					label="Large"
					use-ctx
					:icon="OpenInBrowserIcon"
					size="large"
					class="ctx-neutral-subtle border-0"
				/>
			</div>
		`,
	}),
};

export const Rounded: Story = {
	render: () => ({
		components: { BccButton },
		setup() {
			return { CheckIcon, InfoIcon, HelpIcon };
		},
		template: `
			<div class="flex flex-wrap gap-2">
				<BccButton :icon="CheckIcon" size="small" rounded />
				<BccButton :icon="HelpIcon" rounded />
				<BccButton :icon="InfoIcon" size="large" rounded />
			</div>
		`,
	}),
};

export const Severities: Story = {
	render: () => ({
		components: { BccButton, CheckIcon, InfoIcon, WarningIcon, ErrorIcon, HelpIcon },
		setup() {
			return { CheckIcon, InfoIcon, WarningIcon, ErrorIcon, HelpIcon };
		},
		template: `
			<div class="flex flex-wrap gap-2">
				<BccButton label="Primary" />
				<BccButton label="Contrast" severity="contrast"  />
				<BccButton label="Success" severity="success" v-bind="{ icon: CheckIcon }" />
				<BccButton label="Info" severity="info" v-bind="{ icon: InfoIcon }" />
				<BccButton label="Warn" severity="warn" v-bind="{ icon: WarningIcon }" />
				<BccButton label="Danger" severity="danger" v-bind="{ icon: ErrorIcon }" />
				<BccButton label="Help" v-bind="{ icon: HelpIcon, severity: 'help' }" />
			</div>
		`,
	}),
};

export const WithBadge: Story = {
	render: () => ({
		components: { BccButton },
		template: `
			<BccButton label="Button" badge="3" />
		`,
	}),
};

export const Disabled: Story = {
	args: { label: 'Disabled', disabled: true } as unknown as Story['args'],
};

export const WithContext: Story = {
	render: (args: Partial<ButtonProps>) => ({
		components: { BccButton },
		setup() {
			const value = ref(false);
			const context = ref('blue');
			return { args, context, value };
		},
		template: `<div class="flex gap-4">
	<BccButton @click="value = !value" v-bind="args" label="Switch Me (Subtler/Bolder)" useCtx :class="value ? 'ctx-' + context + '-bolder' : 'ctx-' + context + '-subtler'" />
	<select v-model="context">
		<option value="blue">Blue</option>
		<option value="green">Green</option>
		<option value="red">Red</option>
		<option value="yellow">Yellow</option>
		<option value="purple">Purple</option>
		<option value="orange">Orange</option>
		<option value="magenta">Magenta</option>
	</select>
</div>`,
	}),
	parameters: {
		docs: {
			source: {
				code: `<BccButton v-model="value" use-ctx :class="value ? 'ctx-blue-bolder' : 'ctx-blue-subtler'" />`,
			},
		},
	},
};
