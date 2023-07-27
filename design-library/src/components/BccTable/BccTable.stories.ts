import BccTable from "./BccTable.vue";
import BccButton from "@/components/BccButton/BccButton.vue";
import BccBadge from "@/components/BccBadge/BccBadge.vue";
import { ChevronRightIcon } from "@bcc-code/icons-vue";

import type { Meta, StoryFn } from "@storybook/vue3";

/**
 * A versatile table with built-in sorting.
 */
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

const statusSort = (a, b) => {
  if (a.status.text > b.status.text) return 1;
  if (a.status.text < b.status.text) return -1;
  return 0;
};

/**
 * Pass a `columns` array with `text` (displayed as the column header in the table) and `key` (used to reference values) elements. Pass an `items` array with objects that have an item for each of the `key`s in the columns (or pass a slot for columns that do not have associated data, see below).
 *
 * By default the contents whatever is in the item key will be rendered. You can render something from deeper levels by using a dot notation, such as `progress.amount`.
 * Pass a slot to the table named `item.<column key>` to control the rendering. In this example both for `status` and `actions` a custom table cell is rendered. This slot is a [scoped slot](https://vuejs.org/guide/components/slots.html#scoped-slots) and receives the current `item` as a slot prop.
 *
 * Columns are sortable by default, set `sortable: false` on a column to disable sorting. Set a `sortMethod` on a column to have a custom sort method, handy when that particular column isn't something that can be sorted alphabetically or numerically by default (note that our example on the status column here only works with ascending sort due to Storybook limitations).
 */
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
      sortMethod: statusSort,
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
  ],
  items: [
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
