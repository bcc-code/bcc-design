import BccPagination from "./BccPagination.vue";
import BccTable from "../BccTable/BccTable.vue";
import BccButton from "../BccButton/BccButton.vue";
import BccBadge from "../BccBadge/BccBadge.vue";
import { ChevronRightIcon } from "@bcc-code/icons-vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import { ref } from "vue";

export default {
  title: "Other/BccPagination",
  component: BccPagination,
  argTypes: {
    perPage: { control: "number", defaultValue: 2 },
  },
} as Meta<typeof BccPagination>;

const Template: StoryFn<typeof BccPagination> = (args) => ({
  components: { BccPagination, BccTable, BccButton, BccBadge },
  setup() {
    const paginatedRows = ref(args.tableItems);

    const columns = ref([
      {
        text: "Year group",
        key: "year_group",
      },
      {
        text: "Name",
        key: "name",
      },
      {
        text: "Status",
        key: "status",
      },
      {
        text: "Progress",
        key: "progress.amount",
      },
      {
        text: "Actions",
        key: "actions",
        sortable: false,
      },
    ]);

    return { args, paginatedRows, columns, ChevronRightIcon };
  },
  template: `
    <BccTable :items="paginatedRows" :columns="columns"> 
    <template #item.status="{ item }">
        <BccBadge :context="item.status.context">{{ item.status.text }}</BccBadge>
      </template>
      <template #item.actions="{ item }">
        <BccButton variant="tertiary" size="sm" :padding="false" :icon="ChevronRightIcon" iconRight>Evaluation</BccButton>
      </template>
    </BccTable>
    <BccPagination :tableItems="args.tableItems" v-model:paginatedRows="paginatedRows" :perPage="args.perPage" />
  `,
});

export const Example = Template.bind({});
Example.args = {
  tableItems: [
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
    {
      id: 5,
      year_group: "22/23",
      name: "John Pork",
      status: { text: "On Track", context: "warning" },
      progress: {
        amount: 45,
      },
    },
    {
      id: 6,
      year_group: "23/24",
      name: "John Doe",
      status: { text: "Behind Schedule", context: "info" },
      progress: {
        amount: 80,
      },
    },
    {
      id: 7,
      year_group: "22/23",
      name: "Skibidi Toilet",
      status: { text: "Finished", context: "sucess" },
      progress: {
        amount: 100,
      },
    },
  ],
};
