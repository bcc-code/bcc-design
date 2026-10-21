import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import { setBccApp } from '../../../appContext';
import { closeBccEmojiPicker, openBccEmojiPicker } from './state';

const isOpen = () => document.querySelector('.bcc-emoji-picker-popover') !== null;

describe('openBccEmojiPicker signal', () => {
	const anchor = document.createElement('button');

	// The first import of the popover (and PrimeVue) is slow under vitest; keep it out of the tests' timeouts.
	beforeAll(async () => {
		// jsdom has no ResizeObserver; PrimeVue's Popover uses it while open.
		vi.stubGlobal(
			'ResizeObserver',
			class {
				observe() {}
				unobserve() {}
				disconnect() {}
			}
		);
		document.body.appendChild(anchor);
		setBccApp(createApp({}).use(PrimeVue));
		await import('./BccEmojiPickerPopover.vue');
	}, 120_000);

	afterEach(async () => {
		await closeBccEmojiPicker();
		await vi.waitFor(() => expect(isOpen()).toBe(false));
	});

	it('does not open when the signal is already aborted', async () => {
		const controller = new AbortController();
		controller.abort();

		await openBccEmojiPicker({ anchor, onSelect: () => {}, signal: controller.signal });

		expect(isOpen()).toBe(false);
	});

	it('does not open when the signal is aborted while the picker is loading', async () => {
		const controller = new AbortController();

		const opening = openBccEmojiPicker({ anchor, onSelect: () => {}, signal: controller.signal });
		controller.abort();
		await opening;

		expect(isOpen()).toBe(false);
	});

	it('closes when the signal is aborted', async () => {
		const controller = new AbortController();

		await openBccEmojiPicker({ anchor, onSelect: () => {}, signal: controller.signal });
		await vi.waitFor(() => expect(isOpen()).toBe(true));

		controller.abort();
		await vi.waitFor(() => expect(isOpen()).toBe(false));
	});

	it('ignores the abort of an earlier open', async () => {
		const first = new AbortController();
		const other = document.createElement('button');
		document.body.appendChild(other);

		await openBccEmojiPicker({ anchor, onSelect: () => {}, signal: first.signal });
		await openBccEmojiPicker({ anchor: other, onSelect: () => {}, signal: new AbortController().signal });
		await vi.waitFor(() => expect(isOpen()).toBe(true));

		first.abort();
		await new Promise(resolve => setTimeout(resolve, 50));
		expect(isOpen()).toBe(true);
	});
});
