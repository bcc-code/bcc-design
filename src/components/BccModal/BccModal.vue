<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { CloseIcon } from "@bcc-code/icons-vue";
import BccButton from "../BccButton/BccButton.vue";

type Props = {
  open: boolean;
  title: string;
  showCloseButton?: boolean;
};

withDefaults(defineProps<Props>(), {
  open: false,
  showCloseButton: true,
});

const emit = defineEmits(["close"]);
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed inset-0" @close="emit('close')">
      <div class="flex h-screen w-screen items-center justify-center overflow-hidden">
        <TransitionChild
          as="div"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="bcc-modal-overlay" />
        </TransitionChild>

        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div class="bcc-modal-wrapper">
            <DialogPanel class="bcc-modal">
              <div class="bcc-modal-header" v-if="$slots.header">
                <slot name="header" />
              </div>

              <div class="bcc-modal-title">
                <DialogTitle as="h3">{{ title }}</DialogTitle>
                <button
                  @click.prevent="emit('close')"
                  v-if="showCloseButton && !$slots.header"
                  class="bcc-modal-close-button"
                  aria-label="Close modal window"
                >
                  <CloseIcon class="bcc-modal-close-icon" />
                </button>
              </div>

              <div class="bcc-modal-content">
                <slot></slot>
              </div>

              <div class="bcc-modal-actions">
                <div class="bcc-modal-secondary-action" v-if="$slots.secondaryAction">
                  <slot name="secondaryAction"></slot>
                </div>
                <div class="bcc-modal-primary-action" v-if="$slots.primaryAction">
                  <slot name="primaryAction">
                    <BccButton @click="emit('close')"> OK </BccButton>
                  </slot>
                </div>
              </div>
            </DialogPanel>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
