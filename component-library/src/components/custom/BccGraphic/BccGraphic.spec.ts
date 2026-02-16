import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import BccGraphic from './BccGraphic.vue';

const bannerSrc = 'https://event.bcc.no/wp-content/uploads/2023/10/Background-7.png';
const logoSrc = 'https://event.bcc.no/wp-content/uploads/2023/11/BUK4_Logo-Main.svg';

describe('BccGraphic', () => {
	it('renders graphic with banner and logo', () => {
		const wrapper = mount(BccGraphic, {
			props: {
				bannerSrc,
				logoSrc,
			},
		});
		expect(wrapper.html()).toContain(`src="${bannerSrc}"`);
		expect(wrapper.html()).toContain(`src="${logoSrc}"`);
	});

	it('renders with default rounding and ratio', () => {
		const wrapper = mount(BccGraphic, {
			props: {
				bannerSrc,
				logoSrc,
			},
		});
		expect(wrapper.html()).toContain('rounded-xl');
		expect(wrapper.html()).toContain('padding-bottom: 56.25%');
	});
});
