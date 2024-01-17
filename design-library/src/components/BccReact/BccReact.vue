<script setup lang="ts">
import { AddReactionFillIcon, AddReactionIcon, KeyboardArrowLeftIcon } from "@bcc-code/icons-vue";
import { computed, ref } from "vue";
import BccReactEmoji from "./BccReactEmoji.vue";
import type { EmojiStat } from "./BccReactEmoji.vue";

type Props = {
  emojis: EmojiStat[];
  top?: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "toggle", id: string): void;
}>();

const activeEmojis = computed(() => {
  const active = props.emojis.filter((emoji) => emoji.count && emoji.count > 0);
  active.sort((a, b) => b.count! - a.count!);
  return active;
});

const show = ref(false);
function selectEmoji(emoji: EmojiStat) {
  emit("toggle", emoji.id);

  setTimeout(() => {
    show.value = false;
  }, 250);
}
</script>

<template>
  <div class="relative flex w-full items-center overflow-visible">
    <TransitionGroup name="bcc-fade">
      <button
        key="toggle"
        @click="show = !show"
        v-if="show || emojis.some((e) => !e.selected)"
        class="mr-1 flex shrink-0 cursor-pointer items-center justify-center rounded-full p-1 leading-tight transition"
        :class="[top ? 'rounded-b-full' : 'rounded-t-full']"
      >
        <AddReactionFillIcon v-if="show" class="w-6" />
        <AddReactionIcon v-else class="w-6" />
      </button>

      <div
        class="hide-scrollbar flex flex-1 items-center gap-1 overflow-x-auto overflow-y-hidden rounded-full p-1"
      >
        <template v-if="activeEmojis.length > 0">
          <TransitionGroup name="bcc-explode" appear>
            <template v-for="emoji in activeEmojis" :key="emoji.id">
              <keep-alive>
                <BccReactEmoji @click="selectEmoji(emoji)" v-bind="emoji" />
              </keep-alive>
            </template>
          </TransitionGroup>
        </template>
        <p v-else class="text-label flex items-center">
          <KeyboardArrowLeftIcon class="mr-1 w-4" /> Be the first to react 😉
        </p>
      </div>
    </TransitionGroup>

    <Transition name="bcc-scale-fast">
      <div
        key="list"
        v-if="show"
        class="absolute -left-1 z-50 flex items-center gap-1 rounded-full bg-neutral-100 px-1 shadow-xl dark:bg-neutral-600"
        :class="top ? '-top-9 origin-bottom-left' : 'top-11 origin-top-left'"
      >
        <TransitionGroup name="bcc-explode">
          <template v-for="emoji in emojis" :key="emoji.id">
            <button v-if="!emoji.selected" @click="selectEmoji(emoji)" class="px-2 pt-1">
              <span class="text-xl leading-none">{{ emoji.emoji }}</span>
            </button>
          </template>
        </TransitionGroup>
      </div>
    </Transition>
  </div>
</template>
