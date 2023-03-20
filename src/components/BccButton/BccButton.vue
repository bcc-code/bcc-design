<script setup lang="ts">
import type { Component } from "vue";

type Props = {
  is?: "button" | "a" | string | Component;
  variant?: "primary" | "danger" | "info";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  icon?: string | Component | Function;
  iconRight?: boolean;
  center?: boolean;
  rounded?: boolean;
  outlined?: boolean;
  flat?: boolean;
  disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
  is: "button",
  variant: "primary",
  size: "md",
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
    :class="[
      size,
      disabled,
      `theme-${variant}`,
      {
        rounded: rounded,
        flat: flat,
        outlined: outlined,
        iconOnly: $slots.default === undefined,
      },
    ]"
  >
    <component v-if="icon" :is="icon" class="order-2 h-[1.4em] w-[1.4em] shrink-0" />
    <span v-if="$slots.default" :class="[iconRight ? 'order-1' : 'order-3']"><slot /></span>
  </component>
</template>

<style scoped>
.theme-primary {
  --btn-surface: theme(colors.silver-tree.600);
  --btn-alt: theme(colors.neutral.50);

  --btn-surface--hover: theme(colors.silver-tree.700);
  --btn-alt--hover: theme(colors.silver-tree.50);

  --btn-surface--active: theme(colors.silver-tree.500);
  --btn-alt--active: theme(colors.white);

  --btn-ring: theme(colors.silver-tree.700);
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

.theme-neutral {
  --btn-surface: theme(colors.neutral.600);
  --btn-alt: theme(colors.neutral.50);

  --btn-surface--hover: theme(colors.neutral.700);
  --btn-alt--hover: theme(colors.neutral.50);

  --btn-surface--active: theme(colors.neutral.500);
  --btn-alt--active: theme(colors.white);

  --btn-ring: theme(colors.neutral.700);
}

@media (prefers-color-scheme: dark) {
  .theme-primary {
    --btn-surface: theme(colors.silver-tree.300);
    --btn-alt: theme(colors.neutral.900);

    --btn-surface--hover: theme(colors.silver-tree.400);
    --btn-alt--hover: theme(colors.silver-tree.900);

    --btn-surface--active: theme(colors.silver-tree.200);
    --btn-alt--active: theme(colors.silver-tree.800);

    --btn-ring: theme(colors.silver-tree.600);
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

  @apply flex-shrink-0 transition-all focus:ring-offset-2;
}

.xs {
  @apply gap-x-1.5 rounded-md py-1.5 px-3 text-xs;
}
.sm {
  @apply gap-x-1.5 rounded-md py-2 px-3 text-sm;
}
.md {
  @apply gap-x-2 rounded-lg py-2.5 px-5 text-sm;
}
.lg {
  @apply gap-x-2.5 rounded-lg py-3 px-5 text-base;
}
.xl {
  @apply gap-x-2.5 rounded-lg py-4 px-6 text-base;
}
.iconOnly {
  @apply h-[2.4em] w-[2.4em] rounded-full p-0.5;
}
.rounded {
  @apply rounded-full;
}
.flat {
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

  @apply hover:shadow-md focus:ring-offset-0 active:shadow-inner;
}

.outlined {
  --btn-bg: none;
  --btn-text: var(--btn-surface);

  --btn-bg--hover: var(--btn-alt--hover);
  --btn-text--hover: var(--btn-surface--hover);

  --btn-bg--active: var(--btn-alt--active);
  --btn-text--active: var(--btn-surface--active);

  --btn-border--hover: var(--btn-surface--hover);
  --btn-border--active: var(--btn-surface--active);

  @apply hover:shadow-md focus:ring-offset-0 active:shadow-inner;
}

.outlined.theme-danger {
  --btn-border: theme(colors.neutral.200);
}

.bcc-button {
  @apply inline-flex cursor-pointer items-center justify-center border-2 border-solid font-semibold focus:outline-none focus:ring;
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

.bcc-button:disabled,
.bcc-button[disabled] {
  @apply pointer-events-none cursor-not-allowed;

  --btn-surface: theme(colors.neutral.300);
  --btn-alt: theme(colors.neutral.500);
}
.outlined.bcc-button:disabled,
.outlined.bcc-button[disabled],
.flat.bcc-button:disabled,
.flat.bcc-button[disabled] {
  --btn-text: theme(colors.neutral.500);
}

@media (prefers-color-scheme: dark) {
  .bcc-button:disabled,
  .bcc-button[disabled] {
    --btn-surface: theme(colors.neutral.800);
  }
}
</style>
