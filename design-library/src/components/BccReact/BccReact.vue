<script setup lang="ts">
import { AddReactionFillIcon, AddReactionIcon, KeyboardArrowLeftIcon } from "@bcc-code/icons-vue";
import { computed, ref } from "vue";
import BccReactEmoji from "./BccReactEmoji.vue";
import { BccReactInfo } from "./types";

type Props = {
  emojis: BccReactInfo[];
  top?: boolean;
  placeholder?: string;
};

const props = withDefaults(defineProps<Props>(), {
  top: false,
  placeholder: "Be the first to react 😉",
});
const emit = defineEmits<{
  (e: "toggle", id: string): void;
}>();

const activeEmojis = computed(() => {
  const active = props.emojis.filter((emoji) => emoji.count && emoji.count > 0);
  active.sort((a, b) => b.count! - a.count!);
  return active;
});

const show = ref(false);
function selectEmoji(emoji: BccReactInfo) {
  emit("toggle", emoji.id);

  setTimeout(() => {
    show.value = false;
  }, 250);
}
</script>

<template>
  <div class="bcc-react">
    <TransitionGroup name="bcc-fade">
      <button
        key="toggle"
        @click="show = !show"
        v-if="show || emojis.some((e) => !e.selected)"
        class="bcc-react-toggle"
        :class="[top ? 'rounded-b-full' : 'rounded-t-full']"
      >
        <AddReactionFillIcon v-if="show" class="w-6" />
        <AddReactionIcon v-else class="w-6" />
      </button>

      <div class="bcc-react-list" key="list">
        <template v-if="activeEmojis.length > 0">
          <TransitionGroup name="bcc-explode" appear>
            <template v-for="emoji in activeEmojis" :key="emoji.id">
              <keep-alive>
                <BccReactEmoji @click="selectEmoji(emoji)" v-bind="emoji" />
              </keep-alive>
            </template>
          </TransitionGroup>
        </template>
        <p v-else-if="placeholder" class="bcc-react-empty">
          <KeyboardArrowLeftIcon class="mr-1 w-4" /> {{ placeholder }}
        </p>
      </div>
    </TransitionGroup>

    <Transition name="bcc-scale-fast">
      <div
        key="list"
        v-if="show"
        class="bcc-react-selector"
        :class="{ 'bcc-react-selector--top': top }"
      >
        <TransitionGroup name="bcc-explode">
          <template v-for="emoji in emojis" :key="emoji.id">
            <button
              v-if="!emoji.selected"
              @click="selectEmoji(emoji)"
              class="bcc-react-selector-item"
            >
              {{ emoji.emoji }}
            </button>
          </template>
        </TransitionGroup>
      </div>
    </Transition>
  </div>
</template>
