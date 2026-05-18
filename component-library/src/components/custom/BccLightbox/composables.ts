import { computed, inject, ref, type Ref } from 'vue';

import { closeLightbox, openLightbox } from './state';
import { LIGHTBOX_KEY, type LightboxApi } from './types';

const MIN_SCALE = 1;
const MAX_SCALE = 4;

type PointerPoint = { x: number; y: number };

function getDistance(a: PointerPoint, b: PointerPoint) {
	const dx = a.x - b.x;
	const dy = a.y - b.y;
	return Math.hypot(dx, dy);
}

export function useLightbox(): LightboxApi {
	const api = inject(LIGHTBOX_KEY);
	if (!api) {
		throw new Error('[BccImage] Lightbox is not installed. Call app.use(BccComponentLibrary) in your app setup.');
	}
	return api;
}

/** Open the global lightbox without using inject (e.g. imperative usage). */
export const openBccLightbox = openLightbox;

/** Close the global lightbox without using inject. */
export const closeBccLightbox: LightboxApi['close'] = closeLightbox;

export function usePinchPan(
	zoomEnabled: Ref<boolean>,
	options?: {
		swipeEnabled?: Ref<boolean>;
		onSwipe?: (direction: 'left' | 'right') => void;
		swipeThreshold?: number;
	}
) {
	const swipeEnabled = options?.swipeEnabled ?? ref(true);
	const scale = ref(1);
	const translateX = ref(0);
	const translateY = ref(0);

	const pointers = new Map<number, PointerPoint>();
	let pinchStartDistance = 0;
	let pinchStartScale = 1;
	let panStartX = 0;
	let panStartY = 0;
	let swipeStartX = 0;
	let swipeStartY = 0;
	let swipeTracking = false;

	const transformStyle = computed(() => ({
		transform: `translate3d(${translateX.value}px, ${translateY.value}px, 0) scale(${scale.value})`,
	}));

	const swipeThreshold = options?.swipeThreshold ?? 56;

	function reset() {
		scale.value = 1;
		translateX.value = 0;
		translateY.value = 0;
		pointers.clear();
		pinchStartDistance = 0;
		swipeTracking = false;
	}

	function clampScale(value: number) {
		return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
	}

	function onPointerDown(event: PointerEvent) {
		if (!zoomEnabled.value && !swipeEnabled.value) {
			return;
		}
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
		pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

		if (pointers.size === 1) {
			panStartX = translateX.value;
			panStartY = translateY.value;
			swipeStartX = event.clientX;
			swipeStartY = event.clientY;
			swipeTracking = scale.value <= 1;
		}

		if (pointers.size === 2) {
			const [first, second] = [...pointers.values()];
			pinchStartDistance = getDistance(first, second);
			pinchStartScale = scale.value;
			swipeTracking = false;
		}
	}

	function onPointerMove(event: PointerEvent) {
		if (!pointers.has(event.pointerId)) {
			return;
		}

		pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

		if (pointers.size >= 2 && zoomEnabled.value) {
			const [first, second] = [...pointers.values()];
			const distance = getDistance(first, second);
			if (pinchStartDistance > 0) {
				const nextScale = clampScale((distance / pinchStartDistance) * pinchStartScale);
				scale.value = nextScale;
				if (nextScale <= 1) {
					translateX.value = 0;
					translateY.value = 0;
				}
			}
			return;
		}

		const point = pointers.get(event.pointerId);
		if (!point) {
			return;
		}

		const start = { x: swipeStartX, y: swipeStartY };
		const dx = point.x - start.x;
		const dy = point.y - start.y;

		if (zoomEnabled.value && scale.value > 1) {
			translateX.value = panStartX + dx;
			translateY.value = panStartY + dy;
		}
	}

	function onPointerUp(event: PointerEvent) {
		if (!pointers.has(event.pointerId)) {
			return;
		}

		const point = pointers.get(event.pointerId)!;
		pointers.delete(event.pointerId);

		if (pointers.size === 0 && swipeEnabled.value && swipeTracking && scale.value <= 1) {
			const dx = point.x - swipeStartX;
			const dy = point.y - swipeStartY;
			if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) >= swipeThreshold) {
				options?.onSwipe?.(dx < 0 ? 'left' : 'right');
			}
		}

		if (pointers.size < 2) {
			pinchStartDistance = 0;
		}

		if (pointers.size === 1) {
			const remaining = [...pointers.values()][0];
			panStartX = translateX.value;
			panStartY = translateY.value;
			swipeStartX = remaining.x;
			swipeStartY = remaining.y;
			swipeTracking = scale.value <= 1;
		}

		if (scale.value <= 1) {
			scale.value = 1;
			translateX.value = 0;
			translateY.value = 0;
		}
	}

	function onWheel(event: WheelEvent) {
		if (!zoomEnabled.value) {
			return;
		}
		event.preventDefault();
		const delta = event.deltaY < 0 ? 0.12 : -0.12;
		const nextScale = clampScale(scale.value + delta);
		scale.value = nextScale;
		if (nextScale <= 1) {
			translateX.value = 0;
			translateY.value = 0;
		}
	}

	return {
		scale,
		transformStyle,
		reset,
		onPointerDown,
		onPointerMove,
		onPointerUp,
		onWheel,
	};
}
