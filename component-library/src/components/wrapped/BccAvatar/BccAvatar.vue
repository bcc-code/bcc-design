<script setup lang="ts">
import type { VueComponent } from '@/types';
import { PersonFillIcon } from '@bcc-code/icons-vue';
import PrimeAvatar, { type AvatarProps as PrimeAvatarProps } from 'primevue/avatar';
import { computed } from 'vue';

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
	/** Controls the avatar dimensions; maps to CSS size classes (xs through xxl). Default: md */
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
};

const props = defineProps<AvatarProps>();

const bindings = computed(() => {
	const { icon, ...rest } = props;
	void icon;
	return rest;
});
</script>

<template>
	<PrimeAvatar
		v-bind="bindings"
		class="bcc-avatar"
		:shape="squared ? 'square' : 'circle'"
		:class="[gender, size, { child, bordered, squared }]"
	>
		<template v-if="icon" #icon>
			<component :is="typeof icon === 'boolean' ? PersonFillIcon : icon" class="icon" />
		</template>
	</PrimeAvatar>
</template>
