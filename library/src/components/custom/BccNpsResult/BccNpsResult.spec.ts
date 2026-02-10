import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BccNpsResult from './BccNpsResult.vue';

describe('BccNpsResult', () => {
	it('renders a nps result', () => {
		expect(BccNpsResult).toBeTruthy();

		const wrapper = mount(BccNpsResult, {
			props: { score: 20 },
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
