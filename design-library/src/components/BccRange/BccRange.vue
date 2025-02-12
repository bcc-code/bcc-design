<script setup lang="ts">
type Props = {
  modelValue: number;
  min: number;
  max: number;
  step: number;
  leftLabel?: string;
  rightLabel?: string;
  disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
  min: -10,
  max: 10,
  step: 1,
  disabled: false,
});

const emit = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", Number(target.value));
};
</script>

<template>
  <div class="bcc-range">
    <div class="bcc-range__container">
      <div class="bcc-range__slider-container">
        <input
          type="range"
          class="bcc-range__input"
          :min="min"
          :max="max"
          :step="step"
          :value="modelValue"
          :disabled="disabled"
          @input="handleInput"
        />
      </div>
      <div class="bcc-range__labels">
        <span v-if="leftLabel" class="bcc-range__text bcc-range__text--left">{{ leftLabel }}</span>
        <span v-if="rightLabel" class="bcc-range__text bcc-range__text--right">{{
          rightLabel
        }}</span>
      </div>
    </div>
  </div>
</template>
