<script setup lang="ts">
import type { VueComponent } from '@/types';
import { computed } from 'vue';
import BccBadge, { type BadgeProps } from '../BccBadge/BccBadge.vue';

export type TagProps = Omit<BadgeProps, 'value' | 'squared'> & {
	/** Icon component shown on the left (or right when iconRight is true). */
	icon?: VueComponent;
	/** When true, icon slot is on the right; when a component, shows that icon on the right. */
	iconRight?: VueComponent | boolean;
	/** When true, tag uses rounded corners; when false, passes squared to BccBadge. */
	rounded?: boolean;
	/** Applies hover/pointer styles so the tag looks and behaves like a clickable control. */
	clickable?: boolean;
	/** Label text for the tag when not using the default slot. */
	text?: string;

	truncate?: boolean;
};

const props = defineProps<TagProps>();

const badgeBindings = computed((): BadgeProps => {
	const { text, icon, iconRight, rounded, truncate, ...rest } = props;
	void text;
	void icon;
	void rounded;
	void iconRight;
	void truncate;
	return rest as BadgeProps;
});
</script>

<template>
	<BccBadge class="bcc-tag" :class="{ clickable }" v-bind="badgeBindings" :squared="!rounded">
		<component
			:is="icon"
			v-if="icon"
			class="bcc-badge-icon"
			:class="{ 'order-1': iconRight === true || iconRight === '' }"
		/>
		<span v-if="$slots.default || text" :class="{ truncate }">
			<slot>{{ text }}</slot>
		</span>
		<component
			:is="iconRight"
			v-if="iconRight && typeof iconRight !== 'boolean' && iconRight !== ''"
			class="bcc-badge-icon"
		/>
	</BccBadge>
</template>
