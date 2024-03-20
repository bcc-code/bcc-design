<script setup lang="ts">
import { ArrowBackIosIcon } from "@bcc-code/icons-vue";
import { ArrowForwardIosIcon } from "@bcc-code/icons-vue";
import { toRefs, type Component } from "vue";

export type BccPages = Array<{
  numbers: number;
  isSelected: boolean;
  as?: Component | Function;
}>;
type Props = {
  Pages: BccPages[];
};

const props = withDefaults(defineProps<Props>(), {});

const { Pages } = toRefs(props);
</script>

<template>
  <div class="bcc-pagination">
    <button class="bcc-pagination-button-left">
      <ArrowBackIosIcon class="bcc-pagination-button-icon" />
    </button>

    <button class="bcc-pagination-button-right">
      <ArrowForwardIosIcon class="bcc-pagination-button-icon" />
    </button>
  </div>
</template>
