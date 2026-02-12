import { LockIcon, MailIcon, NumbersIcon, PersonIcon, SearchIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccFloatLabel } from '../../index';
import BccInput from './BccInput.vue';

const meta: Meta<typeof BccInput> = {
	component: BccInput,
	title: 'Wrapped/BccInput',
	argTypes: {
		placeholder: { control: 'text' },
		iconRight: { control: 'boolean' },
		disabled: { control: 'boolean' },
		loading: { control: 'boolean' },
		size: {
			control: 'select',
			options: ['small', 'large'],
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

export const Loading: Story = {
	args: {
		icon: SearchIcon,
		placeholder: 'Search…',
		loading: true,
	},
};

export const Sizes: Story = {
	render: () =>
		({
			components: { BccInput, SearchIcon },
			setup() {
				const val = ref('');
				return { SearchIcon, val };
			},
			template: `
			<div class="flex flex-col gap-4 max-w-xs">
				<BccInput placeholder="Small" v-model="val" :icon="SearchIcon" size="small" />
				<BccInput placeholder="Default size" v-model="val" :icon="SearchIcon" />
				<BccInput placeholder="Large" v-model="val" :icon="SearchIcon" size="large" />
			</div>
		`,
		}) as any,
};

export const IconVariants: Story = {
	render: () =>
		({
			components: { BccInput, SearchIcon, MailIcon, PersonIcon, LockIcon },
			setup() {
				return { SearchIcon, MailIcon, PersonIcon, LockIcon };
			},
			template: `
			<div class="flex flex-col gap-4 max-w-xs">
				<BccInput placeholder="Search" :icon="SearchIcon" />
				<BccInput placeholder="Email" :icon="MailIcon" :icon-right="true" />
				<BccInput placeholder="Username" :icon="PersonIcon" />
				<BccInput placeholder="Password" :icon="LockIcon" :icon-right="true" type="password" />
			</div>
		`,
		}) as any,
};

export const Numeric: Story = {
	args: {
		numeric: true,
		placeholder: 'Enter a number',
		icon: NumbersIcon,
	},
};

export const Disabled: Story = {
	args: {
		placeholder: 'Disabled input',
		disabled: true,
	},
};

export const WithLabel: Story = {
	render: (args: Record<string, unknown>) =>
		({
			components: { BccInput },
			setup() {
				const value = ref('');
				return { args, value };
			},
			template: `
			<div class="max-w-xs">
				<label for="username">Username</label>
				<BccInput id="username" v-model="value" v-bind="args" />
			</div>
		`,
		}) as any,
	args: {
		placeholder: 'Enter your username',
	},
	parameters: {
		docs: {
			code: `
<div class="max-w-xs">
	<label for="username">Username</label>
	<BccInput id="username" v-model="value" v-bind="args" />
</div>`,
		},
	},
};

export const FloatLabelVariants: Story = {
	render: () =>
		({
			components: { BccInput, BccFloatLabel },
			setup() {
				const over = ref('');
				const inVal = ref('');
				const onVal = ref('');
				return { over, inVal, onVal };
			},
			template: `
			<div class="flex flex-col gap-6 max-w-xs">
				<BccFloatLabel>
					<BccInput id="float-over" v-model="over" />
					<label for="float-over">Over label (default)</label>
				</BccFloatLabel>
				<BccFloatLabel variant="in">
					<BccInput id="float-in" v-model="inVal" />
					<label for="float-in">In label</label>
				</BccFloatLabel>
				<BccFloatLabel variant="on">
					<BccInput id="float-on" v-model="onVal" />
					<label for="float-on">On label</label>
				</BccFloatLabel>
			</div>
		`,
		}) as any,
};

export const FloatLabelWithIcon: Story = {
	render: () =>
		({
			components: { BccInput, BccFloatLabel, MailIcon },
			setup() {
				const email = ref('');
				return { email, MailIcon };
			},
			template: `
			<div class="flex flex-col gap-6 max-w-xs">
				<BccFloatLabel>
					<BccInput id="float-email" v-model="email" :icon="MailIcon" icon-right />
					<label for="float-email">Email address</label>
				</BccFloatLabel>
			</div>
		`,
		}) as any,
};

export const FloatLabelInvalid: Story = {
	render: () =>
		({
			components: { BccInput, BccFloatLabel },
			setup() {
				const value = ref('');
				return { value };
			},
			template: `
			<div class="max-w-xs">
				<BccFloatLabel>
					<BccInput id="float-invalid" v-model="value" :invalid="!value" />
					<label for="float-invalid">Username (required)</label>
				</BccFloatLabel>
			</div>
		`,
		}) as any,
};
