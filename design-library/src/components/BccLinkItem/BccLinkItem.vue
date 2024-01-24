<script setup lang="ts">
import { ArrowForwardIcon } from "@bcc-code/icons-vue";
type Props = {
  isLast?: boolean;
};
defineProps<Props>();
</script>

<template>
  <div class="bcc-link-item border-secondary group" :class="{ 'border-none': isLast }">
    <label class="bcc-link-item-label"><slot></slot></label>
    <div class="bcc-link-item-arrow group-hover:pr-0">
      <ArrowForwardIcon class="bcc-link-item-icon" />
    </div>
  </div>
</template>
