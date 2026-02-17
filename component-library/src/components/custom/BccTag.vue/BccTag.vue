<script setup lang="ts">
import { computed, type Component } from 'vue';
import BccBadge, { type BadgeProps } from '../BccBadge/BccBadge.vue';

export type TagProps = Omit<BadgeProps, 'value' | 'squared'> & {
	icon?: Component;
	iconRight?: Component | boolean;
	rounded?: boolean;
	/* Add clickable styles to the tag */
	clickable?: boolean;
	/* Label for the tag instead of using slot */
	label?: string;
};

const props = defineProps<TagProps>();

const badgeBindings = computed((): BadgeProps => {
	const { label, icon, iconRight, rounded, ...rest } = props;
	void label;
	void icon;
	void rounded;
	void iconRight;
	return rest as BadgeProps;
});
</script>

<template>
	<BccBadge class="bcc-tag" :class="{ clickable }" v-bind="badgeBindings" :squared="!rounded">
		<component :is="icon" v-if="icon" class="h-full" :class="{ 'order-1': iconRight === true }" />
		<slot>{{ label }}</slot>
		<component :is="iconRight" v-if="iconRight && typeof iconRight !== 'boolean'" class="h-full" />
	</BccBadge>
</template>
