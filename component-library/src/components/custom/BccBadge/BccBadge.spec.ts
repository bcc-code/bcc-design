import { describe, expect, it } from 'vitest';

import { CheckCircleIcon } from '@bcc-code/icons-vue';
import { mount } from '@vue/test-utils';
import BccBadge from './BccBadge.vue';

describe('BccBadge', () => {
	it('renders a pin', () => {
		expect(BccBadge).toBeTruthy();

		const wrapper = mount(BccBadge, {
			props: {
				icon: CheckCircleIcon,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
