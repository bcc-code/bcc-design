<script setup lang="ts">
import { BCC_CONTEXTS, type BCC_CONTEXT } from '@/contexts';
import type { Component } from 'vue';

export type BadgeProps = {
	value?: string | number | Component;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	bordered?: boolean;
	squared?: boolean;
	context?: BCC_CONTEXT;
};

withDefaults(defineProps<BadgeProps>(), {
	context: BCC_CONTEXTS.neutral.subtle,
	bordered: false,
	size: 'md',
	squared: false,
});
</script>

<template>
	<div
		class="bcc-badge"
		:class="[
			`ctx-${context}`,
			size,
			{
				bordered,
				squared,
				'bcc-badge-text': typeof value === 'string' && String(value).length > 1,
			},
		]"
	>
		<component :is="value" v-if="typeof value === 'function'" class="bcc-badge-icon" />
		<span v-else-if="value">{{ value }}</span>
	</div>
</template>
