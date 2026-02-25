<script setup lang="ts">
import type { VueComponent } from '@/types';
import { PersonFillIcon } from '@bcc-code/icons-vue';
import PrimeAvatar, { type AvatarProps as PrimeAvatarProps } from 'primevue/avatar';

export type AvatarProps = Omit<PrimeAvatarProps, 'shape' | 'size'> & {
	/** Affects avatar color for gender-specific defaults. */
	gender?: 'male' | 'female' | 'M' | 'F' | 'unknown' | 'U';
	/** When true, applies child-specific color */
	child?: boolean;
	/** Shows a person icon when true, or a custom component when provided. Used when no image is set. */
	icon?: boolean | VueComponent;
	/** Renders the avatar with rounded corners instead of circular. */
	squared?: boolean;
	/** Adds a visible border around the avatar. */
	bordered?: boolean;
	/** Controls the avatar dimensions; maps to CSS size classes (xs through xxl). */
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
};

const props = defineProps<AvatarProps>();
</script>

<template>
	<PrimeAvatar
		v-bind="props"
		class="bcc-avatar"
		:shape="squared ? 'square' : 'circle'"
		:class="[gender, size, { child, bordered, squared }]"
	>
		<template v-if="icon" #icon>
			<component :is="typeof icon === 'boolean' ? PersonFillIcon : icon" style="width: 1em" />
		</template>
	</PrimeAvatar>
</template>
