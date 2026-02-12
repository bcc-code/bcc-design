<script setup lang="ts">
import BccIconField from 'primevue/iconfield';
import BccInputIcon from 'primevue/inputicon';
import BccInputNumber, { type InputNumberProps } from 'primevue/inputnumber';
import BccInputText, { type InputTextProps } from 'primevue/inputtext';
import { computed, useAttrs, type Component } from 'vue';
import { BccCircleLoader } from '../custom';

defineOptions({ inheritAttrs: false });

export type InputProps = {
	id?: string;
	size?: InputTextProps['size'];

	icon?: Component;
	iconRight?: boolean;
	loading?: boolean;
	numeric?: boolean;
} & /* @vue-ignore */ (InputTextProps | ({ numeric: true } & InputNumberProps));

const props = defineProps<InputProps>();
const attrs = useAttrs();

const inputBindings = computed((): InputTextProps => {
	const { icon, iconRight, ...rest } = props as InputProps & Record<string, unknown>;
	void icon;
	void iconRight;
	return { ...rest, ...attrs } as InputTextProps;
});
</script>

<template>
	<BccIconField>
		<BccInputIcon v-if="icon && iconRight !== true">
			<component :is="icon" class="size-full" />
		</BccInputIcon>
		<component :is="numeric ? BccInputNumber : BccInputText" class="w-full" v-bind="inputBindings" />
		<BccInputIcon v-if="loading" class="pi pi-spin pi-spinner">
			<BccCircleLoader class="size-full" />
		</BccInputIcon>
		<BccInputIcon v-else-if="iconRight === true ? icon : iconRight">
			<component :is="iconRight === true ? icon : iconRight" class="size-full" />
		</BccInputIcon>
	</BccIconField>
</template>

<style>
.p-inputicon {
	--icon-size: 20px; /* Default icon size */

	font-size: var(--icon-size);
	width: var(--icon-size);
	height: var(--icon-size);
	margin-top: calc(-1 * (var(--icon-size) / 2));
}
.p-iconfield:has(.p-inputfield-sm) .p-inputicon {
	--icon-size: 16px;
}
.p-iconfield:has(.p-inputfield-lg) .p-inputicon {
	--icon-size: 24px;
}
</style>
