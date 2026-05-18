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
	const classes = ['shrink-0', 'flex', 'items-center', 'self-start'];
	if (props.size === 'small') classes.push('w-4');
	else if (props.size === 'large') classes.push('w-6');
	else classes.push('w-5');

	if (props.iconRight === true) classes.push('order-1');

	return classes;
});
</script>

<template>
	<PrimeMessage v-bind="messageBindings" :class="{ 'no-shadow': noShadow }">
		<template v-if="icon || iconRight" #icon>
			<component :is="icon === true ? SeverityIcons[severity || 'info'] : icon" :class="iconClass" />
			<component :is="iconRight" v-if="iconRight && iconRight !== true" class="order-1" :class="iconClass" />
		</template>
		<slot>
			<h4 v-if="title || $slots.title" class="heading-sm leading-lg!">
				<slot name="title">{{ title }}</slot>
			</h4>
			<p v-if="message || $slots.message" class="body-md whitespace-pre-line">
				<slot name="message"> {{ message }}</slot>
			</p>
		</slot>
	</PrimeMessage>
</template>

<style>
.p-message.no-shadow {
	box-shadow: none;
}
</style>
