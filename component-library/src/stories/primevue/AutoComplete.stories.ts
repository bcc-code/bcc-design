import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import { BccAutoComplete } from '../../index';

const cities = [
	{ name: 'New York', code: 'NY' },
	{ name: 'Rome', code: 'RM' },
	{ name: 'London', code: 'LDN' },
	{ name: 'Istanbul', code: 'IST' },
	{ name: 'Paris', code: 'PRS' },
	{ name: 'Oslo', code: 'OSL' },
	{ name: 'Stockholm', code: 'STO' },
	{ name: 'Copenhagen', code: 'CPH' },
	{ name: 'Berlin', code: 'BER' },
	{ name: 'Madrid', code: 'MAD' },
	{ name: 'Rome', code: 'RM' },
	{ name: 'London', code: 'LDN' },
	{ name: 'Istanbul', code: 'IST' },
	{ name: 'Paris', code: 'PRS' },
];

const meta = {
	component: BccAutoComplete,
	title: 'PrimeVue/BccAutoComplete',
	parameters: {
		docs: {
			description: {
				component:
					'Text input with suggestions from a list. [Read more on PrimeVue →](https://primevue.org/autocomplete/)',
			},
		},
	},
	argTypes: {
		placeholder: { control: 'text' },
		disabled: { control: 'boolean' },
		dropdown: { control: 'boolean' },
		showClear: { control: 'boolean' },
		size: { control: 'select', options: ['small', 'default', 'large'] },
		multiple: { control: 'boolean' },
		forceSelection: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function useAutoComplete() {
	const selected = ref<(typeof cities)[0] | null>(null);
	const suggestions = ref<typeof cities>([]);
	const search = (event: { query: string }) => {
		if (!event.query.trim().length) {
			suggestions.value = [...cities];
		} else {
			suggestions.value = cities.filter(c => c.name.toLowerCase().startsWith(event.query.toLowerCase()));
		}
	};
	return { selected, suggestions, search, cities };
}

export const Default: Story = {
	args: {
		placeholder: 'Search for a city',
	},
	render: args => ({
		components: { BccAutoComplete },
		setup() {
			const { selected, suggestions, search } = useAutoComplete();
			return { args, selected, suggestions, search };
		},
		template: `
		<div class="max-w-sm mx-auto">
			<BccAutoComplete
				v-model="selected"
				option-label="name"
				:suggestions="suggestions"
				@complete="search"
				v-bind="args"
				fluid
			/>
		</div>
		`,
	}),
};

export const WithDropdown: Story = {
	args: {
		placeholder: 'Search for a city',
		dropdown: true,
	},
	render: args => ({
		components: { BccAutoComplete },
		setup() {
			const { selected, suggestions, search } = useAutoComplete();
			return { args, selected, suggestions, search };
		},
		template: `
			<BccAutoComplete
				v-model="selected"
				option-label="name"
				:suggestions="suggestions"
				@complete="search"
				v-bind="args"
			/>
		`,
	}),
};

export const ForceSelection: Story = {
	args: {
		placeholder: 'Search for a city',
		forceSelection: true,
	},
	render: args => ({
		components: { BccAutoComplete },
		setup() {
			const { selected, suggestions, search } = useAutoComplete();
			return { args, selected, suggestions, search };
		},
		template: `
			<BccAutoComplete
				v-model="selected"
				option-label="name"
				:suggestions="suggestions"
				@complete="search"
				v-bind="args"
			/>
		`,
	}),
};

export const Clearable: Story = {
	args: {
		placeholder: 'Search for a city',
		showClear: true,
	},
	render: args => ({
		components: { BccAutoComplete },
		setup() {
			const { selected, suggestions, search } = useAutoComplete();
			selected.value = cities[0];
			return { args, selected, suggestions, search };
		},
		template: `
			<div class="max-w-sm mx-auto">
				<BccAutoComplete
					v-model="selected"
					option-label="name"
					:suggestions="suggestions"
					@complete="search"
					v-bind="args"
				/>
			</div>
		`,
	}),
};

export const Disabled: Story = {
	args: {
		placeholder: 'Search for a city',
		disabled: true,
	},
	render: args => ({
		components: { BccAutoComplete },
		setup() {
			const selected = ref<(typeof cities)[0] | null>(cities[0]);
			const suggestions = ref<typeof cities>([]);
			const search = () => {};
			return { args, selected, suggestions, search };
		},
		template: `
			<BccAutoComplete
				v-model="selected"
				option-label="name"
				:suggestions="suggestions"
				@complete="search"
				v-bind="args"
			/>
		`,
	}),
};

export const Multiple: Story = {
	args: {
		placeholder: 'Search for a city',
		multiple: true,
	},
	render: args => ({
		components: { BccAutoComplete },
		setup() {
			const { selected, suggestions, search } = useAutoComplete();
			return { args, selected, suggestions, search };
		},
		template: `
			<BccAutoComplete
				v-model="selected"
				option-label="name"
				:suggestions="suggestions"
				@complete="search"
				v-bind="args"
			/>
		`,
	}),
};

export const SmallSize: Story = {
	args: {
		placeholder: 'Search for a city',
		size: 'small',
	},
	render: args => ({
		components: { BccAutoComplete },
		setup() {
			const { selected, suggestions, search } = useAutoComplete();
			return { args, selected, suggestions, search };
		},
		template: `
			<BccAutoComplete
				v-model="selected"
				option-label="name"
				:suggestions="suggestions"
				@complete="search"
				v-bind="args"
			/>
		`,
	}),
};

export const LargeSize: Story = {
	args: {
		placeholder: 'Search for a city',
		size: 'large',
	},
	render: args => ({
		components: { BccAutoComplete },
		setup() {
			const { selected, suggestions, search } = useAutoComplete();
			return { args, selected, suggestions, search };
		},
		template: `
			<BccAutoComplete
				v-model="selected"
				option-label="name"
				:suggestions="suggestions"
				@complete="search"
				v-bind="args"
			/>
		`,
	}),
};
