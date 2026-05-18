<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, RotateLeftIcon, RotateRightIcon } from '@bcc-code/icons-vue';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

import BccLightboxMedia from './BccLightboxMedia.vue';
import { LightboxStore } from './state';

const dialogRef = ref<HTMLElement | null>(null);
const closeButtonRef = ref<HTMLButtonElement | null>(null);
const mediaRef = ref<InstanceType<typeof BccLightboxMedia> | null>(null);

const currentItem = computed(() => LightboxStore.state.items[LightboxStore.state.index]);
const isCurrentImage = computed(() => currentItem.value?.type === 'image');
const hasMultiple = computed(() => LightboxStore.state.items.length > 1);
const showPrev = computed(() => hasMultiple.value && LightboxStore.canGoPrevious());
const showNext = computed(() => hasMultiple.value && LightboxStore.canGoNext());
const counterLabel = computed(() => `${LightboxStore.state.index + 1} / ${LightboxStore.state.items.length}`);

function close() {
	LightboxStore.closeLightbox();
}

function onBackdropClick() {
	if (LightboxStore.state.maskClosable) {
		close();
	}
}

function onSwipe(direction: 'left' | 'right') {
	if (direction === 'left') {
		LightboxStore.goToNextItem();
		return;
	}
	LightboxStore.goToPreviousItem();
}

function onKeydown(event: KeyboardEvent) {
	if (!LightboxStore.state.visible) {
		return;
	}
	switch (event.key) {
		case 'Escape':
			close();
			break;
		case 'ArrowLeft':
			LightboxStore.goToPreviousItem();
			break;
		case 'ArrowRight':
			LightboxStore.goToNextItem();
			break;
		default:
			break;
	}
}

watch(
	() => LightboxStore.state.visible,
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
			v-if="LightboxStore.state.visible && currentItem"
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
				@click="LightboxStore.goToPreviousItem"
			>
				<ChevronLeftIcon class="bcc-lightbox__icon" aria-hidden="true" />
			</button>

			<button
				v-if="showNext"
				type="button"
				class="bcc-lightbox__control bcc-lightbox__nav bcc-lightbox__nav--next"
				aria-label="Next"
				@click="LightboxStore.goToNextItem"
			>
				<ChevronRightIcon class="bcc-lightbox__icon" aria-hidden="true" />
			</button>

			<div class="bcc-lightbox__stage" @click.stop>
				<BccLightboxMedia
					ref="mediaRef"
					:key="`${currentItem.src}-${LightboxStore.state.index}`"
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
