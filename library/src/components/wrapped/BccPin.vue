<script setup lang="ts">
import PVBadge, { type BadgeProps } from 'primevue/badge';
import { computed, type Component } from 'vue';

export type BccPinProps = BadgeProps & {
	icon?: Component;
};

const props = defineProps<BccPinProps>();

const badgeBindings = computed((): BadgeProps => {
	const { icon, ...rest } = props;
	void icon;
	return rest as BadgeProps;
});
</script>

<template>
	<PVBadge v-bind="badgeBindings">
		<component
			:is="icon"
			v-if="icon && !value"
			:class="size === 'small' ? 'size-3' : size === 'large' ? 'size-5' : 'size-4'"
		/>
	</PVBadge>
</template>

<style scoped></style>
