<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import RadioInput from "../RadioInput/RadioInput.vue";
</script>

<template>
  <div
    class="flex items-center justify-between rounded-lg bg-neutral-50 px-2"
    :class="{
      'py-3': $slots.default,
      'py-4': !$slots.default,
    }"
  >
    <RadioInput v-bind="$attrs" />
    <slot />
  </div>
</template>
