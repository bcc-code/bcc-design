<script setup lang="ts" generic="T">
import { useScroll } from '@vueuse/core';
import { nextTick, onUnmounted, useTemplateRef, watch } from 'vue';
import { BccStepIndicator } from '../../../index';
import { initiateSlider } from './slider';

export type CarouselProps<T> = {
	value: Array<T>;
	containerClass?: string;
	contentClass?: string;
	itemClass?: string;
	dots?: 'justify-center' | 'justify-start' | 'justify-end';
	showIndicators?: boolean;
	autoplayInterval?: number;
};

const props = withDefaults(defineProps<CarouselProps<T>>(), {
	contentClass: 'px-4 gap-4',
	itemClass: 'w-5/6 sm:w-2/5 md:w-2/5',
	showIndicators: true,
	autoplayInterval: 0,
});

const activeSlide = defineModel<number>({ default: 0 });

const slider = useTemplateRef<HTMLDivElement>('slider');
const { x } = useScroll(slider, { throttle: 50 });

watch(slider, () => {
	initiateSlider(slider.value);
	findCenteredSlide();
});

let interval: ReturnType<typeof setInterval>;
let pause = 0;
let isAuto = false;
if (props.autoplayInterval > 0) {
	interval = setInterval(() => {
		if (pause > 0) {
			pause--;
			return;
		}

		isAuto = true;
		activeSlide.value = (activeSlide.value + 1) % props.value.length;
		setTimeout(() => {
			isAuto = false;
		}, 300);
	}, props.autoplayInterval * 1000);
}

onUnmounted(() => {
	if (interval) {
		clearInterval(interval);
	}
});

let viewingSlide = 0;

watch(activeSlide, () => {
	if (viewingSlide === activeSlide.value) return;
	viewingSlide = activeSlide.value;
	const container = slider.value as HTMLElement;
	if (!container) return;

	const el = container.children[activeSlide.value] as HTMLElement;
	if (!el) return;

	const center = container.offsetWidth / 2;

	if (el.offsetLeft < center) {
		x.value = el.offsetLeft;
	} else {
		x.value = el.offsetLeft - center;
	}
});

watch(
	() => props.value.length,
	() => {
		nextTick(() => {
			findCenteredSlide();
		});
	}
);

watch(x, () => {
	if (isAuto) return;

	findCenteredSlide();
});

function findCenteredSlide() {
	if (!slider.value) return;

	const container = slider.value;
	const containerRect = container.getBoundingClientRect();
	const containerCenter = containerRect.left + containerRect.width / 2;

	const children = Array.from(container.querySelectorAll('.scroll-snap-x-child'));
	let closestIndex = 0;
	let closestDistance = Infinity;

	children.forEach((child, index) => {
		if (index >= props.value.length) return; // Skip the "end" slot

		const childRect = child.getBoundingClientRect();
		const childCenter = childRect.left + childRect.width / 2;
		const distance = Math.abs(containerCenter - childCenter);

		if (distance < closestDistance) {
			closestDistance = distance;
			closestIndex = index;
		}
	});

	if (closestIndex !== activeSlide.value) {
		viewingSlide = closestIndex;
		activeSlide.value = closestIndex;
	}
}
</script>

<template>
	<div :class="containerClass">
		<div ref="slider" class="scroll-snap-x-container pb-3" :class="contentClass">
			<div v-for="(item, index) of value" :key="index" class="scroll-snap-x-child grow" :class="itemClass">
				<slot name="item" :item="item" :index="index"></slot>
			</div>
			<div v-if="$slots.end" class="scroll-snap-x-child" :class="itemClass">
				<slot name="end"></slot>
			</div>
		</div>
		<BccStepIndicator
			v-if="showIndicators"
			v-model="activeSlide"
			:steps="Array.from({ length: value.length })"
			hide-text
			clickable
			@click="pause = 5"
		/>
	</div>
</template>
