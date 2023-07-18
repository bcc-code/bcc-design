import BccAlert from "./BccAlert.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccAlert",
  component: BccAlert,
  argTypes: {
    context: {
      options: ["info", "success", "warning", "danger"],
      control: { type: "radio" },
    },
  },
} as Meta<typeof BccAlert>;

const Template: StoryFn<typeof BccAlert> = (args) => ({
  components: { BccAlert },
  setup() {
    return { args };
  },
  template: `
    <BccAlert v-bind="args">
      {{ args.slotDefault }}
    </BccAlert>
  `,
});

export const Example = Template.bind({});
Example.args = {
  context: "info",
  slotDefault: "Successfully uploaded.",
};
