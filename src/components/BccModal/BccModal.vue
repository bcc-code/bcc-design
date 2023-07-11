<script setup lang="ts">
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { CloseIcon } from "@bcc-code/icons-vue";
import BccButton from "../BccButton/BccButton.vue";

type Props = {
  open: boolean;
  title: string;
  showClose?: boolean;
};

withDefaults(defineProps<Props>(), {
  open: false,
  showClose: true,
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
          <DialogOverlay class="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" />
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
          <div
            class="flex h-full w-full transform flex-col justify-end transition-all sm:items-center sm:justify-center sm:p-5"
          >
            <div
              class="flex max-w-xl flex-col gap-6 rounded-t-lg bg-primary p-6 text-primary shadow-xl sm:min-w-lg sm:rounded-lg"
            >
              <div class="flex justify-between">
                <h1 class="text-heading-base">{{ title }}</h1>
                <button
                  @click.prevent="emit('close')"
                  v-if="showClose"
                  class="hidden sm:inline-block"
                >
                  <CloseIcon class="h-6 w-6" />
                </button>
              </div>

              <div class="text-body-base">
                <slot></slot>
              </div>

              <div class="flex flex-col gap-4 sm:flex-row sm:justify-end sm:self-end">
                <div class="order-2 flex flex-col" v-if="$slots.secondaryAction">
                  <slot name="secondaryAction"></slot>
                </div>
                <div class="order-1 flex flex-col sm:order-3" v-if="$slots.primaryAction">
                  <slot name="primaryAction">
                    <BccButton @click="emit('close')"> OK </BccButton>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
