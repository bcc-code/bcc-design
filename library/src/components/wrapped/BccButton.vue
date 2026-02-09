<script setup lang="ts">
import PVButton, { type ButtonProps } from 'primevue/button';
import { computed, useAttrs, type Component } from 'vue';

defineOptions({ inheritAttrs: false });

export type BccButtonProps = /* @vue-ignore */ Omit<ButtonProps, 'icon' | 'iconPos'> & {
	icon?: Component;
	iconRight?: boolean;
};

const props = defineProps<BccButtonProps>();
const attrs = useAttrs();

const buttonBindings = computed((): ButtonProps => {
	const { icon, iconRight, ...rest } = props;
	void icon;
	void iconRight;
	return { ...rest, ...attrs } as ButtonProps;
});
</script>

<template>
	<PVButton v-bind="buttonBindings">
		<template v-if="icon">
			<component :is="icon" :class="[iconClass, { 'order-1': iconRight }, size === 'large' ? 'size-6' : 'size-5']" />
		</template>
		<slot />
	</PVButton>
</template>
