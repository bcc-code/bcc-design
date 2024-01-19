<script setup lang="ts">
import { OpenInNewIcon, CheckCircleFillIcon } from "@bcc-code/icons-vue";
import Poster from "./Poster.vue";

type Props = {
  bannerSrc?: string;
  logoSrc?: string;
  checked?: boolean;
  linkOut?: boolean;
  rounding: "md" | "xl";
};

withDefaults(defineProps<Props>(), {
  rounding: "xl",
});
</script>

<template>
  <div class="bcc-graphic-wrapper">
    <div class="bcc-graphic-open-in" v-if="linkOut">
      <OpenInNewIcon class="bcc-graphic-open-in-icon" />
    </div>
    <CheckCircleFillIcon class="bcc-graphic-check-icon" v-if="checked" />
    <Poster :bannerSrc="bannerSrc" :logoSrc="logoSrc" :rounding="rounding" />
  </div>
</template>
