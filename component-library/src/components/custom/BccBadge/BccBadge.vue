<script setup lang="ts">
import { BCC_CONTEXTS, type BCC_CONTEXT } from '@/contexts';
import type { VueComponent } from '@/types';

export type BadgeProps = {
	/** Main content: number, short text, or an icon component. Slot overrides this when provided. */
	value?: string | number | VueComponent;
	/** Controls badge dimensions and typography scale (sm through xl). */
	size?: 'sm' | 'md' | 'lg' | 'xl';
	/** Adds a border around the badge. */
	bordered?: boolean;
	/** Renders with square corners; when false, badge is pill-shaped. */
	squared?: boolean;
	/** Design context (e.g. neutral, brand) used for background and text color. */
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
				'bcc-badge-text': $slots.default || (typeof value === 'string' && String(value).length > 1),
			},
		]"
	>
		<slot>
			<component :is="value" v-if="typeof value === 'function' || typeof value === 'object'" class="bcc-badge-icon" />
			<span v-else-if="value">{{ value }}</span>
		</slot>
	</div>
</template>
