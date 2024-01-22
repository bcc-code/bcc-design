<script setup lang="ts">
type Props = {
  title: string;
  overline?: string;
};
defineProps<Props>();
</script>

<template>
  <div class="bcc-item-tile">
    <div>
      <p class="text-caption truncate text-secondary" v-if="overline">{{ overline }}</p>
      <h2 class="text-heading truncate font-bold">{{ title }}</h2>
    </div>
    <slot />
  </div>
</template>
