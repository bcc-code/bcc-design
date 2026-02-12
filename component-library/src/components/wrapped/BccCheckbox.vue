<script setup lang="ts">
import { CheckIcon, CheckIndeterminateSmallIcon } from '@bcc-code/icons-vue';
import PrimeCheckbox, { type CheckboxProps as PrimeCheckboxProps } from 'primevue/checkbox';
import { computed, useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

export type CheckboxProps = PrimeCheckboxProps & {
	label?: string;
};

const props = defineProps<CheckboxProps>();
const attrs = useAttrs();

const bindings = computed((): PrimeCheckboxProps => {
	const { label, ...rest } = props;
	void label;
	if (typeof rest.value === 'undefined') {
		rest.binary = true;
	}
	return { ...rest, ...attrs } as PrimeCheckboxProps;
});
</script>

<template>
	<div class="flex items-center gap-2">
		<PrimeCheckbox v-bind="bindings">
			<template #icon="{ checked, indeterminate }">
				<CheckIcon v-if="checked" class="text-icon-inverse size-full" />
				<CheckIndeterminateSmallIcon v-else-if="indeterminate" class="text-icon-subtlest size-full" />
			</template>
			<slot />
		</PrimeCheckbox>
		<label
			v-if="label"
			:for="inputId"
			:class="[size === 'large' ? 'text-body-lg' : 'text-body-md', { 'text-disabled': disabled }]"
		>
			{{ label }}
		</label>
	</div>
</template>
