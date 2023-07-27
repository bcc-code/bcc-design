<script setup lang="ts">
type Props = {
  state?: "default" | "error" | "success";
};

withDefaults(defineProps<Props>(), {
  state: "default",
});
</script>

<template>
  <span
    class="bcc-form-message"
    :class="{
      'bcc-form-message-default': state === 'default',
      'bcc-form-message-error': state === 'error',
      'bcc-form-message-success': state === 'success',
    }"
  >
    <slot />
  </span>
</template>
