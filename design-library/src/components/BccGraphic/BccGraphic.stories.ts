import BccGraphic from "./BccGraphic.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccGraphic",
  component: BccGraphic,
  argTypes: {

  },
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

};
