<script setup lang="ts">
import BccTab from 'primevue/tab';
import BccTabList from 'primevue/tablist';
import BccTabPanel from 'primevue/tabpanel';
import BccTabPanels from 'primevue/tabpanels';
import BccTabs, { type TabsProps as PrimeTabsProps } from 'primevue/tabs';
import type { Component } from 'vue';
import { computed } from 'vue';
import BccBadge, { type BadgeProps } from '../custom/BccBadge/BccBadge.vue';

export interface TabItem {
	title: string;
	icon?: Component;
	badge?: BadgeProps;
	as?: Component;
	value?: string;
}

export type TabsProps = Omit<PrimeTabsProps, 'value'> & {
	tabs: TabItem[];
	modelValue?: number;
	fill?: boolean;
	noPanels?: boolean;
};

const props = withDefaults(defineProps<TabsProps>(), {
	fill: false,
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: number): void;
}>();

const activeIndex = computed({
	get: () => props.modelValue ?? 0,
	set: (value: number) => emit('update:modelValue', value),
});

const tabsBindings = computed((): Omit<PrimeTabsProps, 'value'> => {
	const { tabs, modelValue, fill, noPanels, ...rest } = props;
	void tabs;
	void modelValue;
	void fill;
	void noPanels;
	return rest as Omit<PrimeTabsProps, 'value'>;
});
</script>

<template>
	<BccTabs
		v-model:value="activeIndex"
		v-bind="tabsBindings"
		:class="{ 'w-full': fill }"
		style="--p-tabs-tablist-border-width: 0; --p-tabs-tab-border-width: 0 0 1px 0"
	>
		<BccTabList>
			<BccTab v-for="(tab, index) in tabs" :key="'tab-' + index" :value="index" class="center gap-2">
				<component :is="tab.icon" v-if="tab.icon" class="size-4" />
				<span>{{ tab.title }}</span>
				<BccBadge v-if="tab.badge" v-bind="tab.badge" size="sm" />
			</BccTab>
		</BccTabList>
		<BccTabPanels v-if="!noPanels">
			<BccTabPanel v-for="(tab, index) in tabs" :key="'tab-panel-' + index" :value="index">
				<component :is="tab.as" v-if="tab.as" />
				<slot :name="`tab-${index + 1}`" />
			</BccTabPanel>
		</BccTabPanels>
	</BccTabs>
</template>
