<script setup lang="ts">
import { ref, watch } from 'vue';
import type { ReactInfo } from './types';

const props = defineProps<ReactInfo>();

const animate = ref(false);
watch(
	() => props.count,
	() => {
		animate.value = true;
		setTimeout(() => {
			animate.value = false;
		}, 1000);
	}
);
</script>

<template>
	<button
		class="bcc-react-emoji-list-item"
		:class="{
			selected,
			'animate-wiggle': animate,
		}"
	>
		<span class="bcc-react-emoji">{{ emoji }}</span>
		<span v-if="count && count > 1" class="bcc-react-count">{{ count }}</span>
	</button>
</template>
