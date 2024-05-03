<script setup lang="ts">
import { ExpandMoreIcon } from "@bcc-code/icons-vue";
import { ref } from "vue";

const variants = {
  filled: "bcc-accordion-filled",
  outlined: "bcc-accordion-outlined",
  soft: "bcc-accordion-soft",
  ghost: "bcc-accordion-ghost",
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
};

const props = withDefaults(defineProps<Props>(), {
  title: "",
  subtitle: "",
  variant: "filled",
  size: "base",
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
          <slot name="prepend" />
        </div>
        <div>
          <span class="bcc-accordion-title">
            {{ title }}
          </span>
          <span v-if="subtitle" class="bcc-accordion-subtitle">{{ subtitle }}</span>
        </div>
      </div>
      <div class="bcc-accordion-right">
        <slot name="append" />
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
