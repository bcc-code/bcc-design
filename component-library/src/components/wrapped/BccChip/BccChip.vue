<script setup lang="ts">
import type { VueComponent } from '@/types';
import PrimeChip, { type ChipProps as PrimeChipProps } from 'primevue/chip';
import { computed, useAttrs } from 'vue';

export type ChipProps = {
	icon?: VueComponent;
} & /* @vue-ignore */ Omit<PrimeChipProps, 'icon' | 'iconPos'>;

const props = defineProps<ChipProps>();
const attrs = useAttrs();

const buttonBindings = computed((): PrimeChipProps => {
	const { icon, ...rest } = props;
	void icon;

	const forward = rest as PrimeChipProps;
	return { ...forward, ...attrs } as PrimeChipProps;
});
</script>

<template>
	<PrimeChip v-bind="buttonBindings" class="shrink-0">
		<template #icon>
			<component :is="icon" class="size-5 shrink-0" />
		</template>
		<slot />
	</PrimeChip>
</template>
