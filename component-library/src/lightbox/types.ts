import type { InjectionKey } from 'vue';

export type LightboxMediaType = 'image' | 'video';

export type LightboxItem = {
	src: string;
	type?: LightboxMediaType;
	alt?: string;
	title?: string;
	/** Poster image for video items. */
	poster?: string;
};

export type LightboxItemInput = string | LightboxItem;

export type LightboxOpenOptions = {
	items: LightboxItemInput[];
	index?: number;
	loop?: boolean;
	maskClosable?: boolean;
	onShow?: () => void;
	onHide?: () => void;
};

export type LightboxApi = {
	open: (options: LightboxOpenOptions) => void;
	close: () => void;
};

export const LIGHTBOX_KEY: InjectionKey<LightboxApi> = Symbol('bcc-lightbox');
