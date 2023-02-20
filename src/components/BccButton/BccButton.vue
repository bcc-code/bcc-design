<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

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
      true: "rounded-lg",
      false: "rounded",
    },
    disabled: {
      true: "text-neutral-500 fill-neutral-500 cursor-not-allowed",
      false: "cursor-pointer",
    },
    iconPosition: {
      left: "",
      right: "flex-row-reverse space-x-reverse",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      disabled: true,
      class: "bg-neutral-300",
    },
    {
      variant: "secondary",
      disabled: true,
      class: "outline-neutral-300 bg-neutral-50",
    },
    {
      variant: "primary",
      disabled: false,
      class:
        "bg-tree-green-600 text-neutral-50 fill-neutral-50 hover:bg-tree-green-700 active:bg-tree-green-500 active:text-white active:fill-white focus:outline-none focus:ring focus:bg-tree-green-600 focus:ring-primary-dark-green-700 focus:ring-offset-2",
    },
    {
      variant: "secondary",
      disabled: false,
      class:
        "outline-tree-green-600 bg-transparent text-tree-green-600 fill-tree-green-600 hover:outline-tree-green-700 hover:text-tree-green-700 hover:fill-tree-green-700 hover:bg-tree-green-50 active:outline-tree-green-500 active:text-tree-green-500 active:fill-tree-green-500 focus:ring focus:ring-primary-dark-green-700 focus:ring-offset-2",
    },
    {
      variant: "tertiary",
      disabled: false,
      class:
        "text-tree-green-600 fill-tree-green-600 hover:bg-tree-green-50 hover:underline active:text-tree-green-500 active:fill-tree-green-500 active:underline focus:outline-none focus:ring focus:ring-primary-dark-green-700 focus:ring-offset-2 focus:underline",
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
  is?: "button" | "a";
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  iconPosition?: ButtonVariants["iconPosition"];
  rounded?: boolean;
  disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
  is: "button",
  variant: "primary",
  size: "base",
  iconPosition: "left",
  rounded: false,
  disabled: false,
});
</script>

<template>
  <component
    :is="is"
    :disabled="is === 'button' ? disabled : null"
    :class="
      buttonClassVariants({ variant, size, rounded, iconPosition, disabled })
    "
  >
    <span :class="iconClassVariants({ size })" v-if="$slots.icon">
      <slot name="icon"></slot>
    </span>
    <span>
      <slot></slot>
    </span>
  </component>
</template>
