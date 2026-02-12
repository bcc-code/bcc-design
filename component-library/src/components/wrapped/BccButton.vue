<script setup lang="ts">
import PrimeButton, { type ButtonProps as PrimeButtonProps } from 'primevue/button';
import { computed, useAttrs, type Component } from 'vue';

defineOptions({ inheritAttrs: false });

export type ButtonProps = /* @vue-ignore */ Omit<PrimeButtonProps, 'icon' | 'iconPos'> & {
	icon?: Component;
	iconRight?: boolean;
};

const props = defineProps<ButtonProps>();
const attrs = useAttrs();

const buttonBindings = computed((): PrimeButtonProps => {
	const { icon, iconRight, ...rest } = props;
	void icon;
	void iconRight;
	return { ...rest, ...attrs } as PrimeButtonProps;
});
</script>

<template>
	<PrimeButton v-bind="buttonBindings">
		<template #icon>
			<component
				:is="icon"
				v-if="icon"
				:class="[iconClass, { 'order-1': iconRight }, size === 'large' ? 'size-6' : 'size-5']"
			/>
		</template>
		<slot />
	</PrimeButton>
</template>
