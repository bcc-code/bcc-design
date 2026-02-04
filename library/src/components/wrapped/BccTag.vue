<script setup lang="ts">
import PVTag, { type TagProps } from 'primevue/tag';
import type { Component } from 'vue';

const props = defineProps<
	{
		icon?: Component;
		iconRight?: boolean;
	} & Omit<TagProps, 'icon'>
>() as TagProps;
</script>

<template>
	<PVTag v-bind="props">
		<template v-if="icon" #icon>
			<component :is="icon" class="w-4" :class="{ 'order-1': iconRight }" />
		</template>
		<slot />
	</PVTag>
</template>
