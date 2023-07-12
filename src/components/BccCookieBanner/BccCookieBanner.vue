<script setup lang="ts">
import { CookieIcon } from "@bcc-code/icons-vue";
import BccButton from "../BccButton/BccButton.vue";

type Props = {
  open: boolean;
  showOverlay?: boolean;
  declineButtonText?: string;
  acceptButtonText?: string;
};

withDefaults(defineProps<Props>(), {
  open: false,
  showOverlay: true,
  declineButtonText: "Decline",
  acceptButtonText: "Accept",
});

const emit = defineEmits(["accept", "decline"]);
</script>

<template>
  <Transition name="fade" v-if="showOverlay">
    <div v-if="open" class="bcc-cookie-banner-overlay"></div>
  </Transition>
  <Transition name="fade-fast">
    <div v-if="open" :class="{ 'bcc-cookie-banner-wrapper': showOverlay }">
      <div class="bcc-cookie-banner">
        <CookieIcon class="bcc-cookie-banner-icon" />
        <p>
          <slot />
        </p>

        <div class="bcc-cookie-banner-actions">
          <BccButton variant="secondary" @click="emit('decline')">
            {{ declineButtonText }}
          </BccButton>
          <BccButton @click="emit('accept')">{{ acceptButtonText }}</BccButton>
        </div>
      </div>
    </div>
  </Transition>
</template>
