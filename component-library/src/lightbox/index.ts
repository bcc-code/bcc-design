export { default as BccLightbox } from './BccLightbox.vue';
export { closeBccLightbox, openBccLightbox, useLightbox, usePinchPan } from './composables';
export { detectMediaType, normalizeLightboxItem, normalizeLightboxItems } from './detectMedia';
export {
	canGoNext,
	canGoPrevious,
	closeLightbox,
	goToNextItem,
	goToPreviousItem,
	installLightbox,
	lightboxState,
	openLightbox,
	setLightboxIndex,
} from './state';
export type { LightboxState } from './state';
export { LIGHTBOX_KEY } from './types';
export type { LightboxApi, LightboxItem, LightboxItemInput, LightboxMediaType, LightboxOpenOptions } from './types';
