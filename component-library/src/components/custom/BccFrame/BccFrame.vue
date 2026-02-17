<script setup lang="ts">
export type FrameProps = {
	/** Adds a drop shadow around the frame. */
	shadow?: boolean;
	/** Applies rounded corners to the frame. */
	rounded?: boolean;
	/** Sunken appearance (inset); use only one of sunken, raised, or overlay. */
	sunken?: boolean;
	/** Raised/elevated appearance; use only one of sunken, raised, or overlay. */
	raised?: boolean;
	/** Overlay style (e.g. floating panel); use only one of sunken, raised, or overlay. */
	overlay?: boolean;
	/** Flex: center content on both axes. */
	center?: boolean;
	/** Flex: space-between for main-axis distribution. */
	between?: boolean;
	/** Flex: align content to the left. */
	left?: boolean;
	/** Flex: align content to the right. */
	right?: boolean;
	/** Flex: align content to the top. */
	top?: boolean;
	/** Flex: align content to the bottom. */
	bottom?: boolean;
	/** Flex: stretch children to fill the frame. */
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
