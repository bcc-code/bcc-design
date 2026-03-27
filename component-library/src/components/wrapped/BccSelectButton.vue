<script setup lang="ts">
import type { VueComponent } from '@/types';
import PrimeSelectButton, { type SelectButtonProps as PrimeSelectButtonProps } from 'primevue/selectbutton';
import { computed, useAttrs } from 'vue';

export type SelectButtonProps = PrimeSelectButtonProps & {
	optionIcon?: string | ((option: unknown) => VueComponent | null);
};

const props = defineProps<SelectButtonProps>();

const attrs = useAttrs();

function isIconComponent(icon: unknown): icon is object {
	return typeof icon === 'function' || (typeof icon === 'object' && icon !== null);
}

function getOptionLabel(option: unknown): string | VueComponent | null {
	if (typeof props.optionLabel === 'function') return props.optionLabel(option);
	if (typeof option === 'string') return option;
	if (!props.optionLabel) return null;
	return (option as Record<string, string>)[props.optionLabel as string];
}

type HasIcon = {
	icon: VueComponent;
};

function getOptionIcon(option: unknown): VueComponent | null {
	if (typeof props.optionIcon === 'function') return props.optionIcon(option);
	if (typeof props.optionIcon === 'string')
		return (option as Record<string, unknown>)[props.optionIcon as string] as VueComponent | null;
	if (option && (option as HasIcon).icon && isIconComponent((option as HasIcon).icon)) return (option as HasIcon).icon;
	return null;
}

const selectButtonBindings = computed((): SelectButtonProps => {
	const bindings = { ...props, ...attrs } as SelectButtonProps;

	delete bindings.optionLabel;
	delete bindings.optionIcon;

	bindings.optionLabel ??= () => '';

	return bindings;
});
</script>

<template>
	<PrimeSelectButton v-bind="selectButtonBindings">
		<template #option="{ option }">
			<slot name="option" :option="option">
				<component
					:is="getOptionIcon(option)"
					class="p-icon -my-0.5 shrink-0"
					:class="[size === 'small' ? 'size-4' : 'size-5']"
				/>
				{{ getOptionLabel(option) }}
			</slot>
		</template>
	</PrimeSelectButton>
</template>
