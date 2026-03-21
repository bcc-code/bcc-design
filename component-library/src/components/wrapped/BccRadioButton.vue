<script setup lang="ts">
import PrimeRadioButton, { type RadioButtonProps as PrimeRadioButtonProps } from 'primevue/radiobutton';
import { useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

export type RadioButtonProps = PrimeRadioButtonProps & {
	label?: string;
	labelLeft?: boolean;
};

const props = defineProps<RadioButtonProps>();
const attrs = useAttrs();
</script>

<template>
	<div class="flex items-center gap-2">
		<PrimeRadioButton v-bind="{ ...props, ...attrs }" />
		<label
			v-if="label"
			:for="inputId"
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
