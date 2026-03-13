<script setup lang="ts">
import { RotateLeftIcon, RotateRightIcon } from '@bcc-code/icons-vue';
import PrimeImage, { type ImageProps as PrimeImageProps } from 'primevue/image';

export type ImageProps = PrimeImageProps;

const props = defineProps<ImageProps>();
</script>

<template>
	<PrimeImage v-bind="props">
		<template #refresh>
			<slot name="refresh">
				<RotateRightIcon class="p-icon" />
			</slot>
		</template>
		<template #undo>
			<slot name="undo">
				<RotateLeftIcon class="p-icon" />
			</slot>
		</template>
	</PrimeImage>
</template>
