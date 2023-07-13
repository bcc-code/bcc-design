<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, type StyleValue } from "vue";
import { useAttrs } from "vue";
import { useId } from "../../hooks/use-id";

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

const id = `bcc-input-${useId()}`;

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
  <div class="bcc-input-wrapper" :class="$attrs['class']" :style="$attrs['style'] as StyleValue">
    <label class="bcc-input-label" :for="id" v-if="label || showOptionalLabel">
      <span>{{ label }}</span>
      <span v-if="showOptionalLabel" class="bcc-input-optional-label">{{ optionalLabel }}</span>
    </label>
    <input
      :id="id"
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
