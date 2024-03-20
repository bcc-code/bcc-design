import BccPagination from "./BccPagination.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Other/BccPagination",
  component: BccPagination,
  argTypes: {},
} as Meta<typeof BccPagination>;

const Template: StoryFn<typeof BccPagination> = (args) => ({
  components: { BccPagination },
  setup() {
    return { args };
  },
  template: `
    <BccPagination v-bind="args" />
  `,
});

export const Example = Template.bind({});
