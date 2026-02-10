import type { Meta, StoryObj } from '@storybook/vue3';
import { PVCalendar } from '../../index';
import { ref } from 'vue';

const meta = {
	component: PVCalendar,
	title: 'PrimeVue/Calendar',
	tags: ['autodocs'],
	argTypes: {
		showIcon: { control: 'boolean' },
		showButtonBar: { control: 'boolean' },
		dateFormat: { control: 'text' },
		disabled: { control: 'boolean' },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { PVCalendar },
		setup() {
			const date = ref<Date | null>(null);
			return { args, date };
		},
		template: `
			<PVCalendar v-model="date" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const WithIcon: Story = {
	args: { showIcon: true },
	render: args => ({
		components: { PVCalendar },
		setup() {
			const date = ref<Date | null>(null);
			return { args, date };
		},
		template: `
			<PVCalendar v-model="date" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};

export const WithTime: Story = {
	render: () => ({
		components: { PVCalendar },
		setup() {
			const date = ref<Date | null>(null);
			return { date };
		},
		template: `
			<PVCalendar v-model="date" show-time hour-format="24" class="w-full md:w-14rem" />
		`,
	}),
};

export const Disabled: Story = {
	args: { disabled: true },
	render: args => ({
		components: { PVCalendar },
		setup() {
			const date = ref<Date | null>(new Date());
			return { args, date };
		},
		template: `
			<PVCalendar v-model="date" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};
