<script setup lang="ts">
import type { VueComponent } from '@/types';
import { CheckIcon, ContrastIcon, ErrorIcon, InfoIcon, WarningIcon } from '@bcc-code/icons-vue';
import BccMessage, { type MessageProps as PrimeMessageProps } from 'primevue/message';
import { computed, type Component } from 'vue';

export type MessageProps = Omit<PrimeMessageProps, 'icon'> & {
	icon?: boolean | VueComponent;
	iconRight?: VueComponent | boolean;
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
				class="w-4"
				:class="{ 'order-1': iconRight === true }"
			/>
		</template>
		<slot />
		<component :is="iconRight" v-if="iconRight && iconRight !== true" class="w-4" />
	</BccMessage>
</template>
