import BccRange from "./BccRange.vue";
import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Forms/BccRange",
  component: BccRange,
  argTypes: {
    modelValue: {
      control: { type: "number" },
      description: "The current value of the range slider",
    },
    min: {
      control: { type: "number" },
      description: "The minimum value of the range slider",
    },
    max: {
      control: { type: "number" },
      description: "The maximum value of the range slider",
    },
    step: {
      control: { type: "number" },
      description: "The step value of the range slider",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the range slider is disabled",
    },
    hideValue: {
      control: { type: "boolean" },
      description: "Whether to hide the value of the range slider",
    },
  },
} as Meta<typeof BccRange>;

const Template: StoryFn<typeof BccRange> = (args) => ({
  components: { BccRange },
  setup() {
    return { args };
  },
  template: `
    <BccRange v-bind="args" class="mt-12"/>
  `,
});

export const Example = Template.bind({});
Example.args = {
  modelValue: 0,
  min: -10,
  max: 10,
  step: 1,
  disabled: false,
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
    <BccRange />`,
    },
  },
};

export const Disabled: StoryFn<typeof BccRange> = () => ({
  components: { BccRange },
  template: `
    <BccRange disabled class="mt-12" />
  `,
});

export const WithCustomRange: StoryFn<typeof BccRange> = () => ({
  components: { BccRange },
  template: `
    <BccRange min=0 max=100 step=2 class="mt-12" />
  `,
});

export const StartFromMiddle: StoryFn<typeof BccRange> = () => ({
  components: { BccRange },
  template: `
    <BccRange class="mt-12" />
  `,
});
