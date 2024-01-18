import BccHeader from "./BccHeader.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccHeader",
  component: BccHeader,
  argTypes: {

  },
} as Meta<typeof BccHeader>;

const Template: StoryFn<typeof BccHeader> = (args) => ({
  components: { BccHeader },
  setup() {
    return { args };
  },
  template: `
    <BccHeader v-bind="args" />
  `,
});

export const Example = Template.bind({});
Example.args = {

};
