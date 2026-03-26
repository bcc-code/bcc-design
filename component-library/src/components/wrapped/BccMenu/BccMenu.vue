<script setup lang="ts">
import type { VueComponent } from '@/types';
import PrimeMenu, { type MenuMethods as PrimeMenuMethods, type MenuProps as PrimeMenuProps } from 'primevue/menu';
import type { MenuItem } from 'primevue/menuitem';
import { computed, ref, useAttrs } from 'vue';

/** Menu item model for BccMenu: icon can be a PrimeVue icon class string or a Vue icon component. */
export type BccMenuItem = Omit<MenuItem, 'icon' | 'items'> & {
	icon?: VueComponent;
	items?: BccMenuItem[];
};

export type MenuProps = {
	model?: BccMenuItem[];
} & Omit<PrimeMenuProps, 'model'>;

const props = defineProps<MenuProps>();
const attrs = useAttrs();

const menuBindings = computed((): PrimeMenuProps => {
	return { ...props, ...attrs } as PrimeMenuProps;
});

const primeMenuRef = ref<InstanceType<typeof PrimeMenu> | null>(null);

const exposed: PrimeMenuMethods = {
	toggle: (event, target) => primeMenuRef.value?.toggle(event, target),
	show: (event, target) => primeMenuRef.value?.show(event, target),
	hide: () => primeMenuRef.value?.hide(),
};
defineExpose(exposed);

function isIconComponent(icon: unknown): icon is VueComponent {
	return typeof icon === 'function' || (typeof icon === 'object' && icon !== null);
}
</script>

<template>
	<PrimeMenu ref="primeMenuRef" v-bind="menuBindings" class="text-sm">
		<template #itemicon="{ item, class: itemIconClass }">
			<component
				:is="item.icon"
				v-if="item?.icon && isIconComponent(item.icon)"
				:class="[itemIconClass, 'p-icon -my-0.5 size-4 shrink-0']"
			/>
			<span v-else-if="item?.icon && typeof item.icon === 'string'" :class="[itemIconClass, item.icon]" />
		</template>

		<template v-if="$slots.item" #item="{ item, label, props: itemProps }">
			<slot name="item" :item="item" :label="label" :props="itemProps" />
		</template>
	</PrimeMenu>
</template>
