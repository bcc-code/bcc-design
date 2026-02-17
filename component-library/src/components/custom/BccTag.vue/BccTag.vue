<script setup lang="ts">
import type { VueComponent } from '@/types';
import { computed } from 'vue';
import BccBadge, { type BadgeProps } from '../BccBadge/BccBadge.vue';

export type TagProps = Omit<BadgeProps, 'value' | 'squared'> & {
	icon?: VueComponent;
	iconRight?: VueComponent | boolean;
	rounded?: boolean;
	/* Add clickable styles to the tag */
	clickable?: boolean;
	/* Label for the tag instead of using slot */
	text?: string;
};

const props = defineProps<TagProps>();

const badgeBindings = computed((): BadgeProps => {
	const { text, icon, iconRight, rounded, ...rest } = props;
	void text;
	void icon;
	void rounded;
	void iconRight;
	return rest as BadgeProps;
});
</script>

<template>
	<BccBadge class="bcc-tag" :class="{ clickable }" v-bind="badgeBindings" :squared="!rounded">
		<component :is="icon" v-if="icon" class="h-full" :class="{ 'order-1': iconRight === true }" />
		<slot>{{ text }}</slot>
		<component :is="iconRight" v-if="iconRight && typeof iconRight !== 'boolean'" class="h-full" />
	</BccBadge>
</template>
