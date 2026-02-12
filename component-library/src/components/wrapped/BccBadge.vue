<script setup lang="ts">
import PrimeBadge, { type BadgeProps as PrimeBadgeProps } from 'primevue/badge';
import { computed, type Component } from 'vue';

export type BadgeProps = PrimeBadgeProps & {
	icon?: Component;
};

const props = defineProps<BadgeProps>();

const badgeBindings = computed((): PrimeBadgeProps => {
	const { icon, ...rest } = props;
	void icon;
	return rest as PrimeBadgeProps;
});
</script>

<template>
	<PrimeBadge v-bind="badgeBindings">
		<template #icon>
			<component
				:is="icon"
				v-if="icon && !value"
				:class="size === 'small' ? 'size-3' : size === 'large' ? 'size-5' : 'size-4'"
			/>
		</template>
	</PrimeBadge>
</template>

<style scoped></style>
