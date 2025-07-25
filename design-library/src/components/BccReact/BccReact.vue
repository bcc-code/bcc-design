<script setup lang="ts">
import {
  AddReactionFillIcon,
  AddReactionIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowLeftIcon,
} from "@bcc-code/icons-vue";
import { computed, ref, watch } from "vue";
import BccReactEmoji from "./BccReactEmoji.vue";
import type { BccReactInfo } from "./types";

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

const MAX_VISIBLE_EMOJIS = 7;

const show = ref(false);
const showMore = ref(false);
const clickedId = ref<string | null>(null);
const selector = ref<HTMLElement | null>(null);

const activeEmojis = computed(() => {
  const active = props.emojis.filter((emoji) => emoji.count && emoji.count > 0);
  active.sort((a, b) => b.count! - a.count!);
  return active;
});

const unselectedEmojis = computed(() => props.emojis.filter((e) => !e.selected));
const dropdownNeeded = computed(() => unselectedEmojis.value.length > MAX_VISIBLE_EMOJIS);

const visibleEmojis = ref<BccReactInfo[]>([]);
const hiddenEmojis = ref<BccReactInfo[]>([]);

function selectEmoji(emoji: BccReactInfo) {
  clickedId.value = emoji.id;
  emit("toggle", emoji.id);

  setTimeout(() => {
    show.value = false;
    clickedId.value = null;
  }, 250);
}

watch(show, (newVal) => {
  if (newVal) {
    visibleEmojis.value = unselectedEmojis.value.slice(0, MAX_VISIBLE_EMOJIS);
    hiddenEmojis.value = unselectedEmojis.value.slice(MAX_VISIBLE_EMOJIS);
  }
});
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

      <div key="list" class="bcc-react-list">
        <template v-if="activeEmojis.length">
          <template v-for="emoji in activeEmojis" :key="emoji.id">
            <keep-alive>
              <BccReactEmoji v-bind="emoji" @click="selectEmoji(emoji)" />
            </keep-alive>
          </template>
        </template>
        <p v-else-if="props.placeholder" class="bcc-react-empty">
          <KeyboardArrowLeftIcon class="mr-1 w-4" /> {{ props.placeholder }}
        </p>
      </div>
    </TransitionGroup>

    <Transition name="bcc-scale-fast" @after-leave="showMore = false">
      <div
        v-if="show"
        key="selector"
        class="bcc-react-selector-container"
        :class="{ 'bcc-react-selector-container--top': props.top }"
      >
        <div
          ref="selector"
          class="bcc-react-selector"
          :class="
            showMore
              ? `bcc-react-selector--expanded bcc-react-selector-rows--${Math.ceil(
                  hiddenEmojis.length / 8
                )}`
              : ''
          "
        >
          <div class="bcc-react-selector-emojis-container">
            <template v-for="emoji in visibleEmojis" :key="emoji.id">
              <button
                class="bcc-react-selector-item"
                @click="selectEmoji(emoji)"
                :class="{ 'bcc-react-selector-item--clicked': clickedId === emoji.id }"
              >
                {{ emoji.emoji }}
              </button>
            </template>

            <span v-if="dropdownNeeded" class="bcc-react-selector-more">
              <button class="bcc-react-selector-more-btn" @click="showMore = !showMore">
                <KeyboardArrowDownIcon :class="['bcc-react-arrow-down-icon', { open: showMore }]" />
              </button>
            </span>
          </div>

          <div
            v-if="dropdownNeeded"
            class="bcc-react-dropdown-container"
            :class="{ 'bcc-react-dropdown-container--top': props.top }"
          >
            <div class="bcc-react-dropdown">
              <template v-for="emoji in hiddenEmojis" :key="emoji.id">
                <button
                  class="bcc-react-selector-item"
                  @click="selectEmoji(emoji)"
                  :class="{ 'bcc-react-selector-item--clicked': clickedId === emoji.id }"
                >
                  {{ emoji.emoji }}
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
