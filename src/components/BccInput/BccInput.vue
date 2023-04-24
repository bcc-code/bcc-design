<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { useAttrs } from "vue";

type Props = {
  state?: "default" | "error" | "success";
  disabled?: boolean;
  label?: string;
  optionalLabel?: string;
  required?: boolean;
};

withDefaults(defineProps<Props>(), {
  state: "default",
  disabled: false,
  required: false,
  optionalLabel: "Optional",
});

const attrs = useAttrs();
const attrsWithoutStyles = computed(() => {
  let returnObj = {};
  for (const attr in attrs) {
    if (attr !== "class" && attr !== "style") {
      returnObj[attr] = attrs[attr];
    }
  }
  return returnObj;
});
</script>

<template>
  <div class="inline-flex flex-col space-y-2" :class="$attrs['class']" :style="$attrs['style']">
    <label class="space-y-2">
      <span
        v-if="label || !required"
        class="flex gap-x-2"
        :class="{ 'justify-between': label && !required, 'justify-end': !label && !required }"
      >
        <span v-if="label" class="bcc-input-label">{{ label }}</span>
        <span v-if="!required" class="bcc-input-optional-label">{{ optionalLabel }}</span>
      </span>
      <input
        :disabled="disabled"
        :required="required"
        class="bcc-input"
        :class="{
          'bcc-input-error': state === 'error',
          'bcc-input-success': state === 'success',
        }"
        v-bind="attrsWithoutStyles"
      />
    </label>
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
  </div>
</template>
