<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const badgeClassVariants = cva("py-0.5 rounded-md space-x-1 inline-flex items-center", {
  variants: {
    type: {
      neutral: "bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-300",
      error: "bg-red-50 text-red-900 dark:bg-red-900 dark:text-red-300",
      warning: "bg-yellow-50 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-300",
      success: "bg-green-50 text-green-900 dark:bg-green-900 dark:text-green-300",
      info: "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-300",
    },
    size: {
      "base": "text-xs px-2.5",
      "lg": "text-sm px-3 leading-5",
    },
    iconPosition: {
      left: "",
      right: "flex-row-reverse space-x-reverse",
    },
  },
});

type BadgeVariants = VariantProps<typeof badgeClassVariants>;

const iconClassVariants = cva("inline-block", {
  variants: {
    type: {
      neutral: "fill-neutral-800",
      error: "fill-red-800",
      warning: "fill-yellow-800",
      success: "fill-green-800",
      info: "fill-blue-800",
    },
    size: {
      "base": "w-2.5 h-2.5",
      "lg": "w-4 h-4",
    },
  },
});

type Props = {
  type?: BadgeVariants["type"];
  size?: BadgeVariants["size"];
  iconPosition?: BadgeVariants["iconPosition"];
};

withDefaults(defineProps<Props>(), {
  type: "neutral",
  size: "base",
  iconPosition: "left",
});
</script>

<template>
  <span :class="badgeClassVariants({ type, size, iconPosition })">
    <span :class="iconClassVariants({ type, size })" v-if="$slots.icon">
      <slot name="icon"></slot>
    </span>
    <span><slot /></span>
  </span>
</template>
