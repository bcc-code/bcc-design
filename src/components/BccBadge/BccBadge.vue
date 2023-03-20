<script setup lang="ts">
import type { Component } from "vue";
import { sizeVariants, variants } from "../../composables/variants";

withDefaults(
  defineProps<{
    icon?: string | Component | Function;
    iconRight?: boolean;
    size?: keyof typeof sizeVariants;
    variant?: keyof typeof variants;
  }>(),
  {
    iconRight: false,
    size: "xs",
    variant: "neutral",
  }
);
</script>

<template>
  <div
    class="inline-flex items-center justify-center rounded-md border py-[.2em] px-[1em] font-medium leading-none tracking-wide"
    :class="[variants[variant], sizeVariants[size] ?? size]"
  >
    <component
      v-if="icon"
      :is="icon"
      class="h-[1.2em] w-[1.2em] shrink-0"
      :class="[iconRight ? 'order-3 ml-[.4em]' : 'order-1 mr-[.4em]']"
    />
    <span class="order-2"><slot></slot></span>
  </div>
</template>
