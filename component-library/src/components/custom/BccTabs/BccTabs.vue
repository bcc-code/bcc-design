<script setup lang="ts">
import type { VueComponent } from '@/types';
import BccTab from 'primevue/tab';
import BccTabList from 'primevue/tablist';
import BccTabPanel from 'primevue/tabpanel';
import BccTabPanels from 'primevue/tabpanels';
import BccTabs, { type TabsProps as PrimeTabsProps } from 'primevue/tabs';
import { computed } from 'vue';
import BccBadge, { type BadgeProps } from '../BccBadge/BccBadge.vue';

export interface TabItem {
	title: string;
	icon?: VueComponent;
	badge?: BadgeProps;
	as?: VueComponent;
	value?: string;
}

export type TabsProps = Omit<PrimeTabsProps, 'value'> & {
	tabs: TabItem[];
	fill?: boolean;
	modelValue?: number;
	noPanels?: boolean;
};

const props = defineProps<TabsProps>();

const value = defineModel<number>({ default: 0, required: false });

const tabsBindings = computed((): Omit<PrimeTabsProps, 'value'> => {
	const { tabs, modelValue, noPanels, ...rest } = props;
	void tabs;
	void modelValue;
	void noPanels;
	return rest as Omit<PrimeTabsProps, 'value'>;
});
</script>

<template>
	<BccTabs
		v-model:value="value"
		v-bind="tabsBindings"
		:class="{ 'bcc-tabs-fill': fill }"
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
