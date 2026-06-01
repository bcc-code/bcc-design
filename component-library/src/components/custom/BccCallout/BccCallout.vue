<script setup lang="ts">
import { BCC_CONTEXTS, type BCC_CONTEXT } from '@/contexts';
import type { VueComponent } from '@/types';
import { computed, type Component } from 'vue';
import { CheckIcon, ErrorIcon, InfoIcon, WarningIcon } from '@bcc-code/icons-vue';

export type CalloutProps = {
	/** Title of the callout */
	title?: string;
	/** Body/description text of the callout */
	message?: string;
	/** Design context for the callout (controls background and accent bar color) */
	context?: BCC_CONTEXT;
	/** Icon component to display (defaults based on context if not provided) */
	icon?: VueComponent | boolean;
	/** Whether to show a border around the callout */
	bordered?: boolean;
	/** Custom class for the accent bar */
	barClass?: string;
};

const props = withDefaults(defineProps<CalloutProps>(), {
	context: BCC_CONTEXTS.neutral.subtler,
	icon: false,
	bordered: false,
});

const ContextIcons: Record<string, Component> = {
	info: InfoIcon,
	'info-subtlest': InfoIcon,
	'info-bolder': InfoIcon,
	success: CheckIcon,
	'success-subtlest': CheckIcon,
	'success-bolder': CheckIcon,
	warning: WarningIcon,
	'warning-subtlest': WarningIcon,
	'warning-bolder': WarningIcon,
	danger: ErrorIcon,
	'danger-subtlest': ErrorIcon,
	'danger-bolder': ErrorIcon,
};

const defaultIcon = computed(() => {
	if (props.icon === true) {
		return ContextIcons[props.context] || InfoIcon;
	}
	return props.icon || null;
});
</script>

<template>
	<div class="bcc-callout" :class="[`ctx-${context}`, { bordered }]">
		<div class="bcc-callout-bar" :class="barClass" />
		<div class="bcc-callout-content">
			<div v-if="defaultIcon || $slots.icon" class="bcc-callout-icon">
				<slot name="icon">
					<component :is="defaultIcon" v-if="defaultIcon" />
				</slot>
			</div>
			<div class="bcc-callout-body">
				<h4 v-if="title || $slots.title" class="bcc-callout-title">
					<slot name="title">{{ title }}</slot>
				</h4>
				<div v-if="message || $slots.default" class="bcc-callout-message">
					<slot>{{ message }}</slot>
				</div>
				<div v-if="$slots.actions" class="bcc-callout-actions">
					<slot name="actions" />
				</div>
			</div>
		</div>
	</div>
</template>
