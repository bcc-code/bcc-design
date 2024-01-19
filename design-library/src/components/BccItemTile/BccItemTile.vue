<script setup lang="ts">
type Props = {
  overline?: string;
  title?: string;
};

withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="bcc-item-tile">
    <p class="text-caption opacity-60">{{ overline }}</p>
    <h2 class="text-heading mb-0.5 truncate font-bold">{{ title }}</h2>
    <slot name="infoRight" />
  </div>
</template>
