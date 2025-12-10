<script setup lang="ts">
import type { VueComponent } from "@/types";
import { CheckCircleFillIcon, OpenInNewIcon } from "@bcc-code/icons-vue";
import { computed } from "vue";
import BccGraphicPoster, {
  type AspectRatioStyle,
  getAspectRatioStyle,
  roundingClasses,
} from "./BccGraphicPoster.vue";

type Props = {
  bannerSrc?: string;
  logoSrc?: string;
  checked?: boolean;
  linkOut?: boolean | VueComponent;
  ratio?: AspectRatioStyle;
  rounding?: keyof typeof roundingClasses;
};

const props = withDefaults(defineProps<Props>(), {
  ratio: "wide",
  rounding: "xl",
  checked: false,
  linkOut: false,
});

const aspectRatioStyle = computed(() => {
  return getAspectRatioStyle(props.ratio);
});
</script>

<template>
  <div class="bcc-graphic" :style="`padding-bottom: ${aspectRatioStyle}`">
    <div class="bcc-graphic-open-in" v-if="linkOut">
      <component
        :is="typeof linkOut === 'boolean' ? OpenInNewIcon : linkOut"
        class="bcc-graphic-open-in-icon"
      />
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
