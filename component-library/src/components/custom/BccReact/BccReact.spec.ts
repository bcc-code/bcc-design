import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import BccReact from './BccReact.vue';

describe('BccReact', () => {
	it('renders reactions', () => {
		expect(BccReact).toBeTruthy();

		const wrapper = mount(BccReact, {
			props: {
				emojis: [
					{
						id: 'thumbsup',
						emoji: '👍',
						count: 1,
					},
					{
						id: 'happy',
						emoji: '😃',
						count: 4,
					},
				],
			},
		});

		expect(wrapper.text()).toContain('4');
		expect(wrapper.text()).not.toContain('1');
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('limits visible active reactions and enables horizontal scroll', () => {
		const wrapper = mount(BccReact, {
			props: {
				max: 3,
				emojis: [
					{ id: 'thumbsup', emoji: '👍', count: 8 },
					{ id: 'happy', emoji: '😃', count: 7 },
					{ id: 'fire', emoji: '🔥', count: 6 },
					{ id: 'rocket', emoji: '🚀', count: 5 },
				],
			},
		});

		const list = wrapper.get('.bcc-react-list');
		expect(list.classes()).toContain('bcc-react-list--limited');
		expect(list.attributes('style')).toContain('--bcc-react-max-visible: 3');
	});
});
