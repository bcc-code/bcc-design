import { CheckIcon, CloseIcon, QuestionMarkIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import BccToggleButton from './BccToggleButton.vue';

const meta = {
	component: BccToggleButton,
	title: 'Wrapped/BccToggleButton',
	parameters: {
		docs: {
			description: {
				component:
					'Button that toggles between on and off states. **Why wrapped:** `onIcon` and `offIcon` accept Vue components (e.g. from `@bcc-code/icons-vue`) instead of icon name strings. [Read more on PrimeVue →](https://primevue.org/togglebutton/)',
			},
		},
	},
	argTypes: {
		disabled: { control: 'boolean' },
		invalid: { control: 'boolean' },
		fluid: { control: 'boolean' },
		readonly: { control: 'boolean' },
		size: { control: 'select', options: ['small', 'default', 'large'] },
		onLabel: { control: 'text', table: { defaultValue: { summary: 'On' } } },
		offLabel: { control: 'text', table: { defaultValue: { summary: 'Off' } } },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		onLabel: 'On',
		offLabel: 'Off',
	},
	render: args => ({
		components: { BccToggleButton },
		setup() {
			const checked = ref(false);
			return { args, checked };
		},
		template: `
			<div class="center gap-2">
				<BccToggleButton v-model="checked" v-bind="args" />
			</div>
		`,
	}),
};

export const WithLabels: Story = {
	args: {
		onLabel: 'Yes',
		offLabel: 'No',
	},
	render: args => ({
		components: { BccToggleButton },
		setup() {
			const checked = ref(false);
			return { args, checked };
		},
		template: `
			<div class="center gap-2">
				<BccToggleButton v-model="checked" v-bind="args" />
			</div>
		`,
	}),
};

export const WithIcons: Story = {
	render: () => ({
		components: { BccToggleButton, CheckIcon, CloseIcon },
		setup() {
			const checked = ref(false);
			return { checked, CheckIcon, CloseIcon };
		},
		template: `
			<div class="center gap-2">
				<BccToggleButton v-model="checked"
					:onIcon="CheckIcon"
					:offIcon="CloseIcon"
				/>
				<span>{{ checked ? 'Checked' : 'Unchecked' }}</span>
			</div>
		`,
	}),
};

export const Slot: Story = {
	render: () => ({
		components: { BccToggleButton, QuestionMarkIcon, CheckIcon, CloseIcon },
		setup() {
			const checked = ref(false);
			return { checked, QuestionMarkIcon, CheckIcon, CloseIcon };
		},
		template: `
			<div class="center gap-2">
				<BccToggleButton v-model="checked">
					<div class="center gap-2">
						<QuestionMarkIcon class="size-5" />
						<span>{{ checked ? 'Checked' : 'Unchecked' }}</span>
						<CheckIcon v-if="checked" class="size-5" />
						<CloseIcon v-else class="size-5" />
					</div>
				</BccToggleButton>
			</div>
		`,
	}),
};

export const IconOnly: Story = {
	render: () => ({
		components: { BccToggleButton, CheckIcon, CloseIcon },
		setup() {
			const checked = ref(false);
			return { checked, CheckIcon, CloseIcon };
		},
		template: `
			<div class="center gap-2">
				<BccToggleButton v-model="checked">
					<CheckIcon v-if="checked" class="size-5" />
					<CloseIcon v-else class="size-5" />
				</BccToggleButton>
			</div>
		`,
	}),
};

export const Checked: Story = {
	render: () => ({
		components: { BccToggleButton },
		setup() {
			const checked = ref(true);
			return { checked };
		},
		template: `
			<BccToggleButton v-model="checked" :default-value="true" />
		`,
	}),
};

export const Disabled: Story = {
	args: { disabled: true },
	render: args => ({
		components: { BccToggleButton },
		setup() {
			const checked = ref(false);
			return { args, checked };
		},
		template: `
			<BccToggleButton v-model="checked" v-bind="args" />
		`,
	}),
};

export const Sizes: Story = {
	render: () => ({
		components: { BccToggleButton },
		setup() {
			const small = ref(false);
			const defaultSize = ref(false);
			const large = ref(false);
			return { small, defaultSize, large };
		},
		template: `
			<div class="center gap-2">
				<BccToggleButton v-model="small" size="small" on-label="Small" off-label="Small" />
				<BccToggleButton v-model="defaultSize" on-label="Default" off-label="Default" />
				<BccToggleButton v-model="large" size="large" on-label="Large" off-label="Large" />
			</div>
		`,
	}),
};
