<script setup lang="ts">
import type { Component } from "vue";
type Props = {
  title?: string;
  infoIcon?: Component;
  infoText?: string;
};

withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="flex items-center justify-between">
    <div>
      <h4 class="truncate text-xs font-bold">{{ title }}</h4>
      <div class="text-caption-sm flex items-center gap-x-1 text-tertiary">
        <component :is="infoIcon" v-if="infoIcon" class="h-4 w-4" />
        <p class="truncate">{{ infoText }}</p>
      </div>
    </div>
    <slot name="infoRight" />
  </div>
</template>
