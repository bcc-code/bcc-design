<script setup lang="ts">
import type { Component } from "vue";

type Props = {
  is?: "button" | "a" | string | Component;
  variant?: 'primary' | 'danger' | 'info';
  size?: keyof typeof sizes;
  icon?: string | Component,
  iconRight?: boolean,
  center?: boolean;
  rounded?: boolean;
  outlined?: boolean,
  flat?: boolean,
  disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
  is: "button",
  variant: "primary",
  size: "base",
  iconRight: false,
  center: true,
  rounded: false,
  outlined: false,
  flat: false,
  disabled: false,
});
</script>

<template>
  <component
    :is="is"
    :disabled="disabled"
    class="bcc-button default"
    :class="[size, disabled, `theme-${variant}`, {
      'variant-rounded': rounded,
      'variant-flat': flat,
      'variant-outlined': outlined,
    }]"
  >
    <component v-if="icon" :is="icon" class="h-[1.4em] w-[1.4em] shrink-0" :class="[
      iconRight ? 'ml-[.2em] order-3' : 'mr-[.2em] order-1'
    ]"/>
    <span class="order-2">
      <slot></slot>
    </span>
  </component>
</template>

<style scoped>
.theme-primary {
  --btn-surface: theme(colors.tree-green.600);
  --btn-alt: theme(colors.neutral.50);

  --btn-surface--hover: theme(colors.tree-green.700);
  --btn-alt--hover: theme(colors.tree-green.50);

  --btn-surface--active: theme(colors.tree-green.500);
  --btn-alt--active: theme(colors.white);

  --btn-ring: theme(colors.primary-dark-green.700);
}

.theme-danger {
  --btn-surface: theme(colors.red.700);
  --btn-alt: theme(colors.neutral.50);

  --btn-surface--hover: theme(colors.red.800);
  --btn-alt--hover: theme(colors.red.50);

  --btn-surface--active: theme(colors.red.600);
  --btn-alt--active: theme(colors.red.50);

  --btn-ring: theme(colors.red.700);
}

.theme-info {
  --btn-surface: theme(colors.blue.600);
  --btn-alt: theme(colors.neutral.50);

  --btn-surface--hover: theme(colors.blue.700);
  --btn-alt--hover: theme(colors.blue.50);

  --btn-surface--active: theme(colors.blue.500);
  --btn-alt--active: theme(colors.white);

  --btn-ring: theme(colors.blue.700);
}


.theme-warn {
  --btn-surface: theme(colors.yellow.600);
  --btn-alt: theme(colors.neutral.50);

  --btn-surface--hover: theme(colors.yellow.700);
  --btn-alt--hover: theme(colors.yellow.50);

  --btn-surface--active: theme(colors.yellow.500);
  --btn-alt--active: theme(colors.white);

  --btn-ring: theme(colors.yellow.700);
}

@media (prefers-color-scheme: dark) {
  .theme-primary {
    --btn-surface: theme(colors.tree-green.300);
    --btn-alt: theme(colors.neutral.900);

    --btn-surface--hover: theme(colors.tree-green.400);
    --btn-alt--hover: theme(colors.tree-green.900);

    --btn-surface--active: theme(colors.tree-green.200);
    --btn-alt--active: theme(colors.tree-green.800);

    --btn-ring: theme(colors.primary-dark-green.600);
  }
}

.default {
  --btn-bg: var(--btn-surface);
  --btn-text: var(--btn-alt);
  --btn-border: var(--btn-surface);

  --btn-bg--hover: var(--btn-surface--hover);
  --btn-text--hover: var(--btn-alt);
  --btn-border--hover: var(--btn-bg--hover);

  --btn-bg--active: var(--btn-surface--active);
  --btn-text--active: var(--btn-alt--active);
  --btn-border--active: var(--btn-bg--active);

  --tw-ring-opacity: 1;
  --tw-ring-color: var(--btn-ring);
}

.xs {
  @apply text-xs py-1.5 px-3 space-x-1.5 rounded-md;
}
.sm {
  @apply text-sm py-2 px-3 space-x-1.5 rounded-md;
}
.base {
  @apply text-sm py-2.5 px-5 space-x-2 rounded-lg;
}
.lg {
  @apply text-base py-3 px-5 space-x-2.5 rounded-lg;
}
.xl {
  @apply text-base py-4 px-6 space-x-2.5 rounded-lg;
}

.variant-rounded {
  @apply rounded-full;
}
.variant-flat {
  --btn-bg: transparent;
  --btn-border: transparent;
  --btn-text: var(--btn-surface);

  --btn-bg--hover: var(--btn-alt--hover);
  --btn-text--hover: var(--btn-surface--hover);

  --btn-bg--active: var(--btn-alt--active);
  --btn-text--active: var(--btn-surface--active);

  --btn-border--hover: var(--btn-alt--hover);
  --btn-border--active: var(--btn-alt--active);
  --tw-ring-color: var(--btn-surface);
}

.variant-outlined {
  --btn-bg: none;
  --btn-text: var(--btn-surface);

  --btn-bg--hover: var(--btn-alt--hover);
  --btn-text--hover: var(--btn-surface--hover);

  --btn-bg--active: var(--btn-alt--active);
  --btn-text--active: var(--btn-surface--active);

  --btn-border--hover: var(--btn-surface--hover);
  --btn-border--active: var(--btn-surface--active);
}

.variant-outlined.theme-danger {
  --btn-border: theme(colors.neutral.200);
}

.bcc-button {
  @apply cursor-pointer border-2 border-solid font-semibold inline-flex items-center justify-center focus:outline-none focus:ring focus:ring-offset-2;
  border-color: var(--btn-border);
  background: var(--btn-bg);
  color: var(--btn-text);
}
.bcc-button:hover {
  background: var(--btn-bg--hover);
  color: var(--btn-text--hover);
  border-color: var(--btn-border--hover);
}

.bcc-button:active {
  @apply shadow-inner;
  background: var(--btn-bg--active);
  color: var(--btn-text--active);
  border-color: var(--btn-border--active);
}

.bcc-button:disabled, .bcc-button[disabled] {
  @apply cursor-not-allowed pointer-events-none;

  --btn-surface: theeme(colors.neutral.300);
  --btn-alt: theme(colors.neutral.500);
}

@media (prefers-color-scheme: dark) {
  .bcc-button:disabled, .bcc-button[disabled] {
    --btn-surface: theme(colors.neutral.800);
  }
}
</style>