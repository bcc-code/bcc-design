<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
type Props = {
  state?: "default" | "error" | "success";
  disabled?: boolean;
  label?: string;
  required?: boolean;
};

withDefaults(defineProps<Props>(), {
  state: "default",
  disabled: false,
  required: false,
});
</script>

<template>
  <span class="inline-flex flex-col space-y-2">
    <div>
      <label class="bcc-input-label float-left" v-if="label">{{ label }}</label>
      <span class="bcc-input-optional float-right" v-if="required === false">Optional</span>
    </div>
    <input
      :disabled="disabled"
      :required="required"
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
