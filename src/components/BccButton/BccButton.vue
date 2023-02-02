<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const classVariants = cva("font-semibold", {
  variants: {
    kind: {
      primary:
        "bg-primary-dark-green-600 text-neutral-50 hover:bg-primary-dark-green-500 active:bg-primary-dark-green-400 active:text-white",
      secondary:
        "outline outline-offset-[-2px] outline-2 outline-primary-dark-green-600 bg-transparent text-primary-dark-green-600 hover:bg-primary-dark-green-100 active:outline-primary-dark-green-500 active:text-primary-dark-green-500",
      tertiary:
        "text-primary-dark-green-600 hover:bg-primary-dark-green-100 active:text-primary-dark-green-500",
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
  },
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
  disabled: boolean; // TODO define in design system
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
    :class="classVariants({ kind, size, look })"
  >
    <slot></slot>
  </button>
</template>
