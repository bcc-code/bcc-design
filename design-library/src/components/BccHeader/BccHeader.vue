<script setup lang="ts">
type Props = {
  overline?: string;
  title?: string;
  underline?: string;
};

withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div>
    <p class="text-caption text-secondary">{{ overline }}</p>
    <div class="flex items-center justify-between">
      <h2 class="text-heading mb-0.5 truncate font-bold">{{ title }}</h2>
      <slot name="infoRight" />
    </div>
    <p class="text-caption text-secondary">{{ underline }}</p>
  </div>
</template>
