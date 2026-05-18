import type { LightboxItem, LightboxItemInput, LightboxMediaType } from './types';

const VIDEO_PATTERN = /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i;

export function detectMediaType(src: string, type?: LightboxMediaType): LightboxMediaType {
	if (type) {
		return type;
	}
	return VIDEO_PATTERN.test(src) ? 'video' : 'image';
}

export function normalizeLightboxItem(input: LightboxItemInput): LightboxItem {
	if (typeof input === 'string') {
		return { src: input, type: detectMediaType(input) };
	}
	return {
		...input,
		type: detectMediaType(input.src, input.type),
	};
}

export function normalizeLightboxItems(items: LightboxItemInput[]): LightboxItem[] {
	return items.map(normalizeLightboxItem);
}
