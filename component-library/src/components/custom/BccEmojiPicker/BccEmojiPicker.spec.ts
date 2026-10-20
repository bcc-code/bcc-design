import { describe, expect, it } from 'vitest';

import { flushPromises, mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import BccEmojiPicker from './BccEmojiPicker.vue';
import { loadEmojiGroups, resolveEmojiLocale, searchEmojis } from './data';

// Emoji 17 data still has the redundant variation selector on emojis like 👍.
const plain = (emoji: string) => emoji.replace(/\uFE0F/g, '');
const global = { plugins: [PrimeVue] };

describe('BccEmojiPicker data', () => {
	it('falls back to supported locales', () => {
		expect(resolveEmojiLocale('nb-NO')).toBe('nb');
		expect(resolveEmojiLocale('no')).toBe('nb');
		expect(resolveEmojiLocale('ro')).toBe('en');
		expect(resolveEmojiLocale()).toBe('en');
	});

	it('groups emojis without the skin tone components', async () => {
		const groups = await loadEmojiGroups('en');

		expect(groups.map(group => group.key)).not.toContain('component');
		expect(groups[0]!.key).toBe('smileys-emotion');
		expect(groups[0]!.emojis.some(item => item.emoji === '😀')).toBe(true);
	});

	it('searches labels and keywords in the locale', async () => {
		const groups = await loadEmojiGroups('nb');

		expect(searchEmojis(groups, 'tommel opp').map(item => plain(item.emoji))).toContain('👍');
		expect(searchEmojis(groups, '  ')).toEqual([]);
	});
});

describe('BccEmojiPicker', () => {
	it('emits the emoji found by search', async () => {
		const wrapper = mount(BccEmojiPicker, { props: { locale: 'en' }, global });
		await flushPromises();

		await wrapper.find('input').setValue('thumbs up');
		const button = wrapper.find('button[aria-label="thumbs up"]');
		await button.trigger('click');

		expect(wrapper.emitted<[string]>('select')?.map(([emoji]) => plain(emoji))).toEqual(['👍']);
	});

	it('selects the first result with Enter and shows a message without results', async () => {
		const wrapper = mount(BccEmojiPicker, { props: { locale: 'en', noResultsText: 'Nothing' }, global });
		await flushPromises();
		const input = wrapper.find('input');

		await input.setValue('grinning face');
		await input.trigger('keydown', { key: 'Enter' });
		expect(wrapper.emitted('select')?.[0]).toEqual(['😀']);

		await input.setValue('zzzz');
		expect(wrapper.text()).toContain('Nothing');
	});
});
