<script setup lang="ts">
type Props = {
  size?: "base" | "lg";
  for?: string;
  showOptionalLabel?: boolean;
  optionalLabel?: string;
};

const props = withDefaults(defineProps<Props>(), {
  size: "base",
  showOptionalLabel: false,
  optionalLabel: "Optional",
});
</script>

<template>
  <label class="bcc-form-label" :class="{ 'bcc-form-label-lg': size === 'lg' }" :for="props.for">
    <span><slot /></span>
    <span v-if="showOptionalLabel" class="bcc-form-label-optional">{{ optionalLabel }}</span>
  </label>
</template>
