<script setup lang="ts">
withDefaults(
  defineProps<{
    initials: string;
    gender?: "male" | "female" | "unknown";
    child?: boolean;
    size?: "xs" | "sm";
  }>(),
  {
    gender: "unknown",
    child: false,
    size: "sm",
  }
);
</script>

<template>
  <div
    class="bcc-avatar"
    :class="{
      'bcc-avatar-xs': size === 'xs',
      'bcc-avatar-man': !child && gender === 'male',
      'bcc-avatar-woman': !child && gender === 'female',
      'bcc-avatar-person': !child && gender === 'unknown',
      'bcc-avatar-boy': child && gender === 'male',
      'bcc-avatar-girl': child && gender === 'female',
      'bcc-avatar-child': child && gender === 'unknown',
    }"
  >
    {{ initials.slice(0, 2) }}
  </div>
</template>
