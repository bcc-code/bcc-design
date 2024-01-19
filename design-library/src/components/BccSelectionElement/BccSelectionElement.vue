<script setup lang="ts">
import { ArrowForwardIcon } from "@bcc-code/icons-vue";
type Props = {
  isLast?: boolean;
};

withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div
    class="border-secondary group flex w-full cursor-pointer justify-between border-b py-2"
    :class="{ 'border-none': isLast }"
  >
    <label class="text-label font-bold"><slot></slot></label>
    <div class="pr-1.5 transition-all group-hover:pr-0">
      <ArrowForwardIcon class="h-4 w-4" />
    </div>
  </div>
</template>
