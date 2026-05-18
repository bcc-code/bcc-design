<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, RotateLeftIcon, RotateRightIcon } from '@bcc-code/icons-vue';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

import BccLightboxMedia from './BccLightboxMedia.vue';
import { canGoNext, canGoPrevious, closeLightbox, goToNextItem, goToPreviousItem, lightboxState } from './state';

const dialogRef = ref<HTMLElement | null>(null);
const closeButtonRef = ref<HTMLButtonElement | null>(null);
const mediaRef = ref<InstanceType<typeof BccLightboxMedia> | null>(null);

const currentItem = computed(() => lightboxState.items[lightboxState.index]);
const isCurrentImage = computed(() => currentItem.value?.type === 'image');
const hasMultiple = computed(() => lightboxState.items.length > 1);
const showPrev = computed(() => hasMultiple.value && canGoPrevious());
const showNext = computed(() => hasMultiple.value && canGoNext());
const counterLabel = computed(() => `${lightboxState.index + 1} / ${lightboxState.items.length}`);

function close() {
	closeLightbox();
}

function onBackdropClick() {
	if (lightboxState.maskClosable) {
		close();
	}
}

function onSwipe(direction: 'left' | 'right') {
	if (direction === 'left') {
		goToNextItem();
		return;
	}
	goToPreviousItem();
}

function onKeydown(event: KeyboardEvent) {
	if (!lightboxState.visible) {
		return;
	}
	switch (event.key) {
		case 'Escape':
			close();
			break;
		case 'ArrowLeft':
			goToPreviousItem();
			break;
		case 'ArrowRight':
			goToNextItem();
			break;
		default:
			break;
	}
}

watch(
	() => lightboxState.visible,
	async visible => {
		if (visible) {
			await nextTick();
			closeButtonRef.value?.focus();
		}
	}
);

onMounted(() => {
	window.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
	window.removeEventListener('keydown', onKeydown);
});
</script>

<template>
	<Teleport to="body">
		<div
			v-if="lightboxState.visible && currentItem"
			ref="dialogRef"
			class="bcc-lightbox"
			role="dialog"
			aria-modal="true"
			:aria-label="currentItem.alt ?? currentItem.title ?? 'Media preview'"
		>
			<div class="bcc-lightbox__backdrop" @click="onBackdropClick" />

			<header class="bcc-lightbox__header">
				<p v-if="hasMultiple" class="bcc-lightbox__counter">{{ counterLabel }}</p>
				<button ref="closeButtonRef" type="button" class="bcc-lightbox__control" aria-label="Close" @click="close">
					<CloseIcon class="bcc-lightbox__icon" aria-hidden="true" />
				</button>
			</header>

			<button
				v-if="showPrev"
				type="button"
				class="bcc-lightbox__control bcc-lightbox__nav bcc-lightbox__nav--prev"
				aria-label="Previous"
				@click="goToPreviousItem"
			>
				<ChevronLeftIcon class="bcc-lightbox__icon" aria-hidden="true" />
			</button>

			<button
				v-if="showNext"
				type="button"
				class="bcc-lightbox__control bcc-lightbox__nav bcc-lightbox__nav--next"
				aria-label="Next"
				@click="goToNextItem"
			>
				<ChevronRightIcon class="bcc-lightbox__icon" aria-hidden="true" />
			</button>

			<div class="bcc-lightbox__stage" @click.stop>
				<BccLightboxMedia
					ref="mediaRef"
					:key="`${currentItem.src}-${lightboxState.index}`"
					:item="currentItem"
					:zoom-enabled="true"
					@swipe="onSwipe"
				/>
			</div>

			<div v-if="isCurrentImage" class="bcc-lightbox__toolbar" role="toolbar" aria-label="Image tools">
				<button
					type="button"
					class="bcc-lightbox__toolbar-btn"
					aria-label="Rotate left"
					@click="mediaRef?.rotateLeft()"
				>
					<RotateLeftIcon class="bcc-lightbox__icon" aria-hidden="true" />
				</button>
				<button
					type="button"
					class="bcc-lightbox__toolbar-btn"
					aria-label="Rotate right"
					@click="mediaRef?.rotateRight()"
				>
					<RotateRightIcon class="bcc-lightbox__icon" aria-hidden="true" />
				</button>
			</div>
		</div>
	</Teleport>
</template>
