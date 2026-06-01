import { describe, expect, it } from 'vitest';

import { InfoIcon } from '@bcc-code/icons-vue';
import { mount } from '@vue/test-utils';
import BccCallout from './BccCallout.vue';

describe('BccCallout', () => {
	it('renders a callout with title and message', () => {
		expect(BccCallout).toBeTruthy();

		const wrapper = mount(BccCallout, {
			props: {
				title: 'Test Title',
				message: 'Test message content',
				icon: true,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	it('renders a callout with custom icon', () => {
		const wrapper = mount(BccCallout, {
			props: {
				title: 'Custom Icon',
				message: 'Message with custom icon',
				icon: InfoIcon,
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});

	it('renders a callout with actions slot', () => {
		const wrapper = mount(BccCallout, {
			props: {
				title: 'Title',
				message: 'Message',
			},
			slots: {
				actions: '<button>Action Button</button>',
			},
		});

		expect(wrapper.html()).toMatchSnapshot();
	});
});
