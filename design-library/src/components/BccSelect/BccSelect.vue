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
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      @input="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      v-bind="attrsWithoutStyles"
    >
      <slot />
    </select>

    <BccFormMessage v-if="$slots.message" :state="state">
      <slot name="message" />
    </BccFormMessage>
  </div>
</template>
