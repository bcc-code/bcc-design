<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, onMounted, ref, toRefs, watch } from "vue";
import { useId } from "../../hooks/use-id";

type Props = {
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  indeterminate: false,
});

const { modelValue, indeterminate } = toRefs(props);

const input = ref<HTMLInputElement | null>(null);
const id = `bcc-checkbox-${useId()}`;

const emit = defineEmits(["update:modelValue"]);

const toggled = computed({
  get() {
    return !!modelValue.value;
  },
  set(value: boolean) {
    emit("update:modelValue", value);
  },
});

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
  <div class="bcc-checkbox-wrapper" :class="{ 'bcc-checkbox-wrapper-disabled': disabled }">
    <input
      type="checkbox"
      class="bcc-checkbox"
      :id="id"
      :disabled="disabled"
      v-model="toggled"
      v-bind="$attrs"
      ref="input"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>
