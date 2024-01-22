<script setup lang="ts">
type Props = {
  overline?: string;
  title?: string;
};

withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="bcc-item-tile">
    <div>
      <p class="text-caption truncate text-secondary">{{ overline }}</p>
      <h2 class="text-heading truncate font-bold">{{ title }}</h2>
    </div>
    <slot name="infoRight" />
  </div>
</template>
