<script setup lang="ts">
import type { VueComponent } from '@/types';
import BccTab from 'primevue/tab';
import BccTabList from 'primevue/tablist';
import BccTabPanel from 'primevue/tabpanel';
import BccTabPanels from 'primevue/tabpanels';
import BccTabs, { type TabsProps as PrimeTabsProps } from 'primevue/tabs';
import { computed, type CSSProperties } from 'vue';
import { BccBadge, type BadgeProps } from '../../custom';

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
	fluid?: boolean;
	bold?: boolean;
};

const props = defineProps<TabsProps>();

const value = defineModel<number>({ default: 0, required: false });

const tabsBindings = computed((): Omit<PrimeTabsProps, 'value'> => {
	const { tabs, modelValue, noPanels, fluid, ...rest } = props;
	void tabs;
	void modelValue;
	void noPanels;
	void fluid;
	return rest as Omit<PrimeTabsProps, 'value'>;
});

const tabItemStyles = computed(() => {
	const styles: CSSProperties = {};

	if (props.fluid) {
		const widthPercentage = 100 / props.tabs.length;
		styles.width = `${widthPercentage}%`;
	}
	if (props.bold) {
		styles.fontWeight = 'var(--font-weight-bold)';
	}
	return styles;
});
</script>

<template>
	<BccTabs v-model:value="value" v-bind="tabsBindings" :class="{ 'bcc-tabs-fill': fill, 'bcc-tabs-fluid': fluid }">
		<BccTabList>
			<BccTab
				v-for="(tab, index) in tabs"
				:key="'tab-' + index"
				:value="index"
				class="center gap-2"
				:style="tabItemStyles"
			>
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
