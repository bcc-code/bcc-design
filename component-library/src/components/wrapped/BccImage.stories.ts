import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { BccImage } from '../../index';

const meta = {
	component: BccImage,
	title: 'Wrapped/BccImage',
	parameters: {
		docs: {
			description: {
				component:
					'Displays a single image with optional preview and transformation (rotate, zoom). **Why wrapped:** Custom rotation icons from the design system. [Read more on PrimeVue →](https://primevue.org/image/)',
			},
		},
	},
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const imageSrc = 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg';

export const Default: Story = {
	render: () => ({
		components: { BccImage },
		setup() {
			return { imageSrc };
		},
		template: `
			<BccImage :src="imageSrc" alt="Landscape" width="250" />
		`,
	}),
};

export const Preview: Story = {
	render: () => ({
		components: { BccImage },
		setup() {
			return { imageSrc };
		},
		template: `
			<BccImage :src="imageSrc" alt="Landscape" width="250" preview />
		`,
	}),
};
