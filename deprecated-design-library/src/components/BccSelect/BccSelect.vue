<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, type StyleValue } from "vue";
import { useAttrsWithoutStyles } from "@/composables/attrsWithoutStyles";
import { useId } from "@/hooks/use-id";
import BccFormLabel from "@/components/BccFormLabel/BccFormLabel.vue";
import BccFormMessage from "@/components/BccFormMessage/BccFormMessage.vue";

type Props = {
  state?: "default" | "error" | "success";
  size?: "sm" | "base" | "lg";
  disabled?: boolean;
  label?: string;
  showOptionalLabel?: boolean;
  optionalLabel?: string;
  required?: boolean;
  multiple?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  state: "default",
  size: "base",
  disabled: false,
  required: false,
  showOptionalLabel: false,
  multiple: false,
  optionalLabel: "Optional",
});

const id = `bcc-input-${useId()}`;
const modelValue = defineModel<string | string[] | null>({ default: null });

const showOptionalLabel = computed(() => props.showOptionalLabel && !props.required);

const { attrsWithoutStyles } = useAttrsWithoutStyles();
</script>

<template>
  <div class="bcc-input-container" :class="$attrs['class']" :style="$attrs['style'] as StyleValue">
    <BccFormLabel
      v-if="label || showOptionalLabel"
      :for="id"
      :size="size === 'lg' ? 'lg' : undefined"
      :showOptionalLabel="showOptionalLabel"
      :optionalLabel="optionalLabel"
    >
      {{ label }}
    </BccFormLabel>
    <select
      class="bcc-select"
      :class="{
        'bcc-select-error': state === 'error',
        'bcc-select-success': state === 'success',
        'bcc-select-sm': size === 'sm',
        'bcc-select-lg': size === 'lg',
      }"
      :id="id"
      :disabled="disabled"
      :required="required"
      :multiple="multiple"
      v-model="modelValue"
      v-bind="attrsWithoutStyles"
    >
      <slot />
    </select>

    <BccFormMessage v-if="$slots.message" :state="state">
      <slot name="message" />
    </BccFormMessage>
  </div>
</template>
