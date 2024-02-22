<script setup lang="ts">
import { OpenInNewIcon, CheckCircleFillIcon } from "@bcc-code/icons-vue";
import BccGraphicPoster, { ratioClasses, roundingClasses } from "./BccGraphicPoster.vue";

type Props = {
  bannerSrc?: string;
  logoSrc?: string;
  checked?: boolean;
  linkOut?: boolean;
  ratio?: keyof typeof ratioClasses;
  rounding?: keyof typeof roundingClasses;
};

withDefaults(defineProps<Props>(), {
  ratio: "wide",
  rounding: "xl",
  checked: false,
  linkOut: false,
});
</script>

<template>
  <div class="bcc-graphic" :style="`padding-bottom: ${ratioClasses[ratio]}`">
    <div class="bcc-graphic-open-in" v-if="linkOut">
      <OpenInNewIcon class="bcc-graphic-open-in-icon" />
    </div>
    <CheckCircleFillIcon class="bcc-graphic-check-icon" v-if="checked" />
    <BccGraphicPoster
      class="absolute"
      :bannerSrc="bannerSrc"
      :logoSrc="logoSrc"
      :ratio="ratio"
      :rounding="rounding"
    />
  </div>
</template>
