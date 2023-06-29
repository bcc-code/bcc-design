import BccPin from "./BccPin.vue";
import { CheckCircleIcon } from "@bcc-code/icons-vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccPin",
  component: BccPin,
  argTypes: {
    context: {
      description: "Which context color to use for the styling of the pin",
      options: ["neutral", "danger", "warning", "success", "info"],
      control: { type: "radio" },
    },
  },
} as Meta<typeof BccPin>;

const Template: StoryFn<typeof BccPin> = (args) => ({
  components: { BccPin },
  setup() {
    return { args, CheckCircleIcon };
  },
  template: `
    <BccPin v-bind="args" :icon="CheckCircleIcon" />
  `,
});

export const Example = Template.bind({});
Example.args = {
  context: "neutral",
  text: "",
};

export const WithIcon: StoryFn<typeof BccPin> = () => ({
  components: { BccPin },
  setup() {
    return { CheckCircleIcon };
  },
  template: `
    <div class="flex items-start space-x-2">
      <BccPin context="neutral" :icon="CheckCircleIcon" />
      <BccPin context="danger" :icon="CheckCircleIcon" />
      <BccPin context="warning" :icon="CheckCircleIcon" />
      <BccPin context="success" :icon="CheckCircleIcon" />
      <BccPin context="info" :icon="CheckCircleIcon" />
    </div>
  `,
});

export const WithText: StoryFn<typeof BccPin> = () => ({
  components: { BccPin },
  template: `
    <div class="flex items-start space-x-2">
      <BccPin context="neutral" text="1" />
      <BccPin context="danger" text="1" />
      <BccPin context="warning" text="1" />
      <BccPin context="success" text="1" />
      <BccPin context="info" text="1" />
    </div>
  `,
});
