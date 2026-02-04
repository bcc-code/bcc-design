<script setup lang="ts">
import { ALL_LEVELS } from '@/contexts';
import PVButton, { type ButtonProps } from 'primevue/button';
import { type Component } from 'vue';

const props = defineProps<
	{
		icon?: Component;
    iconRight?: boolean;
		context: ALL_LEVELS;
	} & /* @vue-ignore */ Omit<ButtonProps, 'icon' | 'severity' | 'iconPos'>
>() as ButtonProps;
</script>

<template>
	<PVButton v-bind="props" :class="context.">
		<template v-if="icon" #icon="{ class: iconClass }" class="">
      		<component :is="icon" :class="[{ 'order-1': iconRight, size === 'large' ? 'size-6' : 'size-5' }, iconClass]" />
		</template>
		<slot />
	</PVButton>
</template>