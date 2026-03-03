import { ApprovalIcon, CancelIcon, PersonSearchIcon, SearchIcon, StarFillIcon } from '@bcc-code/icons-vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import {
	BccButton,
	BccCheckbox,
	BccInputGroup,
	BccInputGroupAddon,
	BccInputNumber,
	BccInputText,
	BccRadioButton,
	BccSelect,
} from '../../index';

const cities = [
	{ name: 'New York', code: 'NY' },
	{ name: 'Rome', code: 'RM' },
	{ name: 'London', code: 'LDN' },
	{ name: 'Istanbul', code: 'IST' },
	{ name: 'Paris', code: 'PRS' },
];

const meta = {
	component: BccInputGroup,
	title: 'PrimeVue/BccInputGroup',
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: {
			BccInputGroup,
			BccInputGroupAddon,
			BccInputText,
			PersonSearchIcon,
		},
		setup() {
			const username = ref('');
			return { username };
		},
		template: `
			<BccInputGroup>
				<BccInputGroupAddon>
					<PersonSearchIcon />
				</BccInputGroupAddon>
				<BccInputText v-model="username" placeholder="Username" />
			</BccInputGroup>
		`,
	}),
};

export const WithPrefixSuffix: Story = {
	render: () => ({
		components: {
			BccInputGroup,
			BccInputGroupAddon,
			BccInputNumber,
		},
		setup() {
			const price = ref<number | null>(null);
			return { price };
		},
		template: `
			<BccInputGroup>
				<BccInputGroupAddon>$</BccInputGroupAddon>
				<BccInputNumber v-model="price" placeholder="Price" />
				<BccInputGroupAddon>.00</BccInputGroupAddon>
			</BccInputGroup>
		`,
	}),
};

export const WithSelectInput: Story = {
	render: () => ({
		components: {
			BccInputGroup,
			BccInputGroupAddon,
			BccSelect,
		},
		setup() {
			const selectedCity = ref<{ name: string; code: string } | null>(null);
			return { selectedCity, cities };
		},
		template: `
			<BccInputGroup>
				<BccInputGroupAddon>
					<i class="pi pi-map-marker"></i>
				</BccInputGroupAddon>
				<BccSelect
					v-model="selectedCity"
					:options="cities"
					option-label="name"
					placeholder="City"
				
				/>
			</BccInputGroup>
		`,
	}),
};

export const Multiple: Story = {
	render: () => ({
		components: {
			BccInputGroup,
			BccInputGroupAddon,
			BccInputText,
			PersonSearchIcon,
			StarFillIcon,
		},
		setup() {
			return {};
		},
		template: `
			<BccInputGroup>
				<BccInputGroupAddon><PersonSearchIcon /></BccInputGroupAddon>
				<BccInputGroupAddon><StarFillIcon /></BccInputGroupAddon>
				<BccInputText placeholder="Search" />
				<BccInputGroupAddon>Send</BccInputGroupAddon>
				<BccInputGroupAddon>00</BccInputGroupAddon>
			</BccInputGroup>
		`,
	}),
};

export const WithButton: Story = {
	render: () => ({
		components: {
			BccInputGroup,
			BccInputGroupAddon,
			BccButton,
			BccInputText,
		},
		setup() {
			return {};
		},
		template: `
			<BccInputGroup>
				<BccButton label="Search" />
				<BccInputText placeholder="Search" />
			</BccInputGroup>
		`,
	}),
};

export const WithIconButtonAfter: Story = {
	render: () => ({
		components: {
			BccInputGroup,
			BccInputGroupAddon,
			BccButton,
			BccInputText,
			SearchIcon,
		},
		setup() {
			return {};
		},
		template: `
			<BccInputGroup>
				<BccInputText placeholder="Search" />
				<BccInputGroupAddon>
					<BccButton :icon="SearchIcon" severity="warn" />
				</BccInputGroupAddon>
			</BccInputGroup>
		`,
	}),
};

export const WithIconButtonsAround: Story = {
	render: () => ({
		components: {
			BccInputGroup,
			BccInputGroupAddon,
			BccButton,
			BccInputText,
			ApprovalIcon,
			CancelIcon,
		},
		template: `
			<BccInputGroup>
				<BccButton :icon="ApprovalIcon" severity="warn" />
				<BccInputText placeholder="Search" />
				<BccButton :icon="CancelIcon" severity="warn" />
			</BccInputGroup>
		`,
	}),
};

export const WithCheckbox: Story = {
	render: () => ({
		components: {
			BccInputGroup,
			BccInputGroupAddon,
			BccButton,
			BccInputText,
			BccCheckbox,
		},
		template: `
			<BccInputGroup>
				<BccInputGroupAddon>
					<BccCheckbox />
				</BccInputGroupAddon>
				<BccInputText placeholder="Search" />
			</BccInputGroup>
		`,
	}),
};

export const WithRadio: Story = {
	render: () => ({
		components: {
			BccInputGroup,
			BccInputGroupAddon,
			BccButton,
			BccInputText,
			BccRadioButton,
		},
		template: `
			<BccInputGroup>
				<BccInputText placeholder="Search" />
				<BccInputGroupAddon>
					<BccRadioButton name="group" value="opt1" />
				</BccInputGroupAddon>
			</BccInputGroup>
		`,
	}),
};

export const WithCheckboxAndRadio: Story = {
	render: () => ({
		components: {
			BccInputGroup,
			BccInputGroupAddon,
			BccButton,
			BccInputText,
			BccCheckbox,
			BccRadioButton,
		},
		template: `
			<BccInputGroup>
				<BccInputGroupAddon>
					<BccCheckbox />
				</BccInputGroupAddon>
				<BccInputText placeholder="Search" />
				<BccInputGroupAddon>
					<BccRadioButton name="group" value="opt1" />
				</BccInputGroupAddon>
			</BccInputGroup>
		`,
	}),
};
