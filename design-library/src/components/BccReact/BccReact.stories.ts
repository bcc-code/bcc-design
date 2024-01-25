import BccReact from "./BccReact.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Other/BccReact",
  component: BccReact,
  argTypes: {},
} as Meta<typeof BccReact>;

const Template: StoryFn<typeof BccReact> = (args) => ({
  components: { BccReact },
  setup() {
    return { args };
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
    <div class="h-20 flex items-center">
      <BccReact v-bind="args" @toggle="onToggle" />
    </div>
  `,
});

export const Example = Template.bind({});
Example.args = {
  top: false,
  emojis: [
    {
      id: "thumbsup",
      emoji: "👍",
      count: 0,
    },
    {
      id: "happy",
      emoji: "😃",
      count: 2,
      selected: true,
    },
    {
      id: "smile",
      emoji: "😊",
      count: 0,
    },
    {
      id: "glasses",
      emoji: "😎",
      count: 0,
    },
    {
      id: "love",
      emoji: "😍",
      count: 0,
    },
    {
      id: "stars",
      emoji: "🤩",
      count: 0,
    },
    {
      id: "rocket",
      emoji: "🚀",
      count: 93,
    },
  ],
};

Example.parameters = {
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
  emojis: [
    {
      id: "thumbsup",
      emoji: "👍",
      count: 0,
    },
    {
      id: "happy",
      emoji: "😃",
      count: 0,
    },
    {
      id: "smile",
      emoji: "😊",
      count: 0,
    },
    {
      id: "glasses",
      emoji: "😎",
      count: 0,
    },
    {
      id: "love",
      emoji: "😍",
      count: 0,
    },
    {
      id: "stars",
      emoji: "🤩",
      count: 0,
    },
    {
      id: "rocket",
      emoji: "🚀",
      count: 0,
    },
  ],
};
