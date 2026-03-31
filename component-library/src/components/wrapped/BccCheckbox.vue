<script setup lang="ts">
import { CheckIcon, CheckIndeterminateSmallIcon } from '@bcc-code/icons-vue';
import PrimeCheckbox, { type CheckboxProps as PrimeCheckboxProps } from 'primevue/checkbox';
import { computed, useAttrs, useId } from 'vue';

defineOptions({ inheritAttrs: false });

export type CheckboxProps = PrimeCheckboxProps & {
	label?: string;
	labelLeft?: boolean;
};

const props = defineProps<CheckboxProps>();
const attrs = useAttrs();

const bindings = computed((): PrimeCheckboxProps => {
	const { label, ...rest } = props;
	void label;
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
	<div class="flex items-center gap-2">
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
				size === 'large' ? 'text-body-lg' : 'text-body-md',
				{ 'text-disabled': disabled },
				{ '-order-1': labelLeft },
			]"
		>
			<slot>{{ label }}</slot>
		</label>
	</div>
</template>
