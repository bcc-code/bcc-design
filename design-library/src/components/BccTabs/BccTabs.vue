<script lang="ts">
export type BccTabsGroup = Array<{
  title: string;
  icon?: string | Component | Function;
  pin?: InstanceType<typeof BccPin>["$props"];
  badge?: InstanceType<typeof BccBadge>["$props"] & { text: string };
  as?: Component | Function;
  disabled?: boolean;
  loading?: boolean;
}>;
</script>

<script setup lang="ts">
import { BccBadge, BccPin } from "@/index";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import type { Component } from "vue";

type Props = {
  tabs: BccTabsGroup;
  size?: keyof typeof sizes;
};

withDefaults(defineProps<Props>(), {
  size: "base",
});

const sizes = {
  sm: "bcc-tabs-sm text-label-small",
  base: "text-label-base",
  lg: "bcc-tabs-lg text-label-medium",
};
</script>

<template>
  <TabGroup as="div" class="bcc-tabs">
    <TabList as="div" class="bcc-tabs-bar" :class="`bcc-tabs-bar--${tabs.length}`">
      <Tab
        v-for="(tab, index) in tabs"
        :disabled="!!tab.disabled"
        :key="index"
        v-slot="{ selected }"
        as="template"
      >
        <div
          class="bcc-tabs-bar-item"
          :class="[
            {
              'bcc-tabs-bar-item--active': selected,
              'bcc-tabs-bar-item--disabled': !!tab.disabled,
            },
            sizes[size],
          ]"
        >
          <component v-if="tab.icon" :is="tab.icon" class="bcc-tabs-bar-icon" />
          <span class="bcc-tabs-item-title">{{ tab.title }}</span>
          <BccPin v-if="tab.pin" v-bind="tab.pin" />
          <BccBadge v-if="tab.badge" v-bind="tab.badge">
            {{ tab.badge.text }}
          </BccBadge>
        </div>
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel v-for="(tab, index) in tabs" :key="`tab-${index + 1}`">
        <slot :name="`tab-${index + 1}`" :tab="tab">
          <component v-if="tab.as" :is="tab.as" />
        </slot>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
