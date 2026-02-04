<script setup lang="ts">
import PVBadge, { type BadgeProps } from 'primevue/badge';
import type { Component } from 'vue';

const props = defineProps<
	{
		icon?: Component;
		severity?: BadgeProps['severity'];
	} & BadgeProps
>();
</script>

<template>
	<PVBadge v-bind="props as BadgeProps">
		<component
			:is="icon"
			v-if="icon && !value"
			:class="size === 'small' ? 'size-3' : size === 'large' ? 'size-5' : 'size-4'"
		/>
	</PVBadge>
</template>

<style scoped></style>
