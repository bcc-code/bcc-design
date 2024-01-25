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
      <p class="bcc-item-tile-overline" v-if="overline">{{ overline }}</p>
      <h2 class="bcc-item-tile-title">{{ title }}</h2>
    </div>
    <slot />
  </div>
</template>
