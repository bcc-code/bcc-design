import { LockIcon, MailIcon, PersonIcon, SearchIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BccInput from './BccInput.vue';

const meta: Meta<typeof BccInput> = {
	component: BccInput,
	title: 'Wrapped/BccInput',
	tags: ['autodocs'],
	argTypes: {
		placeholder: { control: 'text' },
		label: { control: 'text' },
		helpText: { control: 'text' },
		floating: { control: 'boolean' },
		iconRight: { control: 'boolean' },
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
		size: {
			control: 'select',
			options: ['small', 'large'],
		},
		variant: {
			control: 'select',
			options: ['outlined', 'filled'],
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: 'Enter text…',
	},
};

export const WithPlaceholder: Story = {
	args: {
		placeholder: 'Search or type a command',
	},
};

export const WithLeftIcon: Story = {
	args: {
		icon: SearchIcon,
		placeholder: 'Search…',
	},
};

export const WithRightIcon: Story = {
	args: {
		icon: MailIcon,
		iconRight: true,
		placeholder: 'Email address',
	},
};

export const Sizes = {
	render: () => ({
		components: { BccInput, SearchIcon },
		setup() {
			return { SearchIcon };
		},
		template: `
			<div class="flex flex-col gap-4 max-w-xs">
				<BccInput placeholder="Small" :icon="SearchIcon" size="small" />
				<BccInput placeholder="Default size" :icon="SearchIcon" />
				<BccInput placeholder="Large" :icon="SearchIcon" size="large" />
			</div>
		`,
	}),
} as Story;

export const IconVariants = {
	render: () => ({
		components: { BccInput, SearchIcon, MailIcon, PersonIcon, LockIcon },
		setup() {
			return { SearchIcon, MailIcon, PersonIcon, LockIcon };
		},
		template: `
			<div class="flex flex-col gap-4 max-w-xs">
				<BccInput placeholder="Search" :icon="SearchIcon" />
				<BccInput placeholder="Email" :icon="MailIcon" icon-right />
				<BccInput placeholder="Username" :icon="PersonIcon" />
				<BccInput placeholder="Password" :icon="LockIcon" icon-right type="password" />
			</div>
		`,
	}),
} as Story;

export const Invalid: Story = {
	args: {
		placeholder: 'Invalid field',
		invalid: true,
		modelValue: 'Invalid value',
	},
};

export const Disabled: Story = {
	args: {
		placeholder: 'Disabled input',
		disabled: true,
		modelValue: 'Disabled',
	},
};

export const Variants = {
	render: () => ({
		components: { BccInput },
		template: `
			<div class="flex flex-col gap-4 max-w-xs">
				<BccInput placeholder="Outlined (default)" variant="outlined" />
				<BccInput placeholder="Filled" variant="filled" />
			</div>
		`,
	}),
} as Story;

export const WithFloatingLabel: Story = {
	args: {
		label: 'Floating label',
		floating: true,
		placeholder: ' ',
	},
};

export const WithHelpText: Story = {
	args: {
		placeholder: 'With help text',
		helpText: 'This is additional help text for the input.',
	},
};
