import BccGraphic from "./BccGraphic.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccGraphic",
  component: BccGraphic,
  argTypes: {},
} as Meta<typeof BccGraphic>;

const Template: StoryFn<typeof BccGraphic> = (args) => ({
  components: { BccGraphic },
  setup() {
    return { args };
  },
  template: `
    <BccGraphic v-bind="args" />
  `,
});

export const Example = Template.bind({});
Example.args = {
  bannerSrc: "https://event.bcc.no/wp-content/uploads/2023/10/Background-7.png",
  logoSrc: "https://event.bcc.no/wp-content/uploads/2023/11/BUK4_Logo-Main.svg",
  linkOut: true,
  checked: true,
  rounding: "xl",
};

export const ExampleWithCheck = Template.bind({});
ExampleWithCheck.args = {
  rounding: "md",
  checked: true,
};
