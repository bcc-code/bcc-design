<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { CloseIcon } from "@bcc-code/icons-vue";
import BccButton from "../BccButton/BccButton.vue";
import { computed, useSlots } from "vue";

// eslint-disable-next-line no-undef
defineOptions({
  inheritAttrs: false,
});

type Props = {
  open: boolean;
  title?: string;
  closeButton?: boolean;
  closeOnOutsideClick?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  open: false,
  closeButton: true,
  closeOnOutsideClick: true,
});

const emit = defineEmits(["close"]);

const slots = useSlots();
const showCloseButton = computed(() => props.closeButton && !slots.header);

const handleClose = () => {
  if (props.closeOnOutsideClick) {
    emit("close");
  }
};
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="bcc-modal-overlay-wrapper" @close="handleClose">
      <div class="flex h-[100dvh] w-[100dvw] items-center justify-center overflow-hidden">
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
            <DialogPanel class="bcc-modal" v-bind="$attrs">
              <div class="bcc-modal-header" v-if="$slots.header">
                <slot name="header" />
              </div>

              <div class="bcc-modal-body" v-if="title || showCloseButton || slots.default">
                <div class="bcc-modal-title" v-if="title || showCloseButton">
                  <DialogTitle as="h3">{{ title }}</DialogTitle>
                  <button
                    @click.prevent="emit('close')"
                    v-if="showCloseButton"
                    class="bcc-modal-close-button"
                    aria-label="Close modal window"
                  >
                    <CloseIcon class="bcc-modal-close-icon" />
                  </button>
                </div>

                <div class="bcc-modal-content">
                  <slot />
                </div>
              </div>

              <div class="bcc-modal-footer">
                <div class="bcc-modal-footer-content" v-if="$slots.footer">
                  <slot name="footer" />
                </div>

                <div class="bcc-modal-actions">
                  <div class="bcc-modal-secondary-action" v-if="$slots.secondaryAction">
                    <slot name="secondaryAction"></slot>
                  </div>
                  <div class="bcc-modal-primary-action">
                    <slot name="primaryAction">
                      <BccButton @click="emit('close')"> OK </BccButton>
                    </slot>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
