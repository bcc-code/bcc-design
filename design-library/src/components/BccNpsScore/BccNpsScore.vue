<script setup lang="ts">
type Props = {
  reverse?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  labelPosition?: "top" | "bottom";
  max?: number;
  disabled?: boolean;
};

const modelValue = defineModel();

const props = withDefaults(defineProps<Props>(), {
  reverse: false,
  disabled: false,
  leftLabel: "Not likely",
  rightLabel: "Very likely",
  labelPosition: "top",
  max: 10,
});

function selected(i: number) {
  if (props.disabled) return;

  modelValue.value = i;
}
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
      <div v-for="i in max" :key="i" class="bcc-nps-score--container">
        <div
          class="bcc-nps-score--number"
          @click="selected(i)"
          :class="{
            inactive: !modelValue || modelValue < i,
            active: modelValue === i,
          }"
        >
          {{ i }}
        </div>
        <span v-if="i !== max" class="separator"></span>
      </div>
    </div>
  </div>
</template>
