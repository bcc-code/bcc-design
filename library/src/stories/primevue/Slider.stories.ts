import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { PVSlider } from '../../index';

const meta = {
	component: PVSlider,
	title: 'PrimeVue/Slider',
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean' },
		min: { control: { type: 'number' } },
		max: { control: { type: 'number' } },
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: args => ({
		components: { PVSlider },
		setup() {
			const value = ref(50);
			return { args, value };
		},
		template: `
			<div>
				<PVSlider v-model="value" v-bind="args" class="w-full md:w-14rem" />
				<br/>
				<span>Value: {{ value }}</span>
			</div>
		`,
	}),
};

export const Range: Story = {
	render: () => ({
		components: { PVSlider },
		setup() {
			const value = ref([20, 80]);
			return { value };
		},
		template: `
			<div>
				<PVSlider v-model="value" range class="w-full md:w-14rem" />
				<br/>
				<span>Range: {{ value[0] }} - {{ value[1] }}</span>
			</div>
		`,
	}),
};

export const WithMinMax: Story = {
	args: { min: 0, max: 100 },
	render: args => ({
		components: { PVSlider },
		setup() {
			const value = ref(25);
			return { args, value };
		},
		template: `
			<PVSlider v-model="value" v-bind="args" class="w-full md:w-14rem" />
		`,
	}),
};
