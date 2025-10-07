<script setup lang="ts">
import type { VueComponent } from "@/types";
import { CheckIcon, CloseIcon } from "@bcc-code/icons-vue";
import { computed, toRefs } from "vue";
import CircleLoader from "./CircleLoader.vue";

type Props = {
  modelValue: boolean;
  wasToggled?: boolean;
  disabled?: boolean;
  loading?: boolean;
  withIcon?: boolean | VueComponent;
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

const emit = defineEmits(["update:modelValue"]);

const toggled = computed({
  get() {
    return !!modelValue.value;
  },
  set(value: boolean) {
    emit("update:modelValue", value);
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
      <CircleLoader class="size-3" v-if="loading" />
      <template v-else-if="withIcon === true">
        <CheckIcon class="hidden size-3 [.bcc-toggle-input:checked~.bcc-toggle-circle>&]:block" />
        <CloseIcon class="size-3 [.bcc-toggle-input:checked~.bcc-toggle-circle>&]:hidden" />
      </template>
      <component v-else-if="withIcon" :is="withIcon" class="bcc-toggle-icon size-3" />
    </span>
    <span v-if="label" class="bcc-toggle-label">{{ label }}</span>
  </label>
</template>
