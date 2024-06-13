<script setup lang="ts">
import { computed } from "vue";

type Props = {
  reverse?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  labelPosition?: "top" | "bottom";
  min?: number;
  max?: number;
  disabled?: boolean;
};

const modelValue = defineModel<number>();

const props = withDefaults(defineProps<Props>(), {
  reverse: false,
  disabled: false,
  leftLabel: "Not likely",
  rightLabel: "Very likely",
  labelPosition: "top",
  min: 0,
  max: 10,
});

function selected(i: number) {
  if (props.disabled) return;

  modelValue.value = i;
}

const range = computed(() => {
  let result = [];
  for (let i = props.min; i <= props.max; i++) {
    result.push(i);
  }
  return result;
});
</script>

<template>
  <div class="bcc-nps-score">
    <div
      class="bcc-nps-score--heading"
      :class="labelPosition === 'top' ? 'order-1' : labelPosition === 'bottom' ? 'order-last' : ''"
    >
      <p class="bcc-nps-score--label text-caption">{{ leftLabel }}</p>
      <p class="bcc-nps-score--label text-caption text-right">{{ rightLabel }}</p>
    </div>
    <div class="bcc-nps-score--bar order-2" :class="{ disabled, reverse }">
      <div v-for="num in range" :key="num" class="bcc-nps-score--container">
        <div
          class="bcc-nps-score--number"
          @click="selected(num)"
          :class="{
            inactive: !modelValue || modelValue < num,
            active: modelValue === num,
          }"
        >
          {{ num }}
        </div>
        <span v-if="num !== range[range.length - 1]" class="separator"></span>
      </div>
    </div>
  </div>
</template>
