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
Example.args = {
  totalRecords: 5,
  perPage: 2,
  rows: [
    {
      id: 1,
      year_group: "23/24",
      name: "Ola Nordmann",
      status: { text: "On Track", context: "success" },
      progress: {
        amount: 2,
      },
    },
    {
      id: 2,
      year_group: "22/23",
      name: "Johan Oscar",
      status: { text: "Finished", context: "info" },
      progress: {
        amount: 25,
      },
    },
    {
      id: 3,
      year_group: "22/23",
      name: "Ada Lovelace",
      status: { text: "Behind Schedule", context: "warning" },
      progress: {
        amount: 15,
      },
    },
    {
      id: 4,
      year_group: "23/24",
      name: "Firmus Piett",
      status: { text: "On Track", context: "success" },
      progress: {
        amount: 15,
      },
    },
  ],
};
