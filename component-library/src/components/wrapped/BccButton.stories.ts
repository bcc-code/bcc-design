import { CheckIcon, HelpIcon, InfoIcon, WarningIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import BccButton from './BccButton.vue';

const meta: Meta<typeof BccButton> = {
	component: BccButton,
	title: 'Wrapped/BccButton',
	argTypes: {
		label: { control: 'text' },
		severity: {
			control: 'select',
			options: ['secondary', 'success', 'info', 'warn', 'help', 'danger', 'contrast'],
		},
		disabled: { control: 'boolean' },
		loading: { control: 'boolean' },
		outlined: { control: 'boolean' },
		icon: { control: 'object' },
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Button',
	},
};

export const Variants: Story = {
	render: () => ({
		components: { BccButton },
		template: `
			<div class="flex flex-wrap gap-2">
				<BccButton label="Default" />
				<BccButton label="Outlined" outlined />
				<BccButton label="Text" text />
				<BccButton label="Rounded" rounded />
				<BccButton label="Rounded Outlined" rounded outlined />
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
			return { CheckIcon, InfoIcon };
		},
		template: `
			<div class="flex flex-wrap gap-2">
				<BccButton label="With Icon Left " :icon="CheckIcon" />
				<BccButton label="With Icon Right" :icon="InfoIcon" icon-right />
			</div>
		`,
	}),
};

export const Severities: Story = {
	render: () => ({
		components: { BccButton, CheckIcon, InfoIcon, WarningIcon, HelpIcon },
		setup() {
			return { CheckIcon, InfoIcon, WarningIcon, HelpIcon };
		},
		template: `
			<div class="flex flex-wrap gap-2">
				<BccButton label="Primary" />
				<BccButton label="Contrast" severity="contrast"  />
				<BccButton label="Success" severity="success" v-bind="{ icon: CheckIcon }" />
				<BccButton label="Info" severity="info" v-bind="{ icon: InfoIcon }" />
				<BccButton label="Warn" severity="warn" v-bind="{ icon: WarningIcon }" />
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
	args: {
		label: 'Disabled',
		disabled: true,
	},
};

export const WithContext: Story = {
	render: args => ({
		components: { BccButton },
		setup() {
			const value = ref(false);
			const context = ref('blue');
			return { args, context, value };
		},
		template: `<div class="flex gap-4">
	<BccButton @click="value = !value" v-bind="args" label="Switch Me" useCtx :class="value ? 'ctx-' + context + '-bolder' : 'ctx-' + context + '-subtler'" />
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
