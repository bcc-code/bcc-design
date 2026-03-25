<script setup lang="ts">
import type { VueComponent } from '@/types';
import PrimeSelectButton, { type SelectButtonProps as PrimeSelectButtonProps } from 'primevue/selectbutton';
import { computed, useAttrs } from 'vue';

export type SelectButtonProps = PrimeSelectButtonProps;

const props = defineProps<SelectButtonProps>();

const attrs = useAttrs();

function isIconComponent(icon: unknown): icon is object {
	return typeof icon === 'function' || (typeof icon === 'object' && icon !== null);
}

function getOptionLabel(option: unknown): string | VueComponent | null {
	if (typeof option === 'string') return option;
	if (!props.optionLabel) return null;
	if (typeof props.optionLabel === 'function') return props.optionLabel(option);
	return (option as Record<string, string>)[props.optionLabel as string];
}

function optionLabelIsIcon(option: unknown): boolean {
	const label = getOptionLabel(option);
	return label !== null && isIconComponent(label);
}

const selectButtonBindings = computed((): PrimeSelectButtonProps => {
	return { ...props, ...attrs } as PrimeSelectButtonProps;
});
</script>

<template>
	<PrimeSelectButton v-bind="selectButtonBindings">
		<template #option="{ option }">
			<slot name="option" :option="option">
				<component
					:is="getOptionLabel(option)"
					v-if="optionLabelIsIcon(option)"
					class="p-icon -my-0.5 shrink-0"
					:class="[size === 'small' ? 'size-4' : 'size-5']"
				/>
				<template v-else>
					{{ getOptionLabel(option) }}
				</template>
			</slot>
		</template>
	</PrimeSelectButton>
</template>
