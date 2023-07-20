<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useAttrsWithoutStyles } from "@/composables/attrsWithoutStyles";
import { computed, type StyleValue } from "vue";
import { useId } from "@/hooks/use-id";

type Props = {
  label?: string;
  disabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const id = `bcc-radio-${useId()}`;

const emit = defineEmits(["update:modelValue"]);

const { attrs, attrsWithoutStyles } = useAttrsWithoutStyles();

const wrapperClasses = computed(() => {
  const classes = [];
  if (props.disabled) {
    classes.push("bcc-radio-wrapper-disabled");
  }
  if (attrs["class"]) {
    classes.push(attrs["class"]);
  }
  return classes;
});
</script>

<template>
  <div class="bcc-radio-wrapper" :class="wrapperClasses" :style="$attrs['style'] as StyleValue">
    <input
      type="radio"
      class="bcc-radio"
      :id="id"
      :disabled="disabled"
      v-bind="attrsWithoutStyles"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>
