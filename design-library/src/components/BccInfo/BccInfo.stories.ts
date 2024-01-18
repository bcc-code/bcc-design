import BccInfo from "./BccInfo.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccInfo",
  component: BccInfo,
  argTypes: {

  },
} as Meta<typeof BccInfo>;

const Template: StoryFn<typeof BccInfo> = (args) => ({
  components: { BccInfo },
  setup() {
    return { args };
  },
  template: `
    <BccInfo v-bind="args" />
  `,
});

export const Example = Template.bind({});
Example.args = {

};
