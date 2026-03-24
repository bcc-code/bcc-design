<script setup lang="ts">
import type { VueComponent } from '@/types';
import { computed, type Component } from 'vue';
import BccBadge from '../BccBadge/BccBadge.vue';

export type BccAppNavigationItem = {
	key: string;
	title: string;
	icon: Component;
	pin?: number;

	/** Any additional properties will be passed to the component.
	 * @example
	 * {
	 *   href: '/',
	 *   target: '_blank',
	 * } or for router link:
	 * {
	 *   to: '/',
	 *   replace: true,
	 * }
	 */
	[key: string]: unknown;
};

const props = defineProps<{
	items: BccAppNavigationItem[];
	linkComponent?: VueComponent;
	activeKey?: BccAppNavigationItem['key'] | null;
}>();

const emits = defineEmits<{
	(e: 'select', item: BccAppNavigationItem): void;
}>();

const itemWidth = computed(() => {
	const count = props.items.length;
	const widthClasses = ['w-full', 'w-1/2', 'w-1/3', 'w-1/4', 'w-1/5', 'w-1/6'];

	if (count >= 1 && count <= widthClasses.length) {
		return widthClasses[count - 1];
	}

	return 'flex-1';
});
</script>

<template>
	<div class="bcc-app-nav">
		<div class="bcc-app-nav-container">
			<template v-for="item in items" :key="item.key">
				<component
					:is="linkComponent ?? 'a'"
					v-bind="item"
					class="bcc-app-nav-item"
					active-class="bcc-app-nav-item--active"
					:class="{ 'bcc-app-nav-item--active': activeKey === item.key, [itemWidth]: true }"
					@click="emits('select', item)"
				>
					<div class="relative px-3">
						<component :is="item.icon" class="bcc-nav-item-icon" />
						<Transition name="bounce-in">
							<BccBadge
								v-if="item.pin && item.pin > 0"
								class="bcc-nav-item-badge"
								size="sm"
								context="brand-bolder"
								border
								:value="String(item.pin)"
							/>
						</Transition>
					</div>
					<div class="bcc-nav-item-title">{{ item.title }}</div>
				</component>
			</template>
		</div>
	</div>
</template>
