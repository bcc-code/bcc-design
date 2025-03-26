<script setup lang="ts">
import { useId } from "@/hooks/use-id";
import { onMounted, ref, toRefs, watch } from "vue";

type Props = {
  value?: string | number | boolean;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: "base" | "lg" | "xl";
};

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  indeterminate: false,
  value: true,
  size: "base",
});

const modelValue = defineModel<boolean | Array<any>>();

const { indeterminate } = toRefs(props);

const input = ref<HTMLInputElement | null>(null);
const id = `bcc-checkbox-${useId()}`;

onMounted(() => {
  watch(
    indeterminate,
    (value) => {
      if (input.value) {
        const element = input.value;
        element.indeterminate = value;
      }
    },
    { immediate: true }
  );
});
</script>

<template>
  <div
    class="bcc-checkbox-wrapper"
    :class="{
      'bcc-checkbox-wrapper-disabled': disabled,
    }"
  >
    <input
      type="checkbox"
      class="bcc-checkbox"
      :class="size"
      :id="id"
      :disabled="disabled"
      v-model="modelValue"
      :value="value"
      ref="input"
    />
    <label :for="id" v-if="label">{{ label }}</label>
  </div>
</template>
