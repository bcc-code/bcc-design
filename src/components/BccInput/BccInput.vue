<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, type Component, type StyleValue } from "vue";
import { useAttrs } from "vue";
import { useId } from "../../hooks/use-id";
import { CloseIcon } from "@bcc-code/icons-vue";

type Props = {
  modelValue?: string;
  state?: "default" | "error" | "success";
  size?: "sm" | "base" | "lg";
  icon?: string | Component | Function;
  clearable?: boolean;
  disabled?: boolean;
  label?: string;
  showOptionalLabel?: boolean;
  optionalLabel?: string;
  required?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  state: "default",
  size: "base",
  clearable: false,
  disabled: false,
  required: false,
  showOptionalLabel: false,
  optionalLabel: "Optional",
});

const id = `bcc-input-${useId()}`;

const emit = defineEmits(["update:modelValue", "clear"]);

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

function clear() {
  emit("update:modelValue", "");
  emit("clear");
}
</script>

<template>
  <div class="bcc-input-container" :class="$attrs['class']" :style="$attrs['style'] as StyleValue">
    <label class="bcc-input-label" :for="id" v-if="label || showOptionalLabel">
      <span>{{ label }}</span>
      <span v-if="showOptionalLabel" class="bcc-input-optional-label">{{ optionalLabel }}</span>
    </label>
    <div
      class="bcc-input-wrapper"
      :class="{
        'bcc-input-sm': size === 'sm',
        'bcc-input-lg': size === 'lg',
      }"
    >
      <div class="bcc-input-icon-wrapper" v-if="icon">
        <component
          :is="icon"
          class="bcc-input-icon"
          :class="{ 'bcc-input-icon-disabled': disabled }"
          aria-hidden="true"
        />
      </div>
      <input
        :id="id"
        :disabled="disabled"
        :required="required"
        class="bcc-input"
        :class="{
          'bcc-input-error': state === 'error',
          'bcc-input-success': state === 'success',
          'bcc-input-with-icon': icon,
          'bcc-input-clearable': clearable,
        }"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        v-bind="attrsWithoutStyles"
      />
      <div class="bcc-input-clear-button-wrapper" v-if="clearable && modelValue">
        <span class="sr-only" id="bcc-input-clear-desc">Clear input</span>
        <CloseIcon
          class="bcc-input-clear-button"
          aria-describedby="bcc-input-clear-desc"
          @click="clear"
        />
      </div>
    </div>
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
