<script setup lang="ts">
export type FrameProps = {
	shadow?: boolean;
	rounded?: boolean;
	/* Only one of these can be true */
	sunken?: boolean;
	raised?: boolean;
	overlay?: boolean;
	/* Flex options */
	center?: boolean;
	between?: boolean;
	left?: boolean;
	right?: boolean;
	top?: boolean;
	bottom?: boolean;
	stretch?: boolean;
};

defineProps<FrameProps>();
</script>

<template>
	<div
		class="bcc-frame"
		:class="{
			'bcc-frame--shadow': shadow,
			'bcc-frame--rounded': rounded,
			'bcc-frame--raised': raised,
			'bcc-frame--overlay': overlay,
			'bcc-frame--sunken': sunken,
			center,
			col: !center,
			between,
			left,
			right,
			top,
			bottom,
			stretch,
		}"
	>
		<slot />
	</div>
</template>
