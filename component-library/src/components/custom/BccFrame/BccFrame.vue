<script setup lang="ts">
export type FrameProps = {
	sunken?: boolean;
	raised?: boolean;
	overlay?: boolean;
};

defineProps<FrameProps>();
</script>

<template>
	<div
		class="bcc-frame"
		:class="{ 'bcc-frame--raised': raised, 'bcc-frame--overlay': overlay, 'bcc-frame--sunken': sunken }"
	>
		<slot />
	</div>
</template>
