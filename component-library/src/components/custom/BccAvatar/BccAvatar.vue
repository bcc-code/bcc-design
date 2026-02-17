<script setup lang="ts">
import type { VueComponent } from '@/types';
import { PersonFillIcon } from '@bcc-code/icons-vue';
import PrimeAvatar, { type AvatarProps as PrimeAvatarProps } from 'primevue/avatar';

export type AvatarProps = PrimeAvatarProps & {
	gender?: 'male' | 'female' | 'M' | 'F' | 'unknown' | 'U';
	child?: boolean;
	icon?: boolean | VueComponent;
};

const props = defineProps<AvatarProps>();
</script>

<template>
	<PrimeAvatar v-bind="props" class="bcc-avatar" :class="[gender, { child }]">
		<template v-if="icon" #icon>
			<component :is="typeof icon === 'boolean' ? PersonFillIcon : icon" style="width: 1em" />
		</template>
	</PrimeAvatar>
</template>
