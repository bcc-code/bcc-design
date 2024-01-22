<script setup lang="ts">
import type { Component } from "vue";
type Props = {
  title: string;
  infoIcon?: Component;
  infoText?: string;
};

withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="bcc-info">
    <div>
      <h4 class="bcc-info-title">{{ title }}</h4>
      <div class="bcc-info-wrapper">
        <component :is="infoIcon" v-if="infoIcon" class="h-4 w-4" />
        <p class="truncate" v-if="infoText">{{ infoText }}</p>
      </div>
    </div>
    <slot name="infoRight" />
  </div>
</template>
