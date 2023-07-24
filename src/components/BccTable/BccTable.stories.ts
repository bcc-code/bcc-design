import BccTable from "./BccTable.vue";
import BccButton from "@/components/BccButton/BccButton.vue";
import BccBadge from "@/components/BccBadge/BccBadge.vue";
import { ChevronRightIcon } from "@bcc-code/icons-vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccTable",
  component: BccTable,
  argTypes: {
    sortDirection: {
      options: ["ascending", "descending"],
      control: { type: "radio" },
    },
  },
} as Meta<typeof BccTable>;

const Template: StoryFn<typeof BccTable> = (args) => ({
  components: { BccTable, BccButton, BccBadge },
  setup() {
    return { args, ChevronRightIcon };
  },
  template: `
    <BccTable :columns="args.columns" :items="args.items" v-model:sortBy="args.sortBy" v-model:sortDirection="args.sortDirection">
      <template #item.status="{ item }">
        <BccBadge :context="item.status.context">{{ item.status.text }}</BccBadge>
      </template>
      <template #item.actions="{ item }">
        <BccButton variant="tertiary" size="sm" :padding="false" :icon="ChevronRightIcon" iconRight>Evaluation</BccButton>
      </template>
    </BccTable>
  `,
});

export const Example = Template.bind({});
Example.args = {
  sortBy: undefined,
  sortDirection: "descending",
  columns: [
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
      key: "progress",
    },
    {
      text: "Actions",
      key: "actions",
      sortable: false,
    },
  ],
  items: [
    {
      id: 1,
      year_group: "23/24",
      name: "Ola Nordmann",
      status: { text: "Behind Schedule", context: "warning" },
      progress: 2,
    },
    {
      id: 2,
      year_group: "22/23",
      name: "Lawrence Greenfield",
      status: { text: "Finished", context: "info" },
      progress: 25,
    },
    {
      id: 3,
      year_group: "22/23",
      name: "Ada Lovelace",
      status: { text: "On Track", context: "success" },
      progress: 15,
    },
    {
      id: 4,
      year_group: "23/24",
      name: "Firmus Piett",
      status: { text: "On Track", context: "success" },
      progress: 15,
    },
  ],
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccTable
  :columns="columns"
  :items="items"
  v-model:sortBy="sortBy"
  v-model:sortDirection="sortDirection"
>
  <template #item.status="{ item }">
    <BccBadge :context="item.status.context">{{ item.status.text }}</BccBadge>
  </template>
  <template #item.actions="{ item }">
    <BccButton variant="tertiary" size="sm" :padding="false" :icon="ChevronRightIcon" iconRight @click="editItem(item.id")>Evaluation</BccButton>
  </template>
</BccTable>
    `,
    },
  },
};
