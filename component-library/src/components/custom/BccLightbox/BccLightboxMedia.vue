<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { usePinchPan } from './composables';
import type { LightboxItem } from './types';

const props = defineProps<{
	item: LightboxItem;
	zoomEnabled: boolean;
}>();

const emit = defineEmits<{
	swipe: [direction: 'left' | 'right'];
}>();

const isImage = computed(() => props.item.type === 'image');
const zoomEnabled = computed(() => props.zoomEnabled && isImage.value);
const rotation = ref(0);

const { transformStyle, reset, onPointerDown, onPointerMove, onPointerUp, onWheel } = usePinchPan(zoomEnabled, {
	onSwipe: direction => emit('swipe', direction),
});

const mediaTransformStyle = computed(() => ({
	transform: `${transformStyle.value.transform} rotate(${rotation.value}deg)`,
}));

function rotateLeft() {
	rotation.value -= 90;
}

function rotateRight() {
	rotation.value += 90;
}

function resetView() {
	reset();
	rotation.value = 0;
}

watch(
	() => props.item.src,
	() => resetView()
);

defineExpose({
	isImage,
	rotateLeft,
	rotateRight,
});
</script>

<template>
	<div
		class="bcc-lightbox__media"
		:class="{ 'bcc-lightbox__media--zoomable': zoomEnabled }"
		@pointerdown="onPointerDown"
		@pointermove="onPointerMove"
		@pointerup="onPointerUp"
		@pointercancel="onPointerUp"
		@wheel.prevent="onWheel"
	>
		<div class="bcc-lightbox__transform" :style="mediaTransformStyle">
			<img v-if="isImage" :src="item.src" :alt="item.alt ?? ''" class="bcc-lightbox__image" draggable="false" />
			<video
				v-else
				:key="item.src"
				class="bcc-lightbox__video"
				:src="item.src"
				:poster="item.poster"
				controls
				playsinline
				preload="metadata"
			/>
		</div>
		<p v-if="item.title" class="bcc-lightbox__caption">{{ item.title }}</p>
	</div>
</template>
