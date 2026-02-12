import BccPagination from "./BccPagination.vue";
import BccTable from "../BccTable/BccTable.vue";
import BccButton from "../BccButton/BccButton.vue";
import BccBadge from "../BccBadge/BccBadge.vue";
import { ChevronRightIcon } from "@bcc-code/icons-vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import { computed, ref } from "vue";

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
    <BccPagination :total="args.total" :align="args.align" :displayRowsPerPage="args.displayRowsPerPage" :displayLeftEllipsis="args.displayLeftEllipsis" :displayRightEllipsis="args.displayRightEllipsis" :rowsPerPageOptions="args.rowsPerPageOptions" :rowsPerPage="args.rowsPerPage" :maxButtonsDisplayed="args.maxButtonsDisplayed"/>
  `,
});

export const Example = Template.bind({});
Example.args = {
  total: 100,
  rowsPerPageOptions: [5, 10, 25, 50],
  rowsPerPage: 5,
  align: "right",
  maxButtonsDisplayed: 3,
  displayLeftEllipsis: true,
  displayRightEllipsis: true,
  displayRowsPerPage: true,
};

const TempTable: StoryFn<typeof BccPagination> = () => ({
  components: { BccPagination, BccTable, BccButton, BccBadge },
  setup() {
    const columns = ref([
      {
        text: "Year group",
        key: "year_group",
        sortable: false,
      },
      {
        text: "Name",
        key: "name",
        sortable: false,
      },
      {
        text: "Status",
        key: "status",
        sortable: false,
      },
      {
        text: "Progress",
        key: "progress.amount",
        sortable: false,
      },
      {
        text: "Actions",
        key: "actions",
        sortable: false,
      },
    ]);

    const items = ref([
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
        name: "G Man",
        status: { text: "Finished", context: "sucess" },
        progress: {
          amount: 100,
        },
      },
      {
        id: 8,
        year_group: "23/24",
        name: "Jane Doe",
        status: { text: "Finished", context: "info" },
        progress: {
          amount: 37,
        },
      },
      {
        id: 9,
        year_group: "23/24",
        name: "Daphne Bennet",
        status: { text: "Behind Schedule", context: "warning" },
        progress: {
          amount: 45,
        },
      },
      {
        id: 10,
        year_group: "22/24",
        name: "Lorem Ipsum",
        status: { text: "On Track", context: "warning" },
        progress: {
          amount: 10,
        },
      },
      {
        id: 11,
        year_group: "22/23",
        name: "Nathaniel B",
        status: { text: "On Track", context: "sucess" },
        progress: {
          amount: 95,
        },
      },
      {
        id: 12,
        year_group: "22/23",
        name: "Nathaniel T",
        status: { text: "On Track", context: "sucess" },
        progress: {
          amount: 20,
        },
      },
    ]);

    const page = ref(1);
    const rowsPerPage = ref(4);
    const start = computed(() => {
      return (page.value - 1) * rowsPerPage.value;
    });
    const end = computed(() => {
      return start.value + rowsPerPage.value;
    });
    const paginatedItems = computed(() => items.value.slice(start.value, end.value));

    return { paginatedItems, page, columns, rowsPerPage, items, ChevronRightIcon };
  },
  template: `
    <BccTable :items="paginatedItems" :columns="columns">
    <template #item.status="{ item }">
        <BccBadge :context="item.status.context">{{ item.status.text }}</BccBadge>
      </template>
      <template #item.actions="{ item }">
        <BccButton variant="tertiary" size="sm" :padding="false" :icon="ChevronRightIcon" iconRight>Evaluation</BccButton>
      </template>
    </BccTable>
    <BccPagination :total="items.length" v-model:currentPage="page" v-model:rowsPerPage="rowsPerPage" :rowsPerPageOptions="[1, 2, 4, 6]" :rowsPerPage="4"/>
  `,
});
export const Table = TempTable.bind({});

const TempAlign: StoryFn<typeof BccPagination> = (args) => ({
  components: { BccPagination },
  setup() {
    return { args };
  },
  template: `
    <div class="flex flex-col gap-5">
      <BccPagination :total="30" align="left"/>
      <BccPagination :total="30" align="right"/>
      <BccPagination :total="30" align="center"/>
    </div>
  `,
});

export const Align = TempAlign.bind({});

const TempElipsis: StoryFn<typeof BccPagination> = (args) => ({
  components: { BccPagination },
  setup() {
    return { args };
  },
  template: `
  <div class="flex flex-col gap-5">
    <BccPagination :total="40" align="left" :displayRightEllipsis="false" :displayRowsPerPage="false" />
    <BccPagination :total="40" align="left" :displayLeftEllipsis="false" :displayRowsPerPage="false" />
    <BccPagination :total="40" align="left" :displayLeftEllipsis="false" :displayRightEllipsis="false" :displayRowsPerPage="false" />
  </div>
  `,
});

export const Elipsis = TempElipsis.bind({});

const TempMaxButtons: StoryFn<typeof BccPagination> = (args) => ({
  components: { BccPagination },
  setup() {
    return { args };
  },
  template: `
  <div class="flex flex-col gap-5">
    <BccPagination :total="60" :rowsPerPage="5" :maxButtonsDisplayed="3" align="left" :displayRowsPerPage="false" />
    <BccPagination :total="60" :rowsPerPage="5" :maxButtonsDisplayed="5" align="left" :displayRowsPerPage="false" />
    <BccPagination :total="60" :rowsPerPage="5" :maxButtonsDisplayed="10" align="left" :displayRowsPerPage="false"  />
  </div>
  `,
});

export const MaxButtons = TempMaxButtons.bind({});
