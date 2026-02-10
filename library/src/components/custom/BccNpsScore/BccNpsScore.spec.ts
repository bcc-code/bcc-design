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
});
