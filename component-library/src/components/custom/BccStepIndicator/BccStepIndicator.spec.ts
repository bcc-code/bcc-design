import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BccStepIndicator from './BccStepIndicator.vue';

describe('BccStepIndicator', () => {
	it('renders correctly with initial props', () => {
		const steps = ['Step 1', 'Step 2', 'Step 3'];
		const wrapper = mount(BccStepIndicator, {
			props: {
				modelValue: 1,
				steps: steps,
				additionalText: true,
			},
		});
		const indicators = wrapper.find('.bcc-step-indicator').findAll('div.bg-ctx');
		expect(indicators.length).toBe(steps.length);
		expect(wrapper.text()).toContain('Step 2 of 3'); // Checking for the header text
	});

	it('applies active class to the current step indicator', () => {
		const wrapper = mount(BccStepIndicator, {
			props: {
				modelValue: 0,
				steps: ['Step 1', 'Step 2'],
				additionalText: false,
			},
		});
		const indicators = wrapper.find('.bcc-step-indicator').findAll('div.bg-ctx');
		expect(indicators[0].classes()).toContain('w-6'); // active step is wider
		expect(indicators[1].classes()).toContain('w-1.5'); // inactive step
	});

	it('does not display step titles when additionalText is false', () => {
		const wrapper = mount(BccStepIndicator, {
			props: {
				modelValue: 1,
				steps: ['Step 1', 'Step 2', 'Step 3'],
				additionalText: false,
			},
		});
		expect(wrapper.find('.text-body-sm.text-text-subtlest').exists()).toBe(false);
	});

	it('displays step titles when additionalText is true', () => {
		const wrapper = mount(BccStepIndicator, {
			props: {
				modelValue: 1,
				steps: ['Step 1', 'Step 2', 'Step 3'],
				additionalText: true,
			},
		});
		const label = wrapper.find('.text-body-sm.text-text-subtlest');
		expect(label.exists()).toBe(true);
		expect(label.text()).toBe('Step 2');
	});
});
