<script setup lang="ts">
import type { VueComponent } from '@/types';
import { CheckIcon, ContrastIcon, ErrorIcon, InfoIcon, WarningIcon } from '@bcc-code/icons-vue';
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
	info: InfoIcon,
	success: CheckIcon,
	warn: WarningIcon,
	error: ErrorIcon,
	secondary: InfoIcon,
	contrast: ContrastIcon,
};
</script>

<template>
	<BccMessage v-bind="messageBindings">
		<template v-if="icon" #icon>
			<component
				:is="icon === true ? SeverityIcons[severity || 'info'] : icon"
				class="w-4 shrink-0 self-start pt-1"
				:class="{ 'order-1': iconRight === true }"
			/>
			<component :is="iconRight" v-if="iconRight && iconRight !== true" class="order-1 w-4 shrink-0 self-start pt-1" />
		</template>
		<slot>
			<div>
				<p v-if="title">
					<b>{{ title }}</b>
				</p>
				<p v-if="message">{{ message }}</p>
			</div>
		</slot>
	</BccMessage>
</template>
