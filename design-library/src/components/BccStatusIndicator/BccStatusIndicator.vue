<script setup lang="ts">
import { CheckIcon, ScheduleIcon, LockIcon } from "@bcc-code/icons-vue";
import type { VueComponent } from "@/types";

type Props = {
  status?: "default" | "success" | "danger";
  icon?: VueComponent;
  size?: "base" | "lg";
};

withDefaults(defineProps<Props>(), {
  status: "default",
  size: "base",
});
</script>

<template>
  <div
    class="bcc-status-indicator"
    :class="{
      'bcc-status-indicator-lg': size === 'lg',
      'bcc-status-indicator-success': status === 'success',
      'bcc-status-indicator-danger': status === 'danger',
    }"
  >
    <component v-if="icon" :is="icon" class="bcc-status-indicator-icon" />
    <ScheduleIcon class="bcc-status-indicator-icon" v-else-if="status == 'default'" />
    <CheckIcon class="bcc-status-indicator-icon" v-else-if="status == 'success'" />
    <LockIcon class="bcc-status-indicator-icon" v-else-if="status == 'danger'" />
  </div>
</template>
