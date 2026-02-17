<script setup lang="ts">
import type { VueComponent } from '@/types';
import PrimeButton, { type ButtonProps as PrimeButtonProps } from 'primevue/button';
import { computed } from 'vue';

export type ButtonProps = {
	icon?: VueComponent;
	iconRight?: boolean;

	useCtx?: boolean;
} & /* @vue-ignore */ Omit<PrimeButtonProps, 'icon' | 'iconPos'>;

const props = defineProps<ButtonProps>();

const buttonBindings = computed((): PrimeButtonProps => {
	const { icon, iconRight, useCtx, ...rest } = props;
	void icon;
	void iconRight;

	const forward = rest as PrimeButtonProps;
	if (iconRight) forward.iconPos = 'right';
	if (useCtx) forward.severity = 'primary';
	return forward;
});
</script>

<template>
	<PrimeButton v-bind="buttonBindings" :class="{ useCtx }">
		<template #icon>
			<component :is="icon" :class="[iconClass, { 'order-1': iconRight }, size === 'large' ? 'size-6' : 'size-5']" />
		</template>
		<slot />
	</PrimeButton>
</template>

<style>
.p-button.useCtx {
	--p-button-primary-color: var(--ctx-text);
	--p-button-primary-background: var(--ctx-background);
	--p-button-primary-border-color: var(--ctx-border);
	--p-button-primary-hover-background: var(--ctx-background-hover);
	--p-button-primary-hover-border-color: var(--ctx-border-hover);
	--p-button-primary-hover-color: var(--ctx-text-hover);
	--p-button-primary-active-background: var(--ctx-background-pressed);
	--p-button-primary-active-border-color: var(--ctx-border-pressed);
	--p-button-primary-active-color: var(--ctx-text-pressed);
}
</style>
