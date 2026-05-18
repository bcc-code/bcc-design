import type { Meta, StoryObj } from '@storybook/vue3-vite';
import BccImage from './BccImage.vue';

const imageSrc = 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg';
const gallerySrcs = [
	'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg',
	'https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg',
	'https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg',
];

const meta: Meta<typeof BccImage> = {
	component: BccImage,
	title: 'Custom/BccImage',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Displays an image with optional preview in the global BCC lightbox (pinch zoom, swipe gallery, video support). Requires `app.use(BccComponentLibrary)` so the lightbox singleton is installed.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { BccImage },
		setup() {
			return { imageSrc };
		},
		template: `<BccImage :src="imageSrc" alt="Landscape" width="250" />`,
	}),
};

export const Preview: Story = {
	render: () => ({
		components: { BccImage },
		setup() {
			return { imageSrc };
		},
		template: `<BccImage :src="imageSrc" alt="Landscape" width="250" preview />`,
	}),
};

export const Gallery: Story = {
	render: () => ({
		components: { BccImage },
		setup() {
			return { imageSrc, gallerySrcs };
		},
		template: `
			<BccImage
				:src="imageSrc"
				:imgs="gallerySrcs"
				alt="Landscape"
				width="250"
				preview
				loop
			/>
		`,
	}),
};

export const Video: Story = {
	render: () => ({
		components: { BccImage },
		setup() {
			return {
				posterSrc: imageSrc,
				videoSrc: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
			};
		},
		template: `
			<BccImage
				:src="posterSrc"
				:imgs="[{ src: videoSrc, type: 'video', poster: posterSrc, title: 'Sample video' }]"
				alt="Flower video"
				width="320"
				preview
			/>
		`,
	}),
};
