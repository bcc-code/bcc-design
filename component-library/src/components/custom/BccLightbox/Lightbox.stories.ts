import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import BccButton from '../../wrapped/BccButton.vue';
import { closeBccLightbox, openBccLightbox, useLightbox } from './composables';
import type { LightboxItem } from './types';

const imageSrc = 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg';
const gallerySrcs = [
	'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg',
	'https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg',
	'https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg',
];

/**
 * # Lightbox
 *
 * Global singleton overlay for images and video. Installed via `app.use(BccComponentLibrary)`
 * (`installBccLightbox` in `setup.ts`). One instance is mounted on `document.body`.
 *
 * ## When to use what
 *
 * | Approach | Use when |
 * |----------|----------|
 * | **`BccImage` with `preview`** | Standard thumbnail + click-to-open (see **Custom → BccImage**) |
 * | **`useLightbox()`** | Inside Vue components (composable / inject) |
 * | **`openBccLightbox()` / `closeBccLightbox()`** | Handlers, scripts, or anywhere outside `setup` |
 *
 * ## `LightboxOpenOptions`
 *
 * | Option | Type | Default | Description |
 * |--------|------|---------|-------------|
 * | `items` | `(string \| LightboxItem)[]` | — | **Required.** URLs or item objects |
 * | `index` | `number` | `0` | Starting slide |
 * | `loop` | `boolean` | `false` | Wrap prev/next at ends |
 * | `maskClosable` | `boolean` | `true` | Click backdrop to close |
 * | `onShow` | `() => void` | — | Fired after open |
 * | `onHide` | `() => void` | — | Fired after close |
 *
 * ## `LightboxItem`
 *
 * | Field | Type | Description |
 * |-------|------|-------------|
 * | `src` | `string` | **Required.** Image or video URL |
 * | `type` | `'image' \| 'video'` | Auto-detected from extension if omitted |
 * | `alt` | `string` | Accessible label (images) |
 * | `title` | `string` | Caption under media |
 * | `poster` | `string` | Video poster frame |
 *
 * **Images:** pinch/pan/wheel zoom, swipe between slides, rotate toolbar.
 * **Video:** native controls; swipe still works for galleries.
 */
const meta = {
	title: 'Custom/Lightbox',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Imperative and composable API for the global BCC lightbox. Prefer `BccImage` with `preview` for simple thumbnails; use `useLightbox` or `openBccLightbox` for custom triggers and galleries.',
			},
		},
	},
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/** Open a single image with `openBccLightbox` (no inject). */
export const SingleImage: Story = {
	parameters: {
		docs: {
			source: {
				code: `<script setup lang="ts">
						import { BccButton, openBccLightbox } from '@bcc-code/component-library-vue';

						const imageSrc = 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg';

						const open = () =>
							openBccLightbox({
								items: [{ src: imageSrc, alt: 'Landscape', title: 'Single image' }],
							});
						</script>

						<template>
							<div class="flex flex-col gap-3">
								<p class="body-sm text-subtle">Opens the global lightbox with one image.</p>
								<BccButton label="Open lightbox" @click="open" />
							</div>
						</template>`,
			},
		},
	},
	render: () => ({
		components: { BccButton },
		setup() {
			const open = () =>
				openBccLightbox({
					items: [{ src: imageSrc, alt: 'Landscape', title: 'Single image' }],
				});
			return { open };
		},
		template: `
			<div class="flex flex-col gap-3">
				<p class="body-sm text-subtle">Opens the global lightbox with one image.</p>
				<BccButton label="Open lightbox" @click="open" />
			</div>
		`,
	}),
};

/** Gallery with `useLightbox()` inside setup. */
export const Gallery: Story = {
	parameters: {
		docs: {
			source: {
				code: `<script setup lang="ts">
						import { BccButton, useLightbox } from '@bcc-code/component-library-vue';

						const gallerySrcs = [
							'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg',
							'https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg',
							'https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg',
						];

						const lightbox = useLightbox();

						const open = () =>
							lightbox.open({
								items: gallerySrcs,
								index: 0,
								loop: true,
							});
						</script>

						<template>
							<div class="flex flex-col gap-3">
								<p class="body-sm text-subtle">Three images, loop enabled. Swipe or use arrows; pinch to zoom on images.</p>
								<BccButton label="Open gallery" @click="open" />
							</div>
						</template>`,
			},
		},
	},
	render: () => ({
		components: { BccButton },
		setup() {
			const lightbox = useLightbox();
			const open = () =>
				lightbox.open({
					items: gallerySrcs,
					index: 0,
					loop: true,
				});
			return { open };
		},
		template: `
			<div class="flex flex-col gap-3">
				<p class="body-sm text-subtle">Three images, loop enabled. Swipe or use arrows; pinch to zoom on images.</p>
				<BccButton label="Open gallery" @click="open" />
			</div>
		`,
	}),
};

/** Mixed gallery: images + video (`type: 'video'` or file extension). */
export const WithVideo: Story = {
	parameters: {
		docs: {
			source: {
				code: `<script setup lang="ts">
						import { BccButton, openBccLightbox, type LightboxItem } from '@bcc-code/component-library-vue';

						const imageSrc = 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg';

						const items: LightboxItem[] = [
							{ src: imageSrc, alt: 'Poster frame', title: 'Image slide' },
							{
								src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
								type: 'video',
								poster: imageSrc,
								title: 'Video slide',
							},
						];

						const open = () => openBccLightbox({ items, index: 0 });
						</script>

						<template>
							<div class="flex flex-col gap-3">
								<p class="body-sm text-subtle">Second item is video with poster. Rotate controls appear only on images.</p>
								<BccButton label="Open mixed gallery" @click="open" />
							</div>
						</template>`,
			},
		},
	},
	render: () => ({
		components: { BccButton },
		setup() {
			const items: LightboxItem[] = [
				{ src: imageSrc, alt: 'Poster frame', title: 'Image slide' },
				{
					src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
					type: 'video',
					poster: imageSrc,
					title: 'Video slide',
				},
			];
			const open = () => openBccLightbox({ items, index: 0 });
			return { open };
		},
		template: `
			<div class="flex flex-col gap-3">
				<p class="body-sm text-subtle">Second item is video with poster. Rotate controls appear only on images.</p>
				<BccButton label="Open mixed gallery" @click="open" />
			</div>
		`,
	}),
};

/** `onShow` / `onHide` and `maskClosable: false`. */
export const OptionsAndCallbacks: Story = {
	parameters: {
		docs: {
			source: {
				code: `<script setup lang="ts">
						import { ref } from 'vue';
						import { BccButton, closeBccLightbox, openBccLightbox } from '@bcc-code/component-library-vue';

						const imageSrc = 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg';
						const status = ref('idle');

						const openStrict = () => {
							status.value = 'opening…';
							openBccLightbox({
								items: [imageSrc],
								maskClosable: false,
								onShow: () => {
									status.value = 'open (backdrop click disabled — use Close or Esc)';
								},
								onHide: () => {
									status.value = 'closed';
								},
							});
						};

						const close = () => closeBccLightbox();
						</script>

						<template>
							<div class="flex flex-col gap-3">
								<p class="body-sm">Status: {{ status }}</p>
								<div class="flex gap-2">
									<BccButton label="Open (mask not closable)" @click="openStrict" />
									<BccButton label="Close" severity="secondary" outlined @click="close" />
								</div>
							</div>
						</template>`,
			},
		},
	},
	render: () => ({
		components: { BccButton },
		setup() {
			const status = ref('idle');
			const openStrict = () => {
				status.value = 'opening…';
				openBccLightbox({
					items: [imageSrc],
					maskClosable: false,
					onShow: () => {
						status.value = 'open (backdrop click disabled — use Close or Esc)';
					},
					onHide: () => {
						status.value = 'closed';
					},
				});
			};
			const close = () => closeBccLightbox();
			return { openStrict, close, status };
		},
		template: `
			<div class="flex flex-col gap-3">
				<p class="body-sm">Status: {{ status }}</p>
				<div class="flex gap-2">
					<BccButton label="Open (mask not closable)" @click="openStrict" />
					<BccButton label="Close" severity="secondary" outlined @click="close" />
				</div>
			</div>
		`,
	}),
};

/** String items are normalized to `{ src, type }` automatically. */
export const StringItems: Story = {
	parameters: {
		docs: {
			source: {
				code: `<script setup lang="ts">
						import { BccButton, openBccLightbox } from '@bcc-code/component-library-vue';

						const gallerySrcs = [
							'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg',
							'https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg',
							'https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg',
						];

						const open = () => openBccLightbox({ items: gallerySrcs });
						</script>

						<template>
							<div class="flex flex-col gap-3">
							<p class="body-sm text-subtle">Pass plain URL strings; type is inferred from the file extension.</p>
								<BccButton label="Open with string URLs only" @click="open" />
							</div>
						</template>`,
			},
		},
	},
	render: () => ({
		components: { BccButton },
		setup() {
			const open = () => openBccLightbox({ items: gallerySrcs });
			return { open };
		},
		template: `
			<div class="flex flex-col gap-3">
				<p class="body-sm text-subtle">Pass plain URL strings; type is inferred from the file extension.</p>
				<BccButton label="Open with string URLs only" @click="open" />
			</div>
		`,
	}),
};
