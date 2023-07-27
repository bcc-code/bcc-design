<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, onMounted, ref, toRefs, watch, type StyleValue } from "vue";
import { useAttrsWithoutStyles } from "@/composables/attrsWithoutStyles";
import { useId } from "@/hooks/use-id";

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

const checked = computed({
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

const { attrs, attrsWithoutStyles } = useAttrsWithoutStyles();

const wrapperClasses = computed(() => {
  const classes = [];
  if (props.disabled) {
    classes.push("bcc-checkbox-wrapper-disabled");
  }
  if (attrs["class"]) {
    classes.push(attrs["class"]);
  }
  return classes;
});
</script>

<template>
  <div class="bcc-checkbox-wrapper" :class="wrapperClasses" :style="$attrs['style'] as StyleValue">
    <input
      type="checkbox"
      class="bcc-checkbox"
      :id="id"
      :disabled="disabled"
      v-model="checked"
      v-bind="attrsWithoutStyles"
      ref="input"
    />
    <label :for="id" v-if="label">{{ label }}</label>
  </div>
</template>
