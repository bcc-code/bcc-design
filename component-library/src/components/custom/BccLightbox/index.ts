export { default as BccLightbox } from './BccLightbox.vue';
export { closeBccLightbox, openBccLightbox, useLightbox, usePinchPan } from './composables';
export { detectMediaType, normalizeLightboxItem, normalizeLightboxItems } from './detectMedia';
export { installBccLightbox, LightboxStore } from './state';
export { LIGHTBOX_KEY } from './types';
export type {
	LightboxApi,
	LightboxItem,
	LightboxItemInput,
	LightboxMediaType,
	LightboxOpenOptions,
	LightboxState,
} from './types';
