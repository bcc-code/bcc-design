import BccSelectionElement from "./BccSelectionElement.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccSelectionElement",
  component: BccSelectionElement,
  argTypes: {},
} as Meta<typeof BccSelectionElement>;

const Template: StoryFn<typeof BccSelectionElement> = (args) => ({
  components: { BccSelectionElement },
  setup() {
    return { args };
  },
  template: `
    <BccSelectionElement>Link to first page</BccSelectionElement>
    <BccSelectionElement>Link to second page</BccSelectionElement>
    <BccSelectionElement :isLast="args.isLast ?? true">Link to last page</BccSelectionElement>
  `,
});

export const Example = Template.bind({});
Example.args = {};
