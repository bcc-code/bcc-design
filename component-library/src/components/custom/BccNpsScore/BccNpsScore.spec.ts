import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BccNpsScore from './BccNpsScore.vue';

describe('BccNpsScore', () => {
	it('renders a nps score', () => {
		expect(BccNpsScore).toBeTruthy();

		const wrapper = mount(BccNpsScore, {
			props: {},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	it('does not render the heading when leftLabel and rightLabel are empty', () => {
		const wrapper = mount(BccNpsScore, {
			props: {
				leftLabel: '',
				rightLabel: '',
			},
		});

		expect(wrapper.find('.bcc-nps-score--heading').exists()).toBe(false);
	});
});
