<script setup lang="ts">
import type { VueComponent } from '@/types';
import PrimeToggleButton, { type ToggleButtonProps as PrimeToggleButtonProps } from 'primevue/togglebutton';
import { computed, useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

export type ToggleButtonProps = Omit<PrimeToggleButtonProps, 'onIcon' | 'offIcon'> & {
	/** Custom icon component rendered inside the button when checked. */
	onIcon?: VueComponent;
	/** Custom icon component rendered inside the button when unchecked. */
	offIcon?: VueComponent;
};

const props = defineProps<ToggleButtonProps>();
const attrs = useAttrs();

const bindings = computed((): PrimeToggleButtonProps => {
	const { onIcon, offIcon, ...rest } = props;
	void onIcon;
	void offIcon;

	return { ...rest, ...attrs } as PrimeToggleButtonProps;
});
</script>

<template>
	<PrimeToggleButton v-bind="bindings">
		<template #icon="{ value }">
			<component :is="value ? onIcon : offIcon" :class="[size === 'small' ? 'size-4' : 'size-5']" />
		</template>
		<slot />
	</PrimeToggleButton>
</template>
