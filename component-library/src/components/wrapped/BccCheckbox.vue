<script setup lang="ts">
import { CheckIcon, CheckIndeterminateSmallIcon } from '@bcc-code/icons-vue';
import PrimeCheckbox, { type CheckboxProps as PrimeCheckboxProps } from 'primevue/checkbox';
import { computed, useAttrs, useId } from 'vue';

defineOptions({ inheritAttrs: false });

export type CheckboxProps = PrimeCheckboxProps & {
	label?: string;
	labelLeft?: boolean;
	justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
	labelClass?: string;
};

const props = defineProps<CheckboxProps>();
const attrs = useAttrs();

const justifyClass = computed(() => {
	return props.justify ? `justify-${props.justify}` : '';
});

const bindings = computed((): PrimeCheckboxProps => {
	const { label, justify, ...rest } = props;
	void label;
	void justify;

	if (typeof rest.value === 'undefined') {
		rest.binary = true;
	}
	if (!rest.inputId) {
		rest.inputId = `checkbox-${useId()}`;
	}
	return { ...rest, ...attrs } as PrimeCheckboxProps;
});
</script>

<template>
	<div class="flex items-center gap-2" :class="justifyClass">
		<PrimeCheckbox v-bind="bindings">
			<template #icon="{ checked, indeterminate, class: IconClass }">
				<CheckIcon v-if="checked" class="text-icon-inverse size-full" :class="IconClass" />
				<CheckIndeterminateSmallIcon v-else-if="indeterminate" class="text-icon-subtlest size-full" />
			</template>
		</PrimeCheckbox>
		<label
			v-if="label || $slots.default"
			:for="bindings.inputId"
			:class="[
				size === 'large' ? 'body-lg' : 'body-md',
				{ 'text-disabled': disabled },
				{ '-order-1': labelLeft },
				labelClass,
			]"
		>
			<slot>{{ label }}</slot>
		</label>
	</div>
</template>
