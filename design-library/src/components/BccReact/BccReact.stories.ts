import BccReact from "./BccReact.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Feedback/BccReact",
  component: BccReact,
  argTypes: {},
} as Meta<typeof BccReact>;

const Template: StoryFn<typeof BccReact> = (args, { parameters }) => ({
  components: { BccReact },
  setup() {
    const height = parameters.height || "h-40";
    return { args, height };
  },
  methods: {
    onToggle(emojiId: string) {
      const emoji = args.emojis.find((e) => e.id === emojiId);
      if (!emoji) return;
      if (emoji.count === undefined) emoji.count = 0;
      emoji.count += emoji.selected ? -1 : 1;
      emoji.selected = !emoji.selected;

      // Enable for only allowing single reaction per user
      /*
      if (args.singleReaction && emoji.selected) {
        args.emojis.forEach((e) => {
          if (e.id !== emojiId && e.selected) {
            e.selected = false;
            e.count = (e.count || 1) - 1;
          }
        });
      }
      */
    },
  },
  template: `
    <div :class="height + ' flex items-center'">
      <BccReact v-bind="args" @toggle="onToggle" />
    </div>
  `,
});

export const MoreThanSevenEmojis = Template.bind({});
MoreThanSevenEmojis.parameters = { height: "h-40" };
MoreThanSevenEmojis.args = {
  top: true,
  emojis: [
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
  ],
};

export const SevenOrFewerEmojis = Template.bind({});
SevenOrFewerEmojis.parameters = { height: "h-20" };
SevenOrFewerEmojis.args = {
  top: false,
  emojis: [
    { id: "thumbsup", emoji: "👍", count: 0 },
    { id: "happy", emoji: "😃", count: 2, selected: true },
    { id: "smile", emoji: "😊", count: 0 },
    { id: "glasses", emoji: "😎", count: 0 },
    { id: "love", emoji: "😍", count: 0 },
    { id: "stars", emoji: "🤩", count: 0 },
    { id: "rocket", emoji: "🚀", count: 93 },
  ],
};

SevenOrFewerEmojis.parameters = {
  height: "h-20",
  docs: {
    source: {
      language: "html",
      code: `
<--script-->
  onToggle(emojiId: string) {
    const emoji = args.emojis.find((e) => e.id === emojiId);
    if (!emoji) return;
    if (emoji.count === undefined) emoji.count = 0;
    emoji.count += emoji.selected ? -1 : 1;
    emoji.selected = !emoji.selected;

    // Enable for only allowing single reaction per user
    /*
    if (args.singleReaction && emoji.selected) {
      args.emojis.forEach((e) => {
        if (e.id !== emojiId && e.selected) {
          e.selected = false;
          e.count = (e.count || 1) - 1;
        }
      });
    }
    */
  }
</-script-->

<template>
  <div class="h-16 flex items-center">
    <BccReact v-bind="args" @toggle="onToggle" />
  </div>
</template>
    `,
    },
  },
};

export const EmptyEmojis = Template.bind({});
EmptyEmojis.args = {
  top: true,
  placeholder: "No reactions yet",
  emojis: SevenOrFewerEmojis.args.emojis.map((e) => ({
    ...e,
    count: 0,
    selected: false,
  })),
};
