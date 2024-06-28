<script lang="ts">
export type BccTabsGroup = Array<{
  title: string;
  icon?: VueComponent;
  pin?: InstanceType<typeof BccPin>["$props"];
  badge?: InstanceType<typeof BccBadge>["$props"] & { text: string };
  as?: VueComponent;
  disabled?: boolean;
  loading?: boolean;
}>;
</script>

<script setup lang="ts">
import { BccBadge, BccPin } from "@/index";
import type { VueComponent } from "@/types";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";

type Props = {
  tabs: BccTabsGroup;
  size?: keyof typeof sizes;
  fill?: boolean;
};

withDefaults(defineProps<Props>(), {
  size: "base",
  fill: false,
});

const sizes = {
  sm: "bcc-tabs-sm text-label-sm",
  base: "text-label",
  lg: "bcc-tabs-lg text-label-lg",
};
</script>

<template>
  <TabGroup as="div" class="bcc-tabs" :class="{ 'bcc-tabs-fill': fill }">
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
          <div v-if="tab.icon" class="bcc-tabs-bar-icon">
            <component :is="tab.icon" />
          </div>
          {{ tab.title }}
          <BccPin class="bcc-tabs-item-right" v-if="tab.pin" v-bind="tab.pin" />
          <BccBadge class="bcc-tabs-item-right" v-if="tab.badge" v-bind="tab.badge">
            {{ tab.badge.text }}
          </BccBadge>
        </div>
      </Tab>
    </TabList>
    <TabPanels class="bcc-tabs-panels">
      <TabPanel v-for="(tab, index) in tabs" :key="`tab-${index + 1}`" class="bcc-tabs-panel">
        <slot :name="`tab-${index + 1}`" :tab="tab">
          <component v-if="tab.as" :is="tab.as" />
        </slot>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
