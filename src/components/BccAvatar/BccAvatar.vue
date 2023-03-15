<script setup lang="ts">
import { sizeVariants } from "../../composables/variants";

withDefaults(
  defineProps<{
    initials: string;
    gender?: "male" | "female" | "unknown";
    child?: boolean;
    size?: keyof typeof sizeVariants;
  }>(),
  {
    gender: "unknown",
    child: false,
    size: "sm",
  }
);

const colors = {
  male: ["bg-blue-100", "text-blue-900"],
  female: ["bg-violet-100", "text-violet-900"],
  unknown: ["bg-neutral-100", "text-neutral-900"],
};
const childColors = {
  male: ["bg-sky-100", "text-sky-800"],
  female: ["bg-pink-100", "text-pink-800"],
  unknown: ["bg-neutral-100", "text-neutral-800"],
};
</script>

<template>
  <div
    class="h-[2.2857em] w-[2.2857em] rounded-full text-center font-semibold leading-[2.2857em] shadow-[0_0.071em_0.142em_rgba(0,0,0,0.05)]"
    :class="[sizeVariants[size] ?? size, child ? childColors[gender] : colors[gender]]"
  >
    {{ initials.slice(0, 2) }}
  </div>
</template>
