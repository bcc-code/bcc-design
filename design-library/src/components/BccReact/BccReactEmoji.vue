<script setup lang="ts">
import { ref, watch } from "vue";

export type EmojiStat = {
  id: string;
  emoji: string;
  count?: number;
  selected?: boolean;
};
const props = defineProps<EmojiStat>();

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
      'bcc-react-emoji-list-item--selected': selected,
      'animate-wiggle': animate,
    }"
  >
    <span>{{ emoji }}</span>
    <span v-if="count && count > 1" class="mx-1 text-xs">{{ count }}</span>
  </button>
</template>
