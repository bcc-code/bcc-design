<script setup lang="ts">
import { computed, toRefs } from "vue";
import { Switch } from "@headlessui/vue";
import { CheckIcon, CloseIcon } from "@bcc-code/icons-vue";
import CircleLoader from "./CircleLoader.vue";

type Props = {
  modelValue: boolean;
  wasToggled?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  wasToggled: false,
  disabled: false,
  loading: false,
});

const { modelValue, wasToggled, disabled, loading } = toRefs(props);

const emits = defineEmits(["update:modelValue"]);

const toggled = computed({
  get() {
    return !!modelValue.value;
  },
  set(value: boolean) {
    emits("update:modelValue", value);
  },
});
</script>

<template>
  <Switch
    v-model="toggled"
    :disabled="loading || disabled"
    class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
    :class="[
      toggled
        ? 'bg-silver-tree-600 focus:ring-silver-tree-300 focus:ring-offset-0'
        : wasToggled
        ? 'bg-red-600 focus:ring-red-300 focus:ring-offset-0'
        : 'bg-gray-200 focus:ring-gray-600',
      { 'opacity-50': disabled },
    ]"
  >
    <span class="sr-only">Toggle</span>
    <span
      :class="[
        toggled ? 'translate-x-5' : 'translate-x-0',
        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
      ]"
    >
      <span
        :class="[
          toggled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
          'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
        ]"
        aria-hidden="true"
      >
        <CircleLoader
          class="h-3 w-3"
          :class="wasToggled ? 'text-red-600' : 'text-gray-400'"
          v-if="loading"
        />
        <CloseIcon class="h-3 w-3" :class="wasToggled ? 'text-red-600' : 'text-gray-400'" v-else />
      </span>
      <span
        :class="[
          toggled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
          'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
        ]"
        aria-hidden="true"
      >
        <CircleLoader class="text-silver-tree-600 h-3 w-3" v-if="loading" />
        <CheckIcon class="text-silver-tree-600 h-3 w-3" v-else />
      </span>
    </span>
  </Switch>
</template>
