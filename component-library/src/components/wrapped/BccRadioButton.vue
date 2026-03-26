<script setup lang="ts">
import PrimeRadioButton, { type RadioButtonProps as PrimeRadioButtonProps } from 'primevue/radiobutton';
import { computed, useAttrs, useId } from 'vue';

defineOptions({ inheritAttrs: false });

export type RadioButtonProps = PrimeRadioButtonProps & {
	label?: string;
	labelLeft?: boolean;
	justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
};

const props = defineProps<RadioButtonProps>();
const attrs = useAttrs();

const justifyClass = computed(() => {
	return props.justify ? `justify-${props.justify}` : '';
});

const radioButtonBindings = computed(() => {
	const bindings = { ...props, ...attrs };
	delete bindings.justify;

	if (!bindings.inputId) {
		bindings.inputId = `radio-button-${useId()}`;
	}

	return bindings;
});
</script>

<template>
	<div class="flex items-center gap-2" :class="justifyClass">
		<PrimeRadioButton v-bind="radioButtonBindings" />
		<label
			v-if="label"
			:for="radioButtonBindings.inputId"
			:class="[
				size === 'large' ? 'text-body-lg' : 'text-body-md',
				{ 'text-disabled': disabled },
				{ '-order-1': labelLeft },
			]"
		>
			<slot>{{ label }}</slot>
		</label>
	</div>
</template>
