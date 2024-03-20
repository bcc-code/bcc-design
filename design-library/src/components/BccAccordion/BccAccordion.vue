<script setup lang="ts">
import { ref, defineProps, withDefaults, type Component } from "vue";
import { ExpandMoreIcon } from "@bcc-code/icons-vue";
import { BccBadge, BccPin } from "@/index";

const variants = {
  readonly: "bcc-accordion-readonly",
  brand: "bcc-accordion-brand",
  interactive: "bcc-accordion-interactive",
};

const sizes = {
  base: "bcc-accordion-base",
  lg: "bcc-accordion-lg",
};

type Props = {
  title: string;
  subtitle?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  icon?: string | Component | Function;
  badge?: InstanceType<typeof BccBadge>["$props"] & { text: string };
  pin?: InstanceType<typeof BccPin>["$props"];
};

withDefaults(defineProps<Props>(), {
  title: "",
  subtitle: "",
  variant: "readonly",
  size: "base",
  icon: "",
  badge: undefined,
  pin: undefined,
});

const isOpen = ref(false);
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
      <div class="flex flex-row items-center">
        <div>
          <slot name="left" />
        </div>
        <div>
          <span class="bcc-accordion__title">
            {{ title }}
          </span>
          <span v-if="subtitle" class="bcc-accordion__subtitle">{{ subtitle }}</span>
        </div>
      </div>
      <div class="bcc-accordion__right">
        <slot name="action" />
        <component class="bcc-accordion__right-icon bcc-accordion__icon" v-if="icon" :is="icon" />
        <BccBadge class="bcc-accordion__right-icon" v-if="badge" v-bind="badge">{{
          badge.text
        }}</BccBadge>
        <BccPin class="bcc-accordion__right-icon" v-show="pin" v-bind="pin" />
        <div class="bcc-accordion__right-icon bcc-accordion__icon">
          <ExpandMoreIcon />
        </div>
      </div>
    </div>
    <div v-if="isOpen" class="bcc-accordion-content">
      <slot />
    </div>
  </div>
</template>
