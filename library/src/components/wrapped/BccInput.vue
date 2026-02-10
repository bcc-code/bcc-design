<script setup lang="ts">
import PVIconField from 'primevue/iconfield';
import PVInputIcon from 'primevue/inputicon';
import PVInputNumber, { type InputNumberProps } from 'primevue/inputnumber';
import PVInputText, { type InputTextProps } from 'primevue/inputtext';
import { computed, useAttrs, type Component } from 'vue';
import { BccCircleLoader } from '../custom';

defineOptions({ inheritAttrs: false });

export type BccInputProps = {
	id?: string;
	size?: InputTextProps['size'];

	icon?: Component;
	iconRight?: boolean;
	loading?: boolean;
	numeric?: boolean;
} & /* @vue-ignore */ (InputTextProps | ({ numeric: true } & /* @vue-ignore */ InputNumberProps));

const props = defineProps<BccInputProps>();
const attrs = useAttrs();

const model = defineModel<string>();

const inputBindings = computed(() => {
	// Omit BccInput-only props and modelValue (handled by v-model) when forwarding to PVInputText
	const { icon, iconRight, modelValue, ...rest } = props;
	void icon;
	void iconRight;
	void modelValue;

	return { ...rest, ...attrs } as InputTextProps;
});
</script>

<template>
	<PVIconField>
		<PVInputIcon v-if="icon && iconRight !== true">
			<component :is="icon" :class="size === 'small' ? 'size-4' : 'size-5'" />
		</PVInputIcon>
		<component :is="numeric ? PVInputNumber : PVInputText" v-model="model" class="w-full" v-bind="inputBindings" />
		<PVInputIcon v-if="loading" class="pi pi-spin pi-spinner">
			<BccCircleLoader :class="size === 'small' ? 'size-4' : 'size-5'" />
		</PVInputIcon>
		<PVInputIcon v-else-if="iconRight === true ? icon : iconRight">
			<component :is="iconRight === true ? icon : iconRight" :class="size === 'small' ? 'size-4' : 'size-5'" />
		</PVInputIcon>
	</PVIconField>
</template>
