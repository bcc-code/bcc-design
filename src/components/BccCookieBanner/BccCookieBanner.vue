<script setup lang="ts">
import { CookieIcon } from "@bcc-code/icons-vue";
import BccButton from "../BccButton/BccButton.vue";

type Props = {
  open: boolean;
  title?: string;
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
    <div v-if="open" class="bcc-cookie-banner-wrapper">
      <div class="bcc-cookie-banner">
        <div class="bcc-cookie-banner-content">
          <div class="bcc-cookie-banner-title">
            <CookieIcon class="bcc-cookie-banner-icon" />
            <h4>{{ title }}</h4>
          </div>

          <p>
            <slot />
          </p>
        </div>

        <div class="bcc-cookie-banner-actions">
          <BccButton
            variant="secondary"
            @click="emit('decline')"
            class="bcc-cookie-banner-decline-button"
          >
            {{ declineButtonText }}
          </BccButton>
          <BccButton @click="emit('accept')" class="bcc-cookie-banner-accept-button">
            {{ acceptButtonText }}
          </BccButton>
        </div>
      </div>
    </div>
  </Transition>
</template>
