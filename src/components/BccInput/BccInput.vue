<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const inputClassVariants = cva(
  "px-4 py-3 text-sm rounded border focus:outline-2",
  {
    variants: {
      state: {
        default: "focus:outline-primary-dark-green-600 border-neutral-300",
        error: "border-red-500 bg-red-50 text-red-700 focus:outline-red-600",
        success:
          "border-green-500 bg-green-50 text-green-700 focus:outline-green-600",
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
        class: "text-gray-900",
      },
      {
        state: "default",
        disabled: true,
        class: "bg-neutral-100 text-neutral-400",
      },
    ],
    defaultVariants: {},
  }
);

const messageClassVariants = cva("text-sm", {
  variants: {
    state: {
      default: "text-neutral-500",
      error: "text-red-600",
      success: "text-green-600",
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
    <input
      :disabled="disabled"
      :class="inputClassVariants({ state, disabled })"
      v-bind="$attrs"
    />
    <span v-if="$slots.default" :class="messageClassVariants({ state })">
      <slot></slot>
    </span>
  </span>
</template>
