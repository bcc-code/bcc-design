<script lang="ts">
import { ref } from "vue";
import { useElementBounding, useWindowSize } from "@vueuse/core";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

export type AvatarProps = {
  list: Array<{
    name: string;
    age: number;
    gender: "male" | "female" | "unknown";
  }>;
  max?: number;
};

const el = ref();
const { top, x } = useElementBounding(el);
const { height, width } = useWindowSize();
</script>

<script setup lang="ts">
import BccAvatar from "./BccAvatar.vue";

withDefaults(defineProps<AvatarProps>(), {
  max: 4,
});
</script>

<template>
  <Popover v-slot="{ open }" class="relative">
    <PopoverButton class="relative z-0 flex items-center outline-none" ref="el">
      <BccAvatar
        v-for="(person, i) in max < list.length ? list.slice(0, max - 1) : list"
        :key="person.name"
        :initials="`${person.name.slice(0, 2)}`"
        :gender="person.gender"
        :child="person.age < 18"
        :style="{ zIndex: i * -1 }"
        class="-ml-[0.571em] shrink-0"
      />
      <BccAvatar
        v-if="max < list.length"
        :initials="`+${list.length - max + 1}`"
        :style="{ zIndex: max * -1 }"
        class="-ml-[0.571em] shrink-0"
      />
    </PopoverButton>

    <transition name="fade">
      <PopoverPanel
        v-if="open"
        class="absolute z-10"
        :class="[
          top < height / 2 ? 'top-full mt-2' : 'bottom-full mb-2',
          x > width / 2 ? 'right-0' : 'left-0',
        ]"
      >
        <div class="w-48 rounded-lg bg-white shadow-lg">
          <ul class="p-2 text-base">
            <li v-for="person in list" :key="person.name" class="flex items-center py-1">
              <BccAvatar
                :initials="`${person.name.slice(0, 2)}`"
                :gender="person.gender"
                :child="person.age < 18"
                class="mr-2 shrink-0"
              />

              <p>
                {{ person.name }} <span class="text-sm opacity-50">{{ person.age }}</span>
              </p>
            </li>
          </ul>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
