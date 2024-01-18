import BccSelectionElement from "./BccSelectionElement.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccSelectionElement",
  component: BccSelectionElement,
  argTypes: {

  },
} as Meta<typeof BccSelectionElement>;

const Template: StoryFn<typeof BccSelectionElement> = (args) => ({
  components: { BccSelectionElement },
  setup() {
    return { args };
  },
  template: `
    <BccSelectionElement v-bind="args" />
  `,
});

export const Example = Template.bind({});
Example.args = {

};
