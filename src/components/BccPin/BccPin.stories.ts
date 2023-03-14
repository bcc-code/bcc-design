import BccPin from "./BccPin.vue";
import { CheckCircleIcon } from "@bcc-code/icons-vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import { app } from "@storybook/vue3";

app.component('CheckCircleIcon', CheckCircleIcon);

export default {
  title: "Components/BccPin",
  component: BccPin,
  argTypes: {
    variant: {
      description: "Determines the styling of the badge",
      options: ["neutral", "error", "warning", "success", "info", "systemInfo"],
      control: { type: "radio" },
    },
    size: {
      description: "Size of the badge",
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    }
  },
} as Meta<typeof BccPin>;

const Template: StoryFn<typeof BccPin> = (args) => ({
  components: { BccPin, CheckCircleIcon },
  setup() {
    return { args };
  },
  template: `
    <BccPin v-bind="args" icon="CheckCircleIcon" />
  `,
});

export const Example = Template.bind({});
Example.parameters = {
  viewMode: "docs",
};
Example.args = {
};

export const Variants: StoryFn<typeof BccPin> = () => ({
  components: { BccPin, CheckCircleIcon },
  template: `
    <div class="flex items-start space-x-2">
      Neutral
      <BccPin variant="neutral" icon="CheckCircleIcon" />
      Error
      <BccPin variant="error" icon="CheckCircleIcon" />
      <BccPin variant="warning" icon="CheckCircleIcon" />
      <BccPin variant="success" icon="CheckCircleIcon" />
      <BccPin variant="info" icon="CheckCircleIcon" />
    </div>
  `,
});