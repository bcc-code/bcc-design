import BccPagination from "./BccPagination.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import { ref } from "vue";

export default {
  title: "Other/BccPagination",
  component: BccPagination,
  argTypes: {
    align: {
      options: ["left", "center", "right"],
      control: { type: "radio" },
    },
  },
} as Meta<typeof BccPagination>;

const Template: StoryFn<typeof BccPagination> = (args) => ({
  components: { BccPagination },
  setup() {
    return { args };
  },
  template: `
    <BccPagination :rowsPerPageOptions="args.rowsPerPageOptions" :showElipsis="args.showElipsis" :align="args.align" :displayRowsPerPage="args.displayRowsPerPage" :maxButtonsDisplayed="args.maxButtonsDisplayed" :rowsPerPage="args.rowsPerPage" :items="args.items" />
  `,
});

export const Example = Template.bind({});
Example.args = {
  items: 100,
  rowsPerPage: 5,
  rowsPerPageOptions: [1, 3, 5, 7, 9],
  maxButtonsDisplayed: 1,
  align: "right",
  displayRowsPerPage: true,
  showElipsis: true,
};
