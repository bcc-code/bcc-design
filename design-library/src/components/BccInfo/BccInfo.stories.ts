import BccInfo from "./BccInfo.vue";
import BccButton from "../BccButton/BccButton.vue";
import { ClockLoader10Icon } from "@bcc-code/icons-vue";
import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccInfo",
  component: BccInfo,
  argTypes: {},
} as Meta<typeof BccInfo>;

const Template: StoryFn<typeof BccInfo> = (args) => ({
  components: { BccInfo, BccButton },
  setup() {
    return { args };
  },
  template: `
    <BccInfo v-bind="args">
        <template #infoRight>
        <BccButton size="sm">Button text</BccButton>
      </template>
    </BccInfo>
  `,
});

export const Example = Template.bind({});
Example.args = {
  title: "Title",
  infoText: "Info",
  infoIcon: ClockLoader10Icon,
};

export const BoringExample: StoryFn<typeof BccInfo> = (args) => ({
  components: { BccInfo, BccButton },
  setup() {
    return { args, ClockLoader10Icon };
  },
  template: `<BccInfo v-bind="args"/>`,
});
BoringExample.args = {
  title: "Title",
  infoText: "Info",
};
