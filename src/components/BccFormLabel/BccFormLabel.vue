<script setup lang="ts">
type Props = {
  for?: string;
  showOptionalLabel?: boolean;
  optionalLabel?: string;
};

const props = withDefaults(defineProps<Props>(), {
  showOptionalLabel: false,
  optionalLabel: "Optional",
});
</script>

<template>
  <label class="bcc-form-label" :for="props.for">
    <span><slot /></span>
    <span v-if="showOptionalLabel" class="bcc-form-label-optional">{{ optionalLabel }}</span>
  </label>
</template>
