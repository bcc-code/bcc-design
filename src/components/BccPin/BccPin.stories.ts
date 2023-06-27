import BccPin from "./BccPin.vue";
import { CheckCircleIcon } from "@bcc-code/icons-vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccPin",
  component: BccPin,
  argTypes: {
    variant: {
      description: "Determines the styling of the pin",
      options: ["neutral", "danger", "warning", "success", "info", "systemInfo"],
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
  variant: "neutral",
  text: "",
};

export const WithIcon: StoryFn<typeof BccPin> = () => ({
  components: { BccPin },
  setup() {
    return { CheckCircleIcon };
  },
  template: `
    <div class="flex items-start space-x-2">
      <BccPin variant="neutral" :icon="CheckCircleIcon" />
      <BccPin variant="danger" :icon="CheckCircleIcon" />
      <BccPin variant="warning" :icon="CheckCircleIcon" />
      <BccPin variant="success" :icon="CheckCircleIcon" />
      <BccPin variant="info" :icon="CheckCircleIcon" />
    </div>
  `,
});

export const WithText: StoryFn<typeof BccPin> = () => ({
  components: { BccPin },
  template: `
    <div class="flex items-start space-x-2">
      <BccPin variant="neutral" text="1" />
      <BccPin variant="danger" text="1" />
      <BccPin variant="warning" text="1" />
      <BccPin variant="success" text="1" />
      <BccPin variant="info" text="1" />
    </div>
  `,
});
