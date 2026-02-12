<script setup lang="ts">
import PrimeButton, { type ButtonProps as PrimeButtonProps } from 'primevue/button';
import { computed, type Component, type FunctionalComponent, type VNode, type VueElement } from 'vue';

export type ButtonProps = Omit<PrimeButtonProps, 'icon' | 'iconPos'> & {
	icon: Component | FunctionalComponent | VueElement | VNode;
	iconRight?: boolean;
};

const props = defineProps<ButtonProps>();

const buttonBindings = computed((): PrimeButtonProps => {
	const { icon, iconRight, ...rest } = props;
	void icon;
	void iconRight;

	const forward = rest as PrimeButtonProps;
	if (iconRight) forward.iconPos = 'right';
	return forward;
});
</script>

<template>
	<PrimeButton v-bind="buttonBindings">
		<template #icon>
			<component :is="icon" :class="[iconClass, { 'order-1': iconRight }, size === 'large' ? 'size-6' : 'size-5']" />
		</template>
		<slot />
	</PrimeButton>
</template>
