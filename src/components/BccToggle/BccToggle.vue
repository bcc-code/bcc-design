<script setup lang="ts">
import { computed, toRefs } from "vue";
import { CheckIcon, CloseIcon } from "@bcc-code/icons-vue";
import CircleLoader from "./CircleLoader.vue";

type Props = {
  modelValue: boolean;
  wasToggled?: boolean;
  disabled?: boolean;
  loading?: boolean;
  withIcon?: boolean;
  label?: string;
};

const props = withDefaults(defineProps<Props>(), {
  wasToggled: false,
  disabled: false,
  loading: false,
  withIcon: true,
  label: "",
});

const { modelValue, wasToggled, disabled, loading } = toRefs(props);

const emits = defineEmits(["update:modelValue"]);

const toggled = computed({
  get() {
    return !!modelValue.value;
  },
  set(value: boolean) {
    emits("update:modelValue", value);
  },
});
</script>

<template>
  <label class="bcc-toggle" :class="{ 'bcc-toggle-was-toggled': wasToggled }">
    <input
      type="checkbox"
      class="bcc-toggle-input"
      :disabled="loading || disabled"
      v-model="toggled"
    />
    <span class="bcc-toggle-circle" aria-hidden="true">
      <CircleLoader class="h-3 w-3" v-if="loading" />
      <template v-else-if="withIcon">
        <CheckIcon class="hidden h-3 w-3 [.bcc-toggle-input:checked~.bcc-toggle-circle>&]:block" />
        <CloseIcon class="h-3 w-3 [.bcc-toggle-input:checked~.bcc-toggle-circle>&]:hidden" />
      </template>
    </span>
    <span v-if="label" class="bcc-toggle-label">{{ label }}</span>
  </label>
</template>
