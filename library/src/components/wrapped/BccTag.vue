<script setup lang="ts">
import PVTag, { type TagProps } from 'primevue/tag';
import { computed, type Component } from 'vue';

export type BccTagProps = Omit<TagProps, 'icon'> & {
	icon?: Component;
	iconRight?: boolean;
};

const props = defineProps<BccTagProps>();

const tagBindings = computed((): TagProps => {
	const { icon, iconRight, ...rest } = props;
	void icon;
	void iconRight;
	return rest as TagProps;
});
</script>

<template>
	<PVTag v-bind="tagBindings">
		<template v-if="icon" #icon>
			<component :is="icon" class="w-4" :class="{ 'order-1': iconRight }" />
		</template>
		<slot />
		<component :is="iconRight" v-if="iconRight && iconRight !== true" class="w-4" />
	</PVTag>
</template>
