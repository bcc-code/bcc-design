import BccLinkItem from "./BccLinkItem.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccLinkItem",
  component: BccLinkItem,
  argTypes: {},
} as Meta<typeof BccLinkItem>;

const Template: StoryFn<typeof BccLinkItem> = (args) => ({
  components: { BccLinkItem },
  setup() {
    return { args };
  },
  template: `
    <BccLinkItem>Link to first page</BccLinkItem>
    <BccLinkItem>Link to second page</BccLinkItem>
    <BccLinkItem :isLast="args.isLast ?? true">Link to last page</BccLinkItem>
  `,
});

export const Example = Template.bind({});
Example.args = {};
