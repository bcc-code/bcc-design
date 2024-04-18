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

    return { args, paginatedItems, page, columns, rowsPerPage, items, ChevronRightIcon };
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
    <BccPagination :total="args.total" v-model:currentPage="page" v-model:rowsPerPage="rowsPerPage" :align="args.align" :displayRowsPerPage="args.displayRowsPerPage" :displayLeftEllipsis="args.displayLeftEllipsis" :displayRightEllipsis="args.displayRightEllipsis" :rowsPerPageOptions="args.rowsPerPageOptions" :rowsPerPage="args.rowsPerPage" :maxButtonsDisplayed="args.maxButtonsDisplayed"/>
  `,
});

export const Example = Template.bind({});
Example.args = {
  total: 12,
  rowsPerPageOptions: [1, 2, 4, 6],
  rowsPerPage: 4,
  align: "right",
  maxButtonsDisplayed: 3,
  displayLeftEllipsis: true,
  displayRightEllipsis: true,
  displayRowsPerPage: true,
};

Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
      <BccPagination
      :total="12"
      v-model:currentPage="currentPage"
      v-model:rowsPerPage="rowsPerPage"
      align="right"
      :rowsPerPageOptions="{0:1,1:2,2:4,3:6}"
      :rowsPerPage="4"
      :maxButtonsDisplayed="5"
  />
      `,
    },
  },
};
