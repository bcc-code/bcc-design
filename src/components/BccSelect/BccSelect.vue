<script setup lang="ts">
import { computed, type StyleValue } from "vue";
import { useAttrsWithoutStyles } from "@/composables/attrsWithoutStyles";
import { useId } from "@/hooks/use-id";

type Props = {
  modelValue?: string;
  state?: "default" | "error" | "success";
  size?: "sm" | "base" | "lg";
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

const emit = defineEmits(["update:modelValue"]);

const showOptionalLabel = computed(() => props.showOptionalLabel && !props.required);

const { attrsWithoutStyles } = useAttrsWithoutStyles();
</script>

<template>
  <div class="bcc-input-container" :class="$attrs['class']" :style="$attrs['style'] as StyleValue">
    <label class="bcc-input-label" :for="id" v-if="label || showOptionalLabel">
      <span>{{ label }}</span>
      <span v-if="showOptionalLabel" class="bcc-input-optional-label">
        {{ optionalLabel }}
      </span>
    </label>
    <select
      class="bcc-select"
      :class="{
        'bcc-select-error': state === 'error',
        'bcc-select-success': state === 'success',
        'bcc-select-sm': size === 'sm',
        'bcc-select-lg': size === 'lg',
      }"
      :id="id"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      @input="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      v-bind="attrsWithoutStyles"
    >
      <slot />
    </select>

    <span
      v-if="$slots.message"
      :class="{
        'bcc-input-message-default': state === 'default',
        'bcc-input-message-error': state === 'error',
        'bcc-input-message-success': state === 'success',
      }"
    >
      <slot name="message" />
    </span>
  </div>
</template>
