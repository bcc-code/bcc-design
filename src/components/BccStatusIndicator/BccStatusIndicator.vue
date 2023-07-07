<script setup lang="ts">
import type { Component } from "vue";
import { CheckIcon, ScheduleIcon, ExclamationIcon } from "@bcc-code/icons-vue";

type Props = {
  status: "default" | "success" | "danger";
  icon?: string | Component | Function;
};

withDefaults(defineProps<Props>(), {
  status: "default",
});
</script>

<template>
  <div
    class="bcc-status-indicator"
    :class="{
      'bcc-status-indicator-success': status === 'success',
      'bcc-status-indicator-danger': status === 'danger',
    }"
  >
    <component v-if="icon" :is="icon" class="bcc-status-indicator-icon" />
    <ScheduleIcon class="bcc-status-indicator-icon" v-else-if="status == 'default'" />
    <CheckIcon class="bcc-status-indicator-icon" v-else-if="status == 'success'" />
    <ExclamationIcon class="bcc-status-indicator-icon" v-else-if="status == 'danger'" />
  </div>
</template>
