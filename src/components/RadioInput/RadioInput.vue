<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
type Props = {
  label?: string;
};

withDefaults(defineProps<Props>(), {});
</script>

<template>
  <label class="inline-flex items-center space-x-2 text-sm font-semibold">
    <input
      type="radio"
      v-bind="$attrs"
      class="border-neutral-300 text-tree-green-600 focus:ring-tree-green-300 focus:ring-offset-0"
    />
    <span v-if="label">{{ label }}</span>
  </label>
</template>
