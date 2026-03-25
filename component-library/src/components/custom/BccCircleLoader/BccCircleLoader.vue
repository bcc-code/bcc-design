<script setup>
import { computed } from 'vue';

const sizes = {
	sm: 'size-4',
	md: 'size-6',
	base: 'size-8',
	lg: 'size-10',
	xl: 'size-12',
	'2xl': 'size-14',
	'3xl': 'size-16',
};

const props = defineProps({
	icon: String,
	size: {
		default: 'base',
		type: String,
	},
	left: Boolean,
	right: Boolean,
});

const sizeClass = computed(() => sizes[props.size] ?? props.size);
</script>

<template>
	<svg
		fill="none"
		viewBox="0 0 58 58"
		aria-hidden="true"
		class="inline-block transition-all"
		:class="[sizeClass, { 'ml-4': left, 'mr-4': right }]"
	>
		<g transform="translate(2 1)" stroke="currentColor" stroke-width="1.5">
			<circle cx="42.601" cy="11.462" r="5" fill-opacity="1" fill="currentColor">
				<animate
					attributeName="fill-opacity"
					begin="0s"
					dur="1.3s"
					values="1;0;0;0;0;0;0;0"
					calcMode="linear"
					repeatCount="indefinite"
				/>
			</circle>
			<circle cx="49.063" cy="27.063" r="5" fill-opacity="0" fill="currentColor">
				<animate
					attributeName="fill-opacity"
					begin="0s"
					dur="1.3s"
					values="0;1;0;0;0;0;0;0"
					calcMode="linear"
					repeatCount="indefinite"
				/>
			</circle>
			<circle cx="42.601" cy="42.663" r="5" fill-opacity="0" fill="currentColor">
				<animate
					attributeName="fill-opacity"
					begin="0s"
					dur="1.3s"
					values="0;0;1;0;0;0;0;0"
					calcMode="linear"
					repeatCount="indefinite"
				/>
			</circle>
			<circle cx="27" cy="49.125" r="5" fill-opacity="0" fill="currentColor">
				<animate
					attributeName="fill-opacity"
					begin="0s"
					dur="1.3s"
					values="0;0;0;1;0;0;0;0"
					calcMode="linear"
					repeatCount="indefinite"
				/>
			</circle>
			<circle cx="11.399" cy="42.663" r="5" fill-opacity="0" fill="currentColor">
				<animate
					attributeName="fill-opacity"
					begin="0s"
					dur="1.3s"
					values="0;0;0;0;1;0;0;0"
					calcMode="linear"
					repeatCount="indefinite"
				/>
			</circle>
			<circle cx="4.938" cy="27.063" r="5" fill-opacity="0" fill="currentColor">
				<animate
					attributeName="fill-opacity"
					begin="0s"
					dur="1.3s"
					values="0;0;0;0;0;1;0;0"
					calcMode="linear"
					repeatCount="indefinite"
				/>
			</circle>
			<circle cx="11.399" cy="11.462" r="5" fill-opacity="0" fill="currentColor">
				<animate
					attributeName="fill-opacity"
					begin="0s"
					dur="1.3s"
					values="0;0;0;0;0;0;1;0"
					calcMode="linear"
					repeatCount="indefinite"
				/>
			</circle>
			<circle cx="27" cy="5" r="5" fill-opacity="0" fill="currentColor">
				<animate
					attributeName="fill-opacity"
					begin="0s"
					dur="1.3s"
					values="0;0;0;0;0;0;0;1"
					calcMode="linear"
					repeatCount="indefinite"
				/>
			</circle>
		</g>
	</svg>
</template>
