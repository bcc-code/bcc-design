<script setup lang="ts">
type Props = {
  bannerSrc?: string;
  logoSrc?: string;
  rounding?: "md" | "xl";
};

withDefaults(defineProps<Props>(), {
  rounding: "xl",
});
</script>

<template>
  <div class="relative h-full">
    <div
      class="bcc-graphic-poster"
      :class="{ 'bcc-graphic-poster-rounding-md': rounding === 'md' }"
      :style="[bannerSrc ? `background-image: url(${bannerSrc});` : '']"
    >
      <img class="h-3/4" v-if="logoSrc" :src="logoSrc" />
    </div>
  </div>
</template>
