<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import type { Component } from "vue";

const buttonClassVariants = cva(
  "font-semibold inline-flex items-center active:shadow-inner hover:shadow-md focus:outline-none focus:ring focus:ring-silver-tree-700 focus:ring-offset-2",
  {
    variants: {
      color: {
        default: "",
        danger: "",
      },
      variant: {
        primary: "border-transparent border-2",
        secondary: "border-2",
        tertiary: "border-transparent border-2",
      },
      size: {
        xs: "text-xs py-1.5 px-3 gap-x-1.5",
        sm: "text-sm py-2 px-3 gap-x-1.5",
        base: "text-sm py-2.5 px-5 gap-x-2",
        lg: "text-base py-3 px-5 gap-x-2.5",
        xl: "text-base py-4 px-6 gap-x-2.5",
      },
      rounded: {
        true: "rounded-full",
        false: "",
      },
      disabled: {
        true: "cursor-not-allowed pointer-events-none",
        false: "cursor-pointer",
      },
      iconRight: {
        true: "gap-x-reverse",
        false: "",
      },
      iconOnly: {
        true: "rounded-full",
        false: "",
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
        iconOnly: true,
        rounded: false,
        class: "rounded-full",
      },
      {
        size: "xs",
        iconOnly: true,
        class: "w-6 h-6 p-1",
      },
      {
        size: "sm",
        iconOnly: true,
        class: "w-8 h-8 p-1",
      },
      {
        size: "base",
        iconOnly: true,
        class: "w-10 h-10 p-2",
      },
      {
        size: "lg",
        iconOnly: true,
        class: "w-12 h-12 p-2",
      },
      {
        size: "xl",
        iconOnly: true,
        class: "w-14 h-14 p-3",
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
          "text-button-secondary-disabled border-button-secondary-disabled bg-button-secondary-disabled dark:bg-neutral-900 dark:border-neutral-700",
      },
      {
        variant: "tertiary",
        disabled: true,
        class: "text-button-tertiary-disabled",
      },
      {
        variant: "primary",
        color: "default",
        disabled: false,
        class: [
          "bg-button-primary text-button-primary hover:bg-button-primary-hover active:bg-button-primary-pressed active:text-button-primary focus:bg-button-primary-focused",
        ],
      },
      {
        variant: "secondary",
        color: "default",
        disabled: false,
        class: [
          "border-button-secondary bg-transparent text-button-secondary hover:border-button-secondary-hover hover:text-button-secondary-hover hover:bg-button-secondary-hover active:border-button-secondary-pressed active:text-button-secondary-pressed",
          "dark:border-silver-tree-400 dark:text-silver-tree-400 dark:hover:border-silver-tree-200 dark:hover:text-silver-tree-200 dark:hover:bg-silver-tree-900",
        ],
      },
      {
        variant: "tertiary",
        color: "default",
        disabled: false,
        class: [
          "text-button-tertiary hover:bg-button-tertiary-hover hover:underline active:text-button-tertiary-hover active:underline focus:underline",
          "dark:text-silver-tree-300 dark:hover:text-silver-tree-200 dark:hover:bg-silver-tree-900",
        ],
      },
      {
        variant: "primary",
        color: "danger",
        disabled: false,
        class: [
          "bg-red-700 text-white hover:bg-red-800 active:bg-red-600 active:text-white focus:bg-red-700",
        ],
      },
      {
        variant: "secondary",
        color: "danger",
        disabled: false,
        class: [
          "border-neutral-200 bg-transparent text-red-700 hover:border-red-700 hover:text-red-800 hover:bg-red-50 active:border-red-600 active:text-red-600",
          "dark:border-red-400 dark:text-red-400 dark:hover:border-red-200 dark:hover:text-red-200 dark:hover:bg-red-900",
        ],
      },
      {
        variant: "tertiary",
        color: "danger",
        disabled: false,
        class: [
          "text-neutral-700 hover:bg-red-50 hover:underline hover:text-red-800 active:text-red-600 active:underline focus:underline",
          "dark:text-neutral-300 dark:hover:text-red-200 dark:hover:bg-red-900",
        ],
      },
    ],
    defaultVariants: {
      variant: "primary",
      color: "default",
      size: "base",
    },
  }
);

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
  color?: ButtonVariants["color"];
  size?: ButtonVariants["size"];
  icon?: string | Component | Function;
  iconRight?: boolean;
  center?: boolean;
  rounded?: boolean;
  disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
  is: "button",
  variant: "primary",
  color: "default",
  size: "base",
  iconRight: false,
  center: true,
  rounded: false,
  disabled: false,
});
</script>

<template>
  <component
    :is="is"
    :disabled="disabled"
    :class="
      twMerge(
        buttonClassVariants({
          variant,
          color,
          size,
          rounded,
          iconRight,
          center,
          disabled,
          iconOnly: icon !== undefined && !$slots.default,
        })
      )
    "
  >
    <component v-if="icon" :is="icon" class="order-2" :class="iconClassVariants({ size })" />
    <span v-if="$slots.default" :class="[iconRight ? 'order-1' : 'order-3']"><slot /></span>
  </component>
</template>
