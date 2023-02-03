<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const classVariants = cva("font-semibold", {
  variants: {
    kind: {
      primary: "",
      secondary: "outline outline-offset-[-2px] outline-2",
      tertiary: "",
    },
    size: {
      xs: "text-xs py-1.5 px-3",
      sm: "text-sm py-2 px-3",
      base: "text-sm py-2.5 px-5",
      lg: "text-base py-3 px-5",
      xl: "text-base py-4 px-6",
    },
    look: {
      regular: "rounded",
      rounded: "rounded-lg",
    },
    disabled: {
      true: "text-neutral-500 cursor-not-allowed",
      false: "",
    },
  },
  compoundVariants: [
    {
      kind: "primary",
      disabled: true,
      class: "bg-neutral-300",
    },
    {
      kind: "secondary",
      disabled: true,
      class: "outline-neutral-300",
    },
    {
      kind: "primary",
      disabled: false,
      class:
        "bg-primary-dark-green-600 text-neutral-50 hover:bg-primary-dark-green-500 active:bg-primary-dark-green-400 active:text-white",
    },
    {
      kind: "secondary",
      disabled: false,
      class:
        "outline-primary-dark-green-600 bg-transparent text-primary-dark-green-600 hover:bg-primary-dark-green-100 active:outline-primary-dark-green-500 active:text-primary-dark-green-500",
    },
    {
      kind: "tertiary",
      disabled: false,
      class:
        "text-primary-dark-green-600 hover:bg-primary-dark-green-100 active:text-primary-dark-green-500",
    },
  ],
  defaultVariants: {
    kind: "primary",
    size: "base",
    look: "regular",
  },
});

type ButtonVariants = VariantProps<typeof classVariants>;

type Props = {
  type?: "button" | "submit" | "reset";
  kind?: ButtonVariants["kind"];
  size?: ButtonVariants["size"];
  look?: ButtonVariants["look"];
  disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
  type: "button",
  kind: "primary",
  size: "base",
  look: "regular",
  disabled: false,
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="classVariants({ kind, size, look, disabled })"
  >
    <slot></slot>
  </button>
</template>
