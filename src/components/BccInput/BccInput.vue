<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
type Props = {
  state?: "default" | "error" | "success";
  disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
  state: "default",
  disabled: false,
});
</script>

<template>
  <span class="inline-flex flex-col space-y-2">
    <input
      :disabled="disabled"
      class="bcc-input"
      :class="{
        'bcc-input-error': state === 'error',
        'bcc-input-success': state === 'success',
      }"
      v-bind="$attrs"
    />
    <span
      v-if="$slots.default"
      :class="{
        'bcc-input-message-default': state === 'default',
        'bcc-input-message-error': state === 'error',
        'bcc-input-message-success': state === 'success',
      }"
    >
      <slot></slot>
    </span>
  </span>
</template>
