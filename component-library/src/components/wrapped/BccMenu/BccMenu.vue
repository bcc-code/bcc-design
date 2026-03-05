<script setup lang="ts">
import type { VueComponent } from '@/types';
import PrimeMenu from 'primevue/menu';
import type { MenuItem } from 'primevue/menuitem';
import { ref } from 'vue';

defineOptions({
	inheritAttrs: false,
});

const primeMenuRef = ref<InstanceType<typeof PrimeMenu> | null>(null);

defineExpose({
	toggle: (event: Event, target?: unknown) => primeMenuRef.value?.toggle(event, target),
	show: (event: Event, target?: unknown) => primeMenuRef.value?.show(event, target),
	hide: () => primeMenuRef.value?.hide(),
});

/** Menu item model for BccMenu: icon can be a PrimeVue icon class string or a Vue icon component. */
export type BccMenuItem = Omit<MenuItem, 'icon' | 'items'> & {
	icon?: string | VueComponent;
	items?: BccMenuItem[];
};

function isIconComponent(icon: unknown): icon is VueComponent {
	return typeof icon === 'function' || (typeof icon === 'object' && icon !== null);
}
</script>

<template>
	<PrimeMenu ref="primeMenuRef" v-bind="$attrs">
		<template #itemicon="{ item, class: itemIconClass }">
			<component
				:is="item.icon"
				v-if="item?.icon && isIconComponent(item.icon)"
				:class="[itemIconClass, 'size-5 shrink-0']"
			/>
			<span v-else-if="item?.icon && typeof item.icon === 'string'" :class="[itemIconClass, item.icon]" />
		</template>
	</PrimeMenu>
</template>
