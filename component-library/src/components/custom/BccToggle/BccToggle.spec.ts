import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import BccToggle from './BccToggle.vue';

describe('BccToggle', () => {
	it('renders a toggle in on or off state', () => {
		const wrapper = mount(BccToggle, { props: { modelValue: false } });
		expect(wrapper.html()).toMatchSnapshot();

		wrapper.setProps({ modelValue: true });
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('renders a label', () => {
		const wrapper = mount(BccToggle, {
			props: { label: 'Test label', modelValue: false },
		});

		expect(wrapper.text()).toBe('Test label');
		expect(wrapper.html()).toMatchSnapshot();
	});
});
