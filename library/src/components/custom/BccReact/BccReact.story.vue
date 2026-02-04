<script setup lang="ts">
import { reactive } from "vue";
import BccReact from "./BccReact.vue";
import type { BccReactInfo } from "./types";

function onToggle(emojis: BccReactInfo[], emojiId: string) {
  const emoji = emojis.find((e) => e.id === emojiId);
  if (!emoji) return;
  if (emoji.count === undefined) emoji.count = 0;
  emoji.count += emoji.selected ? -1 : 1;
  emoji.selected = !emoji.selected;
}

const moreThanSeven = reactive<BccReactInfo[]>([
  { id: "thumbsup", emoji: "👍", count: 5 },
  { id: "heart", emoji: "❤️", count: 10 },
  { id: "fire", emoji: "🔥", count: 8 },
  { id: "smiling_hearts", emoji: "🥰", count: 0 },
  { id: "clap", emoji: "👏", count: 0 },
  { id: "grin", emoji: "😁", count: 0 },
  { id: "party", emoji: "🎉", count: 0 },
  { id: "star_eyes", emoji: "🤩", count: 4 },
  { id: "pray", emoji: "🙏", count: 1 },
  { id: "ok", emoji: "👌", count: 0 },
  { id: "hearts_hands", emoji: "🫶", count: 0 },
  { id: "heart_eyes", emoji: "😍", count: 0 },
  { id: "hundred", emoji: "💯", count: 0 },
  { id: "rofl", emoji: "🤣", count: 0 },
  { id: "rocket", emoji: "🚀", count: 9 },
]);

const sevenOrFewer = reactive<BccReactInfo[]>([
  { id: "thumbsup", emoji: "👍", count: 0 },
  { id: "happy", emoji: "😃", count: 2, selected: true },
  { id: "smile", emoji: "😊", count: 0 },
  { id: "glasses", emoji: "😎", count: 0 },
  { id: "love", emoji: "😍", count: 0 },
  { id: "stars", emoji: "🤩", count: 0 },
  { id: "rocket", emoji: "🚀", count: 93 },
]);

const emptyEmojis = reactive<BccReactInfo[]>(
  sevenOrFewer.map((e) => ({ ...e, count: 0, selected: false }))
);
</script>

<template>
  <Story title="Feedback/BccReact">
    <Variant title="More than seven emojis">
      <div class="h-40 flex items-center">
        <BccReact
          :top="true"
          :emojis="moreThanSeven"
          @toggle="(id) => onToggle(moreThanSeven, id)"
        />
      </div>
    </Variant>
    <Variant title="Seven or fewer emojis">
      <div class="h-20 flex items-center">
        <BccReact
          :top="false"
          :emojis="sevenOrFewer"
          @toggle="(id) => onToggle(sevenOrFewer, id)"
        />
      </div>
    </Variant>
    <Variant title="Empty emojis">
      <div class="h-20 flex items-center">
        <BccReact
          :top="true"
          placeholder="No reactions yet"
          :emojis="emptyEmojis"
          @toggle="(id) => onToggle(emptyEmojis, id)"
        />
      </div>
    </Variant>
  </Story>
</template>
