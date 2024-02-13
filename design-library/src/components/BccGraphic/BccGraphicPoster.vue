<script setup lang="ts">
import { ref } from "vue";

type Props = {
  bannerSrc?: string;
  logoSrc?: string;
  rounding?: "md" | "xl";
  ratio?: keyof typeof size;
};

withDefaults(defineProps<Props>(), {
  rounding: "xl",
  ratio: "wide",
});

const loadedBanner = ref(false);
const loadedLogo = ref(false);

const size = {
  ultraWide: "42.85%", // 21:9
  wide: "56.25%", // 16:9
  landscape: "75%", // 4:3
  square: "100%", // 1:1
  portrait: "133.33%", // 3:4
};
</script>

<template>
  <div class="relative flex max-h-full w-full" :style="`padding-bottom: ${size[ratio]}`">
    <img
      v-show="loadedBanner"
      @load="loadedBanner = true"
      :src="bannerSrc"
      defer
      class="absolute inset-0 h-full w-full object-cover object-center"
      :class="rounding === 'md' ? 'rounded-md' : 'rounded-xl'"
    />
    <div
      v-show="!loadedBanner"
      class="absolute inset-0 h-full w-full animate-pulse bg-gradient-to-tr from-brand-600 to-silver-tree-600 object-cover object-center dark:from-polo-blue-900 dark:to-polo-blue-600"
      :class="rounding === 'md' ? 'rounded-md' : 'rounded-xl'"
    ></div>

    <template v-if="logoSrc">
      <img
        v-show="loadedLogo"
        @load="loadedLogo = true"
        :src="logoSrc"
        defer
        class="absolute inset-1/4 h-1/2 w-1/2 object-cover object-center"
        :class="rounding === 'md' ? 'rounded-md' : 'rounded-xl'"
      />
      <div
        v-show="!loadedLogo"
        class="absolute inset-1/4 h-1/2 w-1/2 animate-pulse bg-black bg-opacity-10 blur-sm"
        :class="rounding === 'md' ? 'rounded-md' : 'rounded-xl'"
      ></div>
    </template>
  </div>
</template>
