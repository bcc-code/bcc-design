<script setup lang="ts">
import { ExpandMoreIcon } from "@bcc-code/icons-vue";
import { BccBadge, BccPin } from "@/index";
import { type Component, ref } from "vue";

const variants = {
  readonly: "bcc-accordion-readonly",
  brand: "bcc-accordion-brand",
  interactive: "bcc-accordion-interactive",
  desktop: "bcc-accordion-desktop",
};

const sizes = {
  base: "bcc-accordion-base",
  lg: "bcc-accordion-lg",
};

type Props = {
  title: string;
  open?: boolean;
  subtitle?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  icon?: string | Component | Function;
  badge?: InstanceType<typeof BccBadge>["$props"] & { text: string };
  pin?: InstanceType<typeof BccPin>["$props"];
};

const props = withDefaults(defineProps<Props>(), {
  title: "",
  subtitle: "",
  variant: "readonly",
  size: "base",
  icon: "",
  badge: undefined,
  pin: undefined,
});

const isOpen = ref(props.open ?? false);
</script>

<template>
  <div class="bcc-accordion">
    <div
      class="bcc-accordion-header"
      :class="{
        'bcc-accordion-active': isOpen,
        [variants[variant]]: true,
        [sizes[size]]: true,
      }"
      @click="() => (isOpen = !isOpen)"
    >
      <div class="bcc-accordion-title-wrap">
        <div>
          <slot name="left" />
        </div>
        <div>
          <span class="bcc-accordion-title">
            {{ title }}
          </span>
          <span v-if="subtitle" class="bcc-accordion-subtitle">{{ subtitle }}</span>
        </div>
      </div>
      <div class="bcc-accordion-right">
        <slot name="action" />
        <component class="bcc-accordion-right-icon bcc-accordion-icon" v-if="icon" :is="icon" />
        <BccBadge class="bcc-accordion-right-icon" v-if="badge" v-bind="badge">{{
          badge.text
        }}</BccBadge>
        <BccPin class="bcc-accordion-right-icon" v-show="pin" v-bind="pin" />
        <div class="bcc-accordion-right-icon bcc-accordion-icon">
          <ExpandMoreIcon />
        </div>
      </div>
    </div>
    <div v-if="isOpen" class="bcc-accordion-content">
      <slot />
    </div>
  </div>
</template>
