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
  subtitle?: string;
  closeButton?: boolean;
  variant?: keyof typeof variants;
  destructive?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  open: false,
  closeButton: true,
  variant: "action",
  destructive: false,
});

const emit = defineEmits(["close"]);

const slots = useSlots();
const showCloseButton = computed(
  () => props.closeButton && !slots.header && props.variant !== "alert"
);
const primaryActionVariant = computed(() =>
  props.variant === "alert" || props.destructive ? "danger" : "default"
);

const variants = {
  action: "bcc-dialog-action",
  alert: "bcc-dialog-alert",
};
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="bcc-dialog-overlay-wrapper" @close="emit('close')">
      <div class="bcc-dialog-container">
        <TransitionChild
          as="div"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="bcc-dialog-overlay" />
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
          <div class="bcc-dialog-wrapper">
            <DialogPanel :class="['bcc-dialog', variants[variant]]" v-bind="$attrs">
              <div class="bcc-dialog-header" v-if="$slots.header">
                <slot name="header" />
              </div>

              <div class="bcc-dialog-body" v-if="title || showCloseButton || slots.default">
                <div class="bcc-dialog-title">
                  <DialogTitle as="h3">{{ title }}</DialogTitle>
                  <button
                    v-if="showCloseButton"
                    @click.prevent="emit('close')"
                    class="bcc-dialog-close-button"
                    aria-label="Close modal window"
                  >
                    <CloseIcon class="bcc-dialog-close-icon" />
                  </button>
                </div>
                <p v-if="subtitle" class="bcc-dialog-subtitle">{{ subtitle }}</p>

                <div class="bcc-dialog-content">
                  <slot />
                </div>
              </div>

              <hr />

              <div class="bcc-dialog-footer">
                <div class="bcc-dialog-footer-content" v-if="$slots.footer">
                  <slot name="footer" />
                </div>

                <div class="bcc-dialog-actions">
                  <div class="bcc-dialog-secondary-action" v-if="variant === 'action'">
                    <slot name="secondaryAction">
                      <BccButton
                        variant="secondary"
                        :context="primaryActionVariant"
                        @click="emit('close')"
                      >
                        Cancel
                      </BccButton>
                    </slot>
                  </div>
                  <div
                    class="bcc-dialog-primary-action"
                    :class="{ 'w-full': variant === 'alert' || !$slots.secondaryAction }"
                  >
                    <slot name="primaryAction">
                      <BccButton :context="primaryActionVariant" @click="emit('close')">
                        Submit
                      </BccButton>
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
