<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, type StyleValue } from "vue";
import { useAttrs } from "vue";

type Props = {
  modelValue?: string;
  state?: "default" | "error" | "success";
  size?: "base" | "lg";
  disabled?: boolean;
  label?: string;
  showOptionalLabel?: boolean;
  optionalLabel?: string;
  required?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  state: "default",
  size: "base",
  disabled: false,
  required: false,
  showOptionalLabel: false,
  optionalLabel: "Optional",
});

defineEmits(["update:modelValue"]);

const showOptionalLabel = computed(() => props.showOptionalLabel && !props.required);

const attrs = useAttrs();
const attrsWithoutStyles = computed(() => {
  let returnObj: Record<string, unknown> = {};
  for (const attr in attrs) {
    if (attr !== "class" && attr !== "style") {
      returnObj[attr] = attrs[attr];
    }
  }
  return returnObj;
});
</script>

<template>
  <div
    class="inline-flex flex-col space-y-2"
    :class="$attrs['class']"
    :style="$attrs['style'] as StyleValue"
  >
    <label class="space-y-2">
      <span
        v-if="label || showOptionalLabel"
        class="flex gap-x-2"
        :class="{
          'justify-between': label && showOptionalLabel,
          'justify-end': !label && showOptionalLabel,
        }"
      >
        <span v-if="label" class="bcc-input-label">{{ label }}</span>
        <span v-if="showOptionalLabel" class="bcc-input-optional-label">{{ optionalLabel }}</span>
      </span>
      <input
        :disabled="disabled"
        :required="required"
        class="bcc-input"
        :class="{
          'bcc-input-error': state === 'error',
          'bcc-input-success': state === 'success',
          'bcc-input-lg': size === 'lg',
        }"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
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
