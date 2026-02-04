<script setup lang="ts">
import { ref, watch } from "vue";
import type { BccReactInfo } from "./types";

const props = defineProps<BccReactInfo>();

const animate = ref(false);
watch(
  () => props.count,
  () => {
    animate.value = true;
    setTimeout(() => {
      animate.value = false;
    }, 1000);
  }
);
</script>

<template>
  <button
    class="bcc-react-emoji-list-item"
    :class="{
      selected,
      'animate-wiggle': animate,
    }"
  >
    <span>{{ emoji }}</span>
    <span v-if="count && count > 1" class="mx-1 body-sm">{{ count }}</span>
  </button>
</template>