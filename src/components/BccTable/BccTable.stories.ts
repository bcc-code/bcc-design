import BccTable from "./BccTable.vue";
import BccTableHeader from "./BccTableHeader.vue";
import BccTableRow from "./BccTableRow.vue";
import BccTableCell from "./BccTableCell.vue";
import BccButton from "@/components/BccButton/BccButton.vue";
import BccBadge from "@/components/BccBadge/BccBadge.vue";
import { ChevronRightIcon } from "@bcc-code/icons-vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccTable",
  component: BccTable,
  argTypes: {},
} as Meta<typeof BccTable>;

const Template: StoryFn<typeof BccTable> = (args) => ({
  components: { BccTable, BccTableHeader, BccTableRow, BccTableCell, BccButton, BccBadge },
  setup() {
    return { args, ChevronRightIcon };
  },
  template: `
    <BccTable>
      <template #headers>
        <BccTableHeader>Year group</BccTableHeader>
        <BccTableHeader>Name</BccTableHeader>
        <BccTableHeader>Status</BccTableHeader>
        <BccTableHeader>Progress</BccTableHeader>
        <BccTableHeader>Actions</BccTableHeader>
      </template>

      <BccTableRow v-for="item in args.items">
        <BccTableCell>{{ item.year_group }}</BccTableCell>
        <BccTableCell>{{ item.name }}</BccTableCell>
        <BccTableCell>
          <BccBadge :context="item.status.context">
            {{ item.status.text }}
          </BccBadge>
        </BccTableCell>
        <BccTableCell>{{ item.progress }}</BccTableCell>
        <BccTableCell>
          <BccButton variant="tertiary" :padding="false" size="sm" :icon="ChevronRightIcon" iconRight>Evaluation</BccButton>
        </BccTableCell>
      </BccTableRow>
    </BccTable>
  `,
});

export const Example = Template.bind({});
Example.args = {
  items: [
    {
      id: 1,
      year_group: "23/24",
      name: "Ola Nordmann",
      status: { text: "Behind Schedule", context: "warning" },
      progress: "2/25",
    },
    {
      id: 2,
      year_group: "23/24",
      name: "Firmus Piett",
      status: { text: "On Track", context: "success" },
      progress: "15/25",
    },
  ],
};
