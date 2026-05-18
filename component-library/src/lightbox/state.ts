import type { App } from 'vue';
import { createVNode, reactive, readonly, render } from 'vue';

import BccLightbox from './BccLightbox.vue';
import { normalizeLightboxItems } from './detectMedia';
import { LIGHTBOX_KEY, type LightboxApi, type LightboxItem, type LightboxOpenOptions } from './types';

export type LightboxState = {
	visible: boolean;
	items: LightboxItem[];
	index: number;
	loop: boolean;
	maskClosable: boolean;
};

const state = reactive<LightboxState>({
	visible: false,
	items: [],
	index: 0,
	loop: false,
	maskClosable: true,
});

export const lightboxState = readonly(state);

let scrollLockCount = 0;
let activeCallbacks: Pick<LightboxOpenOptions, 'onShow' | 'onHide'> = {};
let mounted = false;

const lightboxApi: LightboxApi = {
	open: openLightbox,
	close: closeLightbox,
};

function lockBodyScroll() {
	if (scrollLockCount === 0) {
		document.body.style.overflow = 'hidden';
	}
	scrollLockCount += 1;
}

function unlockBodyScroll() {
	scrollLockCount = Math.max(0, scrollLockCount - 1);
	if (scrollLockCount === 0) {
		document.body.style.overflow = '';
	}
}

export function openLightbox(options: LightboxOpenOptions) {
	const items = normalizeLightboxItems(options.items);
	if (!items.length) {
		return;
	}

	state.items = items;
	state.index = Math.min(Math.max(options.index ?? 0, 0), items.length - 1);
	state.loop = options.loop ?? false;
	state.maskClosable = options.maskClosable ?? true;
	state.visible = true;
	activeCallbacks = { onShow: options.onShow, onHide: options.onHide };
	lockBodyScroll();
	activeCallbacks.onShow?.();
}

export function closeLightbox() {
	if (!state.visible) {
		return;
	}
	state.visible = false;
	unlockBodyScroll();
	activeCallbacks.onHide?.();
	activeCallbacks = {};
}

export function setLightboxIndex(index: number) {
	if (!state.items.length) {
		return;
	}
	state.index = Math.min(Math.max(index, 0), state.items.length - 1);
}

export function goToPreviousItem() {
	if (!state.items.length) {
		return;
	}
	if (state.index > 0) {
		state.index -= 1;
		return;
	}
	if (state.loop) {
		state.index = state.items.length - 1;
	}
}

export function goToNextItem() {
	if (!state.items.length) {
		return;
	}
	if (state.index < state.items.length - 1) {
		state.index += 1;
		return;
	}
	if (state.loop) {
		state.index = 0;
	}
}

export function canGoPrevious() {
	return state.loop || state.index > 0;
}

export function canGoNext() {
	return state.loop || state.index < state.items.length - 1;
}

export function installLightbox(app: App) {
	app.provide(LIGHTBOX_KEY, lightboxApi);

	if (mounted || typeof document === 'undefined') {
		return;
	}

	const container = document.createElement('div');
	container.setAttribute('data-bcc-lightbox-root', '');
	document.body.appendChild(container);

	const vnode = createVNode(BccLightbox);
	vnode.appContext = app._context;
	render(vnode, container);
	mounted = true;
}
