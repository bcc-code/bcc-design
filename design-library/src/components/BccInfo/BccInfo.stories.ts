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
  components: { BccInfo },
  setup() {
    return { args };
  },
  template: `
    <BccInfo v-bind="args" />
  `,
});

export const Example = Template.bind({});
Example.args = {
  title: "Title",
  infoText: "Info",
};

export const WithButton: StoryFn<typeof BccInfo> = (args) => ({
  components: { BccInfo, BccButton },
  setup() {
    return { args, ClockLoader10Icon };
  },
  template: `
    <div class="flex flex-col space-y-4">
      <BccInfo v-bind="args" :infoIcon="ClockLoader10Icon">
        <template #infoRight>
          <BccButton size="sm">Button text</BccButton>
        </template>
      </BccInfo>
    </div>
  `,
});
WithButton.args = {
  title: "Title",
  infoText: "Info",
};
