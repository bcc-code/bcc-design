<script setup lang="ts">
type Props = {
  reverse?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  max?: number;
};

const modelValue = defineModel();

withDefaults(defineProps<Props>(), {
  reverse: false,
  leftLabel: "Not likely",
  rightLabel: "Very likely",
  max: 10,
});
</script>

<template>
  <div class="bcc-nps">
    <div class="bcc-nps--heading">
      <p class="bcc-nps--label">{{ leftLabel }}</p>
      <p class="bcc-nps--label text-right">{{ rightLabel }}</p>
    </div>
    <div class="bcc-nps--scores" :class="{ reverse }">
      <div v-for="i in max" :key="i" class="bcc-nps--score-container">
        <div
          class="bcc-nps--score"
          @click="modelValue = i"
          :class="{
            inactive: !modelValue || modelValue < i,
            'score--active': modelValue === i,
          }"
        >
          {{ i }}
        </div>
        <span v-if="i !== max" class="seperator"></span>
      </div>
    </div>
  </div>
</template>
