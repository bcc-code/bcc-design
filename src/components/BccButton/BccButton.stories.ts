import BccButton from "./BccButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/Button",
  component: BccButton,
} as Meta<typeof BccButton>;

export const Primary: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: "<BccButton>Primary</BccButton>",
});

export const Secondary: StoryFn<typeof BccButton> = () => ({
  components: { BccButton },
  template: "<BccButton type='secondary'>Primary</BccButton>",
});
