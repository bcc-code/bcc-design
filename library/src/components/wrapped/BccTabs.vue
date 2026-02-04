<script setup lang="ts">
import PVTab from 'primevue/tab';
import PVTabList from 'primevue/tablist';
import PVTabPanel from 'primevue/tabpanel';
import PVTabPanels from 'primevue/tabpanels';
import PVTabs from 'primevue/tabs';
import type { Component } from 'vue';
import { computed } from 'vue';
import PVPin from './BccPin.vue';

export interface TabItem {
	title: string;
	icon?: Component;
	pin?: { text: string; context?: string };
	as?: Component;
	value?: string;
}

interface Props {
	tabs: TabItem[];
	modelValue?: number;
	fill?: boolean;
	noPanels?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	fill: false,
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: number): void;
}>();

const activeIndex = computed({
	get: () => props.modelValue ?? 0,
	set: (value: number) => emit('update:modelValue', value),
});
</script>

<template>
	<PVTabs
		v-model:value="activeIndex"
		:class="{ 'w-full': fill }"
		style="--p-tabs-tablist-border-width: 0; --p-tabs-tab-border-width: 0 0 1px 0"
	>
		<PVTabList>
			<PVTab v-for="(tab, index) in tabs" :key="'tab-' + index" :value="index">
				<component :is="tab.icon" v-if="tab.icon" class="size-4" />
				<span>{{ tab.title }}</span>
				<PVPin v-if="tab.pin" :value="tab.pin.text" :severity="tab.pin.context" size="small" />
			</PVTab>
		</PVTabList>
		<PVTabPanels v-if="!noPanels">
			<PVTabPanel v-for="(tab, index) in tabs" :key="'tab-panel-' + index" :value="index">
				<component :is="tab.as" v-if="tab.as" />
				<slot :name="`tab-${index + 1}`" />
			</PVTabPanel>
		</PVTabPanels>
	</PVTabs>
</template>
