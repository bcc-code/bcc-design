<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useAttrsWithoutStyles } from "@/composables/attrsWithoutStyles";
import { useId } from "@/hooks/use-id";
import { CloseIcon } from "@bcc-code/icons-vue";
import BccFormLabel from "@/components/BccFormLabel/BccFormLabel.vue";
import BccFormMessage from "@/components/BccFormMessage/BccFormMessage.vue";
import type { VueComponent } from "@/types";
import { computed, StyleValue } from "vue";

type Props = {
  modelValue?: string;
  is?: "input" | "textarea";
  state?: "default" | "error" | "success";
  size?: "sm" | "base" | "lg";
  icon?: VueComponent;
  clearable?: boolean;
  disabled?: boolean;
  label?: string;
  showOptionalLabel?: boolean;
  optionalLabel?: string;
  required?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  is: "input",
  state: "default",
  size: "base",
  clearable: false,
  disabled: false,
  required: false,
  showOptionalLabel: false,
  optionalLabel: "Optional",
});

const { attrsWithoutStyles } = useAttrsWithoutStyles();

const id = `bcc-input-${useId()}`;

const emit = defineEmits(["update:modelValue", "clear"]);

const showOptionalLabel = computed(() => props.showOptionalLabel && !props.required);

function clear() {
  emit("update:modelValue", "");
  emit("clear");
}
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
    <div
      class="bcc-input-wrapper"
      :class="{
        'bcc-input-sm': size === 'sm',
        'bcc-input-lg': size === 'lg',
      }"
    >
      <div class="bcc-input-icon-wrapper" v-if="icon && is !== 'textarea'">
        <component
          :is="icon"
          class="bcc-input-icon"
          :class="{ 'bcc-input-icon-disabled': disabled }"
          aria-hidden="true"
        />
      </div>
      <component
        :is="is"
        :id="id"
        :disabled="disabled"
        :required="required"
        class="bcc-input"
        :class="{
          'bcc-input-error': state === 'error',
          'bcc-input-success': state === 'success',
          'bcc-input-with-icon': icon && is !== 'textarea',
          'bcc-input-clearable': clearable && is !== 'textarea',
        }"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        v-bind="attrsWithoutStyles"
      />
      <div
        class="bcc-input-clear-button-wrapper"
        v-if="clearable && modelValue && is !== 'textarea'"
      >
        <span class="sr-only" id="bcc-input-clear-desc">Clear input</span>
        <CloseIcon
          class="bcc-input-clear-button"
          aria-describedby="bcc-input-clear-desc"
          @click="clear"
        />
      </div>
    </div>
    <BccFormMessage v-if="$slots.default" :state="state">
      <slot />
    </BccFormMessage>
  </div>
</template>
