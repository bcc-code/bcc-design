<script setup lang="ts">
import PVFloatLabel from 'primevue/floatlabel';
import PVIconField from 'primevue/iconfield';
import PVInputIcon from 'primevue/inputicon';
import PVInputText, { type InputTextProps } from 'primevue/inputtext';
import { computed, useAttrs, type Component } from 'vue';

defineOptions({ inheritAttrs: false });

export type BccInputProps = /* @vue-ignore */ InputTextProps & {
	icon?: Component;
	iconRight?: boolean;

	label?: string;
	floating?: boolean;

	helpText?: string;
};

const props = defineProps<BccInputProps>();
const attrs = useAttrs();

const model = defineModel<string>();

const inputTextBindings = computed((): InputTextProps => {
	// Omit BccInput-only props and modelValue (handled by v-model) when forwarding to PVInputText
	const { icon, iconRight, modelValue, ...rest } = props;
	void icon;
	void iconRight;
	void modelValue;
	return { ...rest, ...attrs } as InputTextProps;
});
</script>

<template>
	<component :is="floating ? PVFloatLabel : 'template'">
		<component :is="icon || iconRight ? PVIconField : 'template'">
			<PVInputIcon v-if="icon && iconRight !== true">
				<component :is="icon" :class="size === 'small' ? 'size-4' : 'size-5'" />
			</PVInputIcon>
			<PVInputText v-model="model" class="w-full" v-bind="inputTextBindings" />
			<PVInputIcon v-if="iconRight === true ? icon : iconRight">
				<component :is="iconRight === true ? icon : iconRight" :class="size === 'small' ? 'size-4' : 'size-5'" />
			</PVInputIcon>
		</component>
	</component>
</template>
