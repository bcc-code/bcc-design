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
    class="flex cursor-pointer items-center justify-center rounded-full p-1 text-2xl leading-none shadow transition-all hover:scale-105"
    :class="[
      selected ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-black',
      { 'animate-wiggle': animate },
    ]"
  >
    <span>{{ emoji }}</span>
    <span v-if="count && count > 1" class="mx-1 text-xs">{{ count }}</span>
  </button>
</template>
