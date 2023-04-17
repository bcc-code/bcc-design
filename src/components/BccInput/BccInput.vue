<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const inputClassVariants = cva("px-4 py-3 text-sm rounded-lg border focus:outline-2 ", {
  variants: {
    state: {
      default: "border-on-secondary focus:outline-silver-tree-600",
      error: "border-danger focus:outline-danger",
      success: "border-success focus:outline-success",
    },
    disabled: {
      true: "cursor-not-allowed",
      false: "",
    },
  },
  compoundVariants: [
    {
      state: "default",
      disabled: false,
      class: "text-primary",
    },
    {
      state: "default",
      disabled: true,
      class: "bg-neutral-100 text-neutral-400",
    },
  ],
  defaultVariants: {},
});

const messageClassVariants = cva("text-sm", {
  variants: {
    state: {
      default: "text-secondary",
      error: "text-danger",
      success: "text-success",
    },
  },
  compoundVariants: [],
  defaultVariants: {},
});

type InputVariants = VariantProps<typeof inputClassVariants>;

type Props = {
  state?: InputVariants["state"];
  disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
  state: "default",
  disabled: false,
});
</script>

<template>
  <span class="inline-flex flex-col space-y-2">
    <input :disabled="disabled" :class="inputClassVariants({ state, disabled })" v-bind="$attrs" />
    <span v-if="$slots.default" :class="messageClassVariants({ state })">
      <slot></slot>
    </span>
  </span>
</template>
