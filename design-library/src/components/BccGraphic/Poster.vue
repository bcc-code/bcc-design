<script setup lang="ts">
defineProps<{
  bannerSrc?: string;
  logoSrc?: string;
  rounding: "md" | "xl";
}>();
</script>

<template>
  <div class="relative h-full">
    <div
      class="bcc-graphic-poster"
      :style="[
        bannerSrc ? `background-image: url(${bannerSrc});` : '',
        rounding === 'md' ? 'border-radius: 6px;' : rounding === 'xl' ? 'border-radius: 12px;' : '',
      ]"
    >
      <img class="h-3/4" v-if="logoSrc" :src="logoSrc" />
    </div>
  </div>
</template>
