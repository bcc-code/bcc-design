import BccItemTile from "./BccItemTile.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccItemTile",
  component: BccItemTile,
  argTypes: {

  },
} as Meta<typeof BccItemTile>;

const Template: StoryFn<typeof BccItemTile> = (args) => ({
  components: { BccItemTile },
  setup() {
    return { args };
  },
  template: `
    <BccItemTile v-bind="args" />
  `,
});

export const Example = Template.bind({});
Example.args = {

};
