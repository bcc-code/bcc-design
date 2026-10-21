import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import { defineComponent, ref, type Component } from 'vue';
import BccInput from './BccInput.vue';
import BccTextarea from './BccTextarea.vue';

describe.each([
	{ name: 'BccTextarea', component: BccTextarea as Component, selector: 'textarea' },
	{ name: 'BccInput', component: BccInput as Component, selector: 'input' },
])('$name insertAtCaret', ({ component, selector }) => {
	it('inserts at the caret, replaces the selection and updates v-model', async () => {
		const Host = defineComponent({
			components: { Field: component },
			setup: () => ({ value: ref('Hello world') }),
			template: '<Field ref="field" v-model="value" />',
		});
		const wrapper = mount(Host, { global: { plugins: [PrimeVue] } });
		const field = wrapper.vm.$refs.field as { insertAtCaret: (text: string) => void };
		const element = wrapper.find(selector).element as HTMLInputElement;

		element.setSelectionRange(5, 5);
		field.insertAtCaret(' 👋');
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.value).toBe('Hello 👋 world');

		element.setSelectionRange(0, 5);
		field.insertAtCaret('Hi');
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.value).toBe('Hi 👋 world');
	});
});
