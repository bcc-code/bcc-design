import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { BccSelect } from '../../index';

const cities = [
	{ name: 'New York', code: 'NY' },
	{ name: 'Rome', code: 'RM' },
	{ name: 'London', code: 'LDN' },
	{ name: 'Istanbul', code: 'IST' },
	{ name: 'Paris', code: 'PRS' },
];

const meta = {
	component: BccSelect,
	title: 'PrimeVue/BccSelect',
	parameters: {
		docs: {
			description: {
				component: 'Dropdown for single selection from a list. [Read more on PrimeVue →](https://primevue.org/select/)',
			},
		},
	},
	argTypes: {
		placeholder: { control: 'text' },
		disabled: { control: 'boolean' },
		filter: { control: 'boolean' },
		showClear: { control: 'boolean' },
		variant: { control: 'select', options: ['outlined', 'filled'] },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: 'Select a City',
	},
	render: args => ({
		components: { BccSelect },
		setup() {
			const selected = ref<{ name: string; code: string } | null>(null);
			return { args, selected, cities };
		},
		template: `
			<BccSelect v-model="selected" :options="cities" option-label="name" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const WithFilter: Story = {
	args: {
		placeholder: 'Select a City',
		filter: true,
	},
	render: args => ({
		components: { BccSelect },
		setup() {
			const selected = ref<{ name: string; code: string } | null>(null);
			return { args, selected, cities };
		},
		template: `
			<BccSelect v-model="selected" :options="cities" option-label="name" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const Clearable: Story = {
	args: {
		placeholder: 'Select a City',
		showClear: true,
	},
	render: args => ({
		components: { BccSelect },
		setup() {
			const selected = ref<{ name: string; code: string } | null>(cities[0]);
			return { args, selected, cities };
		},
		template: `
			<BccSelect v-model="selected" :options="cities" option-label="name" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const Disabled: Story = {
	args: {
		placeholder: 'Select a City',
		disabled: true,
	},
	render: args => ({
		components: { BccSelect },
		setup() {
			return { args, cities };
		},
		template: `
			<BccSelect :options="cities" option-label="name" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

const InlineCode = `<p>I live in <BccSelect :options="cities" option-label="name" v-bind="args" class="inline-select" />, which is the best.</p>`;
export const Inline: Story = {
	args: {
		placeholder: 'Select a City',
	},
	render: args => ({
		components: { BccSelect },
		setup() {
			return { args, cities };
		},
		template: InlineCode,
	}),
	parameters: {
		docs: {
			description: {
				component:
					'When using within or ontop of another element, add `inline-select` class to have the select fit together with the text.',
			},
			source: {
				language: 'html',
				code: InlineCode,
			},
		},
	},
};

const InlineInverseCode = `<p class="bg-brand-800 p-4 rounded text-white text-xl">The best city is <BccSelect :options="cities" option-label="name" v-bind="args" class="inline-select inverse" /></p>`;
export const InlineInverse: Story = {
	args: {
		placeholder: 'Select a City',
	},
	render: args => ({
		components: { BccSelect },
		setup() {
			return { args, cities };
		},
		template: InlineInverseCode,
	}),
	parameters: {
		docs: {
			description: {
				component:
					'If used on a dark background, add the `inline-select inverse` class to the select to ensure the text is readable.',
			},
			source: {
				language: 'html',
				code: InlineInverseCode,
			},
		},
	},
};
