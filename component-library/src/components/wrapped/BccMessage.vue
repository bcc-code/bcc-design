<script setup lang="ts">
import type { VueComponent } from '@/types';
import { CheckIcon, ContrastIcon, ErrorIcon, InfoFillIcon, InfoIcon, WarningIcon } from '@bcc-code/icons-vue';
import BccMessage, { type MessageProps as PrimeMessageProps } from 'primevue/message';
import { computed, type Component } from 'vue';

export type MessageProps = Omit<PrimeMessageProps, 'icon'> & {
	icon?: boolean | VueComponent;
	iconRight?: VueComponent | boolean;

	title?: string;
	message?: string;
};

const props = defineProps<MessageProps>();

const messageBindings = computed((): PrimeMessageProps => {
	const { icon, iconRight, ...rest } = props;
	void icon;
	void iconRight;
	return rest as PrimeMessageProps;
});

const SeverityIcons: Record<NonNullable<PrimeMessageProps['severity']>, Component> = {
	info: InfoFillIcon,
	success: CheckIcon,
	warn: WarningIcon,
	error: ErrorIcon,
	secondary: InfoIcon,
	contrast: ContrastIcon,
};

const sizeClass = computed(() => {
	return `w-${props.size === 'small' ? '4' : props.size === 'large' ? '6' : '5'}`;
});

const iconClass = computed(() => {
	return {
		[sizeClass.value]: true,
		'shrink-0': true,
		flex: true,
		'items-center': true,
	};
});

const iconLeftClass = computed(() => {
	return {
		...iconClass.value,
		'self-start': props.iconRight !== true,
		'pt-1': props.iconRight !== true && props.title && props.message,
		'order-1': props.iconRight === true,
	};
});

const iconRightClass = computed(() => {
	return {
		...iconClass.value,
		'order-1': true,
	};
});

const iconWrapperStyles = computed(() => {
	return {
		height: 'var(--p-message-text-line-height)',
	};
});
</script>

<template>
	<BccMessage v-bind="messageBindings">
		<template v-if="icon" #icon>
			<div :class="iconLeftClass" :style="iconWrapperStyles">
				<component :is="icon === true ? SeverityIcons[severity || 'info'] : icon" />
			</div>
			<div v-if="iconRight && iconRight !== true" :class="iconRightClass" :style="iconWrapperStyles">
				<component :is="iconRight" />
			</div>
		</template>
		<slot>
			<div>
				<h4 v-if="title" class="text-heading-sm leading-lg">{{ title }}</h4>
				<p v-if="message" class="text-body-sm">{{ message }}</p>
			</div>
		</slot>
	</BccMessage>
</template>
