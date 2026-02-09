<script setup lang="ts">
defineOptions({
	name: 'BccCard',
});

withDefaults(
	defineProps<{
		/** Optional title shown in the card header */
		title?: string;
		/** Whether the card has elevated shadow */
		elevated?: boolean;
	}>(),
	{
		title: undefined,
		elevated: false,
	}
);
</script>

<template>
	<article class="ctx-backround rounded-lg p-4" :class="{ 'shadow-md': elevated }">
		<header v-if="title" class="text-ctx-text-bold mb-3 text-lg font-semibold">
			<b>{{ title }}</b>
		</header>
		<div class="text-ctx-text">
			<slot />
		</div>
	</article>
</template>
