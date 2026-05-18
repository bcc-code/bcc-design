<script setup lang="ts">
import { PreviewIcon } from '@bcc-code/icons-vue';
import { computed, useAttrs, type StyleValue } from 'vue';

import { useLightbox } from '../BccLightbox/composables';
import { normalizeLightboxItems } from '../BccLightbox/detectMedia';
import type { LightboxItemInput } from '../BccLightbox/types';

export type { LightboxItem, LightboxItemInput, LightboxMediaType } from '../BccLightbox/types';

export type ImageProps = {
	/** Image URL for the thumbnail and lightbox (when `imgs` is not set). */
	src?: string;
	/** Enables click-to-preview in the global lightbox. */
	preview?: boolean;
	/** Inline style applied to the thumbnail `<img>`. */
	imageStyle?: StyleValue;
	/** Class applied to the thumbnail `<img>`. */
	imageClass?: string | Record<string, boolean> | Array<string | Record<string, boolean>>;
	/** Gallery items for the lightbox. Falls back to `src` when omitted. */
	imgs?: LightboxItemInput[];
	/** Index of the item shown when the lightbox opens. */
	index?: number;
	/** Allow looping when navigating a gallery. */
	loop?: boolean;
	/** Close the lightbox when clicking the backdrop. */
	maskClosable?: boolean;
	/** Accessible label for the preview trigger button. */
	previewAriaLabel?: string;
};

defineOptions({
	inheritAttrs: false,
});

const props = withDefaults(defineProps<ImageProps>(), {
	preview: false,
	index: 0,
	loop: false,
	maskClosable: true,
	previewAriaLabel: 'View image',
});

const emit = defineEmits<{
	error: [event: Event];
	show: [];
	hide: [];
}>();

const lightbox = useLightbox();
const attrs = useAttrs();

const rootClass = computed(() => attrs.class);
const rootStyle = computed(() => attrs.style as StyleValue | undefined);

const imgAttrs = computed(() => {
	const { class: _class, style: _style, ...rest } = attrs;
	void _class;
	void _style;
	return rest;
});

const lightboxItems = computed((): LightboxItemInput[] => {
	if (props.imgs?.length) {
		return props.imgs;
	}
	if (props.src) {
		const alt = typeof imgAttrs.value.alt === 'string' ? imgAttrs.value.alt : undefined;
		const title = typeof imgAttrs.value.title === 'string' ? imgAttrs.value.title : undefined;
		return [{ src: props.src, alt, title }];
	}
	return [];
});

const openPreview = () => {
	const items = normalizeLightboxItems(lightboxItems.value);
	if (!props.preview || !items.length) {
		return;
	}

	lightbox.open({
		items,
		index: props.index,
		loop: props.loop,
		maskClosable: props.maskClosable,
		onShow: () => emit('show'),
		onHide: () => emit('hide'),
	});
};

const onError = (event: Event) => {
	emit('error', event);
};
</script>

<template>
	<span class="bcc-image" :class="[rootClass, { 'bcc-image--preview': preview }]" :style="rootStyle">
		<slot name="image">
			<img :src="src" :class="['bcc-image__img', imageClass]" :style="imageStyle" v-bind="imgAttrs" @error="onError" />
		</slot>

		<button
			v-if="preview"
			type="button"
			class="bcc-image__preview-mask"
			:aria-label="previewAriaLabel"
			@click="openPreview"
		>
			<slot name="previewicon">
				<slot name="indicatoricon">
					<PreviewIcon class="bcc-image__preview-icon" aria-hidden="true" />
				</slot>
			</slot>
		</button>
	</span>
</template>
