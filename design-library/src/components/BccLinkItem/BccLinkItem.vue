<script setup lang="ts">
import { ArrowForwardIcon } from "@bcc-code/icons-vue";
</script>

<template>
  <div class="bcc-link-item border-secondary group">
    <label class="bcc-link-item-label"><slot /></label>
    <div class="bcc-link-item-arrow group-hover:pr-0">
      <ArrowForwardIcon class="bcc-link-item-icon" />
    </div>
  </div>
</template>
