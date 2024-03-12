import BccStepper from "./BccStepper.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Other/BccStepper",
  component: BccStepper,
  argTypes: {
    currentStep: {
      control: { type: "number" },
      description: "The current active step, zero-based index.",
    },
    steps: {
      control: { type: "object" },
      description: "An array of step labels.",
    },
    additionalText: {
      control: { type: "boolean" },
      description: "Whether to show the step number or title alongside the indicators.",
    },
  },
} as Meta<typeof BccStepper>;

const Template: StoryFn<typeof BccStepper> = (args) => ({
  components: { BccStepper },
  setup() {
    return { args };
  },
  template: `
    <BccStepper v-bind="args" />
  `,
});

export const Example = Template.bind({});
Example.args = {
  currentStep: 0,
  steps: [
    "First page name",
    "Second page name",
    "Third page name",
    "Fourth page name",
    "Fifth page name",
    "Sixth page name",
    "Seventh page name",
    "Eighth page name",
    "Ninth page name",
    "Tenth page name",
  ],
  additionalText: true,
};
