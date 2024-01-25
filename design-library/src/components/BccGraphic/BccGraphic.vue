<script setup lang="ts">
import { OpenInNewIcon, CheckCircleFillIcon } from "@bcc-code/icons-vue";
import BccGraphicPoster from "./BccGraphicPoster.vue";

type Props = {
  bannerSrc?: string;
  logoSrc?: string;
  checked?: boolean;
  linkOut?: boolean;
  rounding?: "md" | "xl";
};

withDefaults(defineProps<Props>(), {
  rounding: "xl",
  checked: false,
  linkOut: false,
});
</script>

<template>
  <div class="bcc-graphic">
    <div class="bcc-graphic-open-in" v-if="linkOut">
      <OpenInNewIcon class="bcc-graphic-open-in-icon" />
    </div>
    <CheckCircleFillIcon class="bcc-graphic-check-icon" v-if="checked" />
    <BccGraphicPoster :bannerSrc="bannerSrc" :logoSrc="logoSrc" :rounding="rounding" />
  </div>
</template>
