<script setup lang="ts">
type Props = {
  title: string;
  overline?: string;
  underline?: string;
};

withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div>
    <p class="bcc-header-overline" v-if="overline">{{ overline }}</p>
    <div class="bcc-header-title-wrapper">
      <h2 class="bcc-header-title">{{ title }}</h2>
      <slot name="infoRight" />
    </div>
    <p class="bcc-header-underline" v-if="underline">{{ underline }}</p>
  </div>
</template>
