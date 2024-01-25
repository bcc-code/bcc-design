import BccInfo from "./BccInfo.vue";
import BccButton from "../BccButton/BccButton.vue";
import { ClockLoader10Icon } from "@bcc-code/icons-vue";
import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Widgets/BccInfo",
  component: BccInfo,
  argTypes: {},
} as Meta<typeof BccInfo>;

const Template: StoryFn<typeof BccInfo> = (args) => ({
  components: { BccInfo, BccButton },
  setup() {
    return { args, ClockLoader10Icon };
  },
  template: `
    <BccInfo v-bind="args" :infoIcon="ClockLoader10Icon">
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
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccInfo title="Title" infoText="info" :icon="ClockLoader10Icon">
  <template #infoRight>
    <BccButton size="sm">Button text</BccButton>
  </template>
</BccInfo>
    `,
    },
  },
};

export const OnlyTitleAndText: StoryFn<typeof BccInfo> = () => ({
  components: { BccInfo },
  template: `
    <BccInfo title="Title" infoText="Info" />
  `,
});
