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
      description: "Whether to show the step number and title alongside the indicators.",
    },
    showStepLabel: {
      control: { type: "boolean" },
      description: "Whether to show the step label",
    },
    headingOverride: {
      description: "Override the 'Step 1 of 2' string, for example with a translated string",
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

const exampleSteps = [
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
];

export const Example = Template.bind({});
Example.args = {
  currentStep: 0,
  steps: exampleSteps,
  additionalText: true,
};

const TemplateLabels: StoryFn<typeof BccStepper> = (args) => ({
  components: { BccStepper },
  setup() {
    return { args };
  },
  template: `
  <div class="flex flex-col space-y-4">
    <BccStepper v-bind="args" headingOverride="Question 1 of 2" />
    <BccStepper v-bind="args" headingOverride="Spørsmål 1 av 2" />
    <BccStepper v-bind="args" headingOverride="Vraag 1 van de 2" />
  </div>
  `,
});
export const ExampleWithCustomLabels = TemplateLabels.bind({});
ExampleWithCustomLabels.args = {
  currentStep: 0,
  steps: exampleSteps,
  additionalText: true,
  showStepLabel: false,
};
