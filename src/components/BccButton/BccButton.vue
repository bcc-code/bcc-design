<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";
import type { Component } from "vue";

const buttonClassVariants = cva("font-semibold inline-flex items-center", {
  variants: {
    variant: {
      primary: "",
      secondary: "outline outline-offset-[-2px] outline-2",
      tertiary: "",
    },
    size: {
      xs: "text-xs py-1.5 px-3 space-x-1.5",
      sm: "text-sm py-2 px-3 space-x-1.5",
      base: "text-sm py-2.5 px-5 space-x-2",
      lg: "text-base py-3 px-5 space-x-2.5",
      xl: "text-base py-4 px-6 space-x-2.5",
    },
    rounded: {
      true: "rounded-full",
      false: "",
    },
    disabled: {
      true: "cursor-not-allowed pointer-events-none",
      false: "cursor-pointer",
    },
    iconPosition: {
      left: "",
      right: "flex-row-reverse space-x-reverse",
    },
    center: {
      true: "justify-center",
      false: "justify-between",
    },
  },
  compoundVariants: [
    {
      size: ["xs", "sm"],
      rounded: false,
      class: "rounded-md",
    },
    {
      size: ["base", "lg", "xl"],
      rounded: false,
      class: "rounded-lg",
    },
    {
      variant: "primary",
      disabled: true,
      class: "text-button-primary-disabled bg-button-primary-disabled dark:bg-gray-800",
    },
    {
      variant: "secondary",
      disabled: true,
      class:
        "text-button-secondary-disabled outline-button-secondary-disabled bg-button-secondary-disabled dark:bg-neutral-900",
    },
    {
      variant: "tertiary",
      disabled: true,
      class: "text-button-tertiary-disabled",
    },
    {
      variant: "primary",
      disabled: false,
      class: [
        "bg-button-primary-default text-button-primary-default hover:bg-button-primary-hover active:bg-button-primary-pressed active:text-white focus:outline-none focus:ring focus:bg-button-primary-focused focus:ring-silver-tree-700 focus:ring-offset-2",
      ],
    },
    {
      variant: "secondary",
      disabled: false,
      class: [
        "outline-button-secondary-default bg-transparent text-button-secondary-default hover:outline-button-secondary-hover hover:text-button-secondary-hover hover:bg-button-secondary-hover active:outline-button-secondary-pressed active:text-button-secondary-pressed focus:ring focus:ring-silver-tree-700 focus:ring-offset-2",
        "dark:outline-silver-tree-400 dark:text-silver-tree-400 dark:hover:outline-silver-tree-200 dark:hover:text-silver-tree-200 dark:hover:bg-silver-tree-900",
      ],
    },
    {
      variant: "tertiary",
      disabled: false,
      class: [
        "text-button-tertiary-default hover:bg-button-tertiary-hover hover:underline active:text-button-tertiary-hover active:underline focus:outline-none focus:ring focus:ring-silver-tree-700 focus:ring-offset-2 focus:underline",
        "dark:text-silver-tree-300 dark:hover:text-silver-tree-200 dark:hover:bg-silver-tree-900",
      ],
    },
  ],
  defaultVariants: {
    variant: "primary",
    size: "base",
  },
});

type ButtonVariants = VariantProps<typeof buttonClassVariants>;

const iconClassVariants = cva("", {
  variants: {
    size: {
      xs: "w-4 h-4",
      sm: "w-4 h-4",
      base: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-6 h-6",
    },
  },
});

type Props = {
  is?: "button" | "a" | string | Component;
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  iconPosition?: ButtonVariants["iconPosition"];
  center?: boolean;
  rounded?: boolean;
  disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
  is: "button",
  variant: "primary",
  size: "base",
  iconPosition: "left",
  center: true,
  rounded: false,
  disabled: false,
});
</script>

<template>
  <component
    :is="is"
    :disabled="disabled"
    :class="buttonClassVariants({ variant, size, rounded, iconPosition, center, disabled })"
  >
    <span :class="iconClassVariants({ size })" v-if="$slots.icon">
      <slot name="icon"></slot>
    </span>
    <span>
      <slot></slot>
    </span>
  </component>
</template>
