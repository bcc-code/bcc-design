<script setup lang="ts">
withDefaults(
  defineProps<{
    initials: string;
    gender?: "male" | "female" | "unknown";
    child?: boolean;
  }>(),
  {
    gender: "unknown",
    child: false,
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
    class="avatars-avatar rounded-full text-center font-semibold"
    :class="child ? childColors[gender] : colors[gender]"
  >
    {{ initials.slice(0, 2) }}
  </div>
</template>

<style>
.avatars-avatar {
  width: 2.285em !important;
  height: 2.275em !important;
  line-height: 2.285em !important;
  box-shadow: 0 0.071em 0.142em rgba(0, 0, 0, 0.05) !important;
}
</style>
