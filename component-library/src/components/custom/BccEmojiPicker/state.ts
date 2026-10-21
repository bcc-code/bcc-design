import { createVNode, render, type ComponentPublicInstance } from 'vue';

import { getBccAppContext } from '../../../appContext';
import type { EmojiPickerOpenOptions } from './data';

type PopoverApi = ComponentPublicInstance & {
	show: (options: EmojiPickerOpenOptions) => Promise<void>;
	hide: () => void;
	isOpenFor: (anchor: HTMLElement) => boolean;
};

let popover: Promise<PopoverApi> | null = null;

// Loaded on first use, so apps that never open the picker don't download it.
function mountPopover(): Promise<PopoverApi> {
	popover ??= import('./BccEmojiPickerPopover.vue').then(({ default: BccEmojiPickerPopover }) => {
		const container = document.createElement('div');
		container.setAttribute('data-bcc-emoji-picker-root', '');
		document.body.appendChild(container);

		const vnode = createVNode(BccEmojiPickerPopover);
		vnode.appContext = getBccAppContext();
		render(vnode, container);
		return vnode.component!.exposed as PopoverApi;
	});
	popover.catch(() => (popover = null));
	return popover;
}

/**
 * Opens the emoji picker next to `anchor`. Calling it again with the same anchor while the
 * picker is open closes it, so it can be used directly as a button's click handler.
 */
export async function openBccEmojiPicker(options: EmojiPickerOpenOptions): Promise<void> {
	if (options.signal?.aborted) return;
	const api = await mountPopover();
	if (options.signal?.aborted) return;
	if (api.isOpenFor(options.anchor)) {
		api.hide();
		return;
	}
	await api.show(options);
}

export async function closeBccEmojiPicker(): Promise<void> {
	if (popover) (await popover).hide();
}
