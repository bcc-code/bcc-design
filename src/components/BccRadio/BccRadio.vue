<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useId } from "../../hooks/use-id";

type Props = {
  modelValue: string;
  label?: string;
  disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
  disabled: false,
});

const id = `bcc-radio-${useId()}`;

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="bcc-radio-wrapper" :class="{ 'bcc-radio-wrapper-disabled': disabled }">
    <input
      type="radio"
      class="bcc-radio"
      :id="id"
      :disabled="disabled"
      v-bind="$attrs"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>
