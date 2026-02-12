<script setup lang="ts">
import BccTag, { type TagProps as PrimeTagProps } from 'primevue/tag';
import { computed, type Component } from 'vue';

export type TagProps = Omit<PrimeTagProps, 'icon'> & {
	icon?: Component;
	iconRight?: boolean;
};

const props = defineProps<TagProps>();

const tagBindings = computed((): PrimeTagProps => {
	const { icon, iconRight, ...rest } = props;
	void icon;
	void iconRight;
	return rest as PrimeTagProps;
});
</script>

<template>
	<BccTag v-bind="tagBindings">
		<template v-if="icon" #icon>
			<component :is="icon" class="w-4" :class="{ 'order-1': iconRight }" />
		</template>
		<slot />
		<component :is="iconRight" v-if="iconRight && iconRight !== true" class="w-4" />
	</BccTag>
</template>
