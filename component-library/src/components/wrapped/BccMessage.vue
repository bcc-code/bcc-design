<script setup lang="ts">
import type { VueComponent } from '@/types';
import { CheckIcon, ContrastIcon, ErrorIcon, InfoIcon, WarningIcon } from '@bcc-code/icons-vue';
import PrimeMessage, { type MessageProps as PrimeMessageProps } from 'primevue/message';
import { computed, type Component } from 'vue';

export type MessageProps = Omit<PrimeMessageProps, 'icon'> & {
	icon?: boolean | VueComponent;
	iconRight?: VueComponent | boolean;

	title?: string;
	message?: string;
	noShadow?: boolean;
};

const props = defineProps<MessageProps>();

const messageBindings = computed((): PrimeMessageProps => {
	const { icon, iconRight, ...rest } = props;
	void icon;
	void iconRight;
	return rest as PrimeMessageProps;
});

const SeverityIcons: Record<NonNullable<PrimeMessageProps['severity']>, Component> = {
	info: InfoIcon,
	success: CheckIcon,
	warn: WarningIcon,
	error: ErrorIcon,
	secondary: InfoIcon,
	contrast: ContrastIcon,
};

const iconClass = computed(() => {
	const classes = ['flex', 'items-center'];
	if (props.iconRight === true) classes.push('order-1');

	return classes;
});
</script>

<template>
	<PrimeMessage v-bind="messageBindings" :class="{ 'no-shadow': noShadow }">
		<template v-if="icon || iconRight" #icon="{ class: slotClass }">
			<component :is="icon === true ? SeverityIcons[severity || 'info'] : icon" :class="[slotClass, iconClass]" />
			<component
				:is="iconRight"
				v-if="iconRight && iconRight !== true"
				class="order-1"
				:class="[slotClass, iconClass]"
			/>
		</template>
		<slot>
			<h4 v-if="title || $slots.title">
				<slot name="title">{{ title }}</slot>
			</h4>
			<p v-if="message || $slots.message" class="font-normal whitespace-pre-line">
				<slot name="message"> {{ message }}</slot>
			</p>
		</slot>
	</PrimeMessage>
</template>

<style>
.p-message.no-shadow {
	box-shadow: none;
}

.p-message-content:has(.p-message-text > p) {
	align-items: flex-start;
}

.p-message:not(.p-message-simple) .p-message-content {
	min-height: calc(var(--spacing) * 10);
}

.p-message-sm:not(.p-message-simple) .p-message-content {
	min-height: calc(var(--spacing) * 8);
}

.p-message-lg:not(.p-message-simple) .p-message-content {
	min-height: calc(var(--spacing) * 12);
}
</style>
