<script setup lang="ts">
type Props = {
  context?: "info" | "success" | "warning" | "danger";
};

withDefaults(defineProps<Props>(), {
  context: "info",
});
</script>

<template>
  <div
    class="bcc-alert"
    :class="{
      'bcc-alert-success': context == 'success',
      'bcc-alert-warning': context == 'warning',
      'bcc-alert-danger': context == 'danger',
    }"
  >
    <slot />
  </div>
</template>
