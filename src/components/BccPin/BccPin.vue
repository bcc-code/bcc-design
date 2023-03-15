<script setup lang="ts">
import type { Component } from "vue";
import { sizeVariants, variants } from "../../composables/variants";

withDefaults(
  defineProps<{
    icon?: string | Component;
    size?: keyof typeof sizeVariants;
    variant?: keyof typeof variants;
  }>(),
  {
    size: "xs",
    variant: "neutral",
  }
);
</script>

<template>
  <div
    class="inline-block rounded-full p-[.3em] shadow-md"
    :class="[variants[variant], sizeVariants[size] ?? size]"
  >
    <component :is="icon" class="h-[1.2em] w-[1.2em]" />
  </div>
</template>
