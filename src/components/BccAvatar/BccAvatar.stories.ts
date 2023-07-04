import BccAvatar from "./BccAvatar.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccAvatar",
  component: BccAvatar,
  argTypes: {
    gender: {
      options: ["male", "female", "unknown"],
      control: { type: "radio" },
    },
    size: {
      options: ["xs", "sm"],
      control: { type: "radio" },
    },
  },
} as Meta<typeof BccAvatar>;

const Template: StoryFn<typeof BccAvatar> = (args) => ({
  components: { BccAvatar },
  setup() {
    return { args };
  },
  template: `
    <BccAvatar v-bind="args" />
  `,
});

export const Example = Template.bind({});
Example.args = {
  initials: "LG",
  gender: "male",
  child: false,
  size: "sm",
};

export const State: StoryFn<typeof BccAvatar> = () => ({
  components: { BccAvatar },
  template: `
    <div class="flex items-center space-x-4">
      <BccAvatar initials="Ge" gender="male" />
      <BccAvatar initials="Id" gender="female" />
      <BccAvatar initials="Un" gender="unknown" />
      <BccAvatar initials="Ab" gender="male" :child="true" />
      <BccAvatar initials="Cd" gender="female" :child="true" />
      <BccAvatar initials="Un" gender="unknown" :child="true" />
    </div>
  `,
});

/**
 * Use CSS to create a list of avatars
 */
export const ListExample: StoryFn<typeof BccAvatar> = () => ({
  components: { BccAvatar },
  template: `
    <div class="flex items-center">
      <BccAvatar initials="Ge" gender="male" />
      <BccAvatar initials="Id" gender="female" class="shrink-0 -ml-[0.571em]" />
      <BccAvatar initials="Un" gender="unknown" class="shrink-0 -ml-[0.571em]" />
      <BccAvatar initials="Ab" gender="male" :child="true" class="shrink-0 -ml-[0.571em]" />
      <BccAvatar initials="Cd" gender="female" :child="true" class="shrink-0 -ml-[0.571em]" />
      <BccAvatar initials="+2"  :child="true" class="shrink-0 -ml-[0.571em]" />
    </div>
  `,
});
