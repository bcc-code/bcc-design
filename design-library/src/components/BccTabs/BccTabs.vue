<script setup lang="ts">
import { BccBadge, BccPin } from "@/index";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import type { BccTabsGroup } from "./types";
import { useTemplateRef } from "vue";
import { useSwipe, UseSwipeDirection } from "@vueuse/core";

type Props = {
  tabs: BccTabsGroup;
  size?: keyof typeof sizes;
  fill?: boolean;
  noSwipe?: boolean;
};

const activeTab = defineModel<number>({ default: 0 });

const props = withDefaults(defineProps<Props>(), {
  size: "base",
  fill: false,
});

const tabsRef = useTemplateRef<HTMLDivElement>("tabsRef");
useSwipe(tabsRef, {
  onSwipeEnd: (e: TouchEvent, direction: UseSwipeDirection) => {
    if (props.noSwipe) return;
    let nextTab = null;
    if (direction === "left") {
      for (let i = activeTab.value + 1; i < props.tabs.length; i++) {
        if (!props.tabs[i].disabled) {
          nextTab = i;
          break;
        }
      }
    } else if (direction === "right") {
      for (let i = activeTab.value - 1; i >= 0; i--) {
        if (!props.tabs[i].disabled) {
          nextTab = i;
          break;
        }
      }
    }
    if (nextTab !== null) activeTab.value = nextTab;
  },
});

const sizes = {
  sm: "bcc-tabs-sm text-label-sm",
  base: "text-label",
  lg: "bcc-tabs-lg text-label-lg",
};

function changeTab(index: number) {
  activeTab.value = index;
}
</script>

<template>
  <TabGroup
    as="div"
    class="bcc-tabs"
    :class="{ 'bcc-tabs-fill': fill }"
    :selected-index="activeTab"
    @change="changeTab"
  >
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
    <TabPanels class="bcc-tabs-panels" ref="tabsRef">
      <TabPanel v-for="(tab, index) in tabs" :key="`tab-${index + 1}`" class="bcc-tabs-panel">
        <slot :name="`tab-${index + 1}`" :tab="tab">
          <component v-if="tab.as" :is="tab.as" />
        </slot>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
