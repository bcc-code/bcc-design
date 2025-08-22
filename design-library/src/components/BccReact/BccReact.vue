<script setup lang="ts">
import {
  AddReactionFillIcon,
  AddReactionIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowLeftIcon,
} from "@bcc-code/icons-vue";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
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
const SELECTOR_HEIGHT = 36;

const show = ref(false);
const showMore = ref(false);
const clickedId = ref<string | null>(null);
const selector = ref<HTMLElement | null>(null);
const toggleButton = ref<HTMLElement | null>(null);
const shouldOpenUpwards = ref(false);

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

function checkOpenDirection() {
  if (!selector.value) return;
  const rect = selector.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  shouldOpenUpwards.value = rect.bottom + 200 > viewportHeight;
}

watch(show, async (newVal) => {
  if (newVal) {
    visibleEmojis.value = unselectedEmojis.value.slice(0, MAX_VISIBLE_EMOJIS);
    hiddenEmojis.value = unselectedEmojis.value.slice(MAX_VISIBLE_EMOJIS);
    await nextTick(checkOpenDirection);
  }
});

watch(showMore, async (newVal) => {
  await nextTick(checkOpenDirection);
  if (!selector.value) return;

  const el = selector.value;
  el.style.transition = "height 0.3s ease, transform 0.3s ease";

  if (newVal) {
    el.style.height = `${SELECTOR_HEIGHT}px`;
    el.style.transform = "translateY(0)";
    void el.offsetHeight;
    el.style.height = el.scrollHeight + "px";
    if (shouldOpenUpwards.value) {
      el.style.transform = `translateY(-${el.scrollHeight - SELECTOR_HEIGHT}px)`;
    }
  } else {
    void el.offsetHeight;
    el.style.height = el.scrollHeight + "px";
    el.style.height = `${SELECTOR_HEIGHT}px`;
    if (shouldOpenUpwards.value) {
      el.style.transform = `translateY(0)`;
    }
  }
});

onMounted(() => {
  function onClickOutside(event: MouseEvent) {
    const target = event.target as Node;

    if (!show.value || selector.value?.contains(target) || toggleButton.value?.contains(target)) {
      return;
    }

    show.value = false;
  }

  document.addEventListener("click", onClickOutside, true);

  onUnmounted(() => {
    document.removeEventListener("click", onClickOutside, true);
  });
});
</script>

<template>
  <div class="bcc-react">
    <TransitionGroup name="bcc-fade">
      <button
        key="toggle"
        ref="toggleButton"
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
        <div ref="selector" class="bcc-react-selector">
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
