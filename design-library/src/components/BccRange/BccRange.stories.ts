import BccRange from "./BccRange.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Forms/BccRange",
  component: BccRange,
  argTypes: {
    modelValue: {
      description: "The current value of the range slider",
    },
    min: {
      description: "The minimum value of the range slider",
    },
    max: {
      description: "The maximum value of the range slider",
    },
    step: {
      description: "The step value of the range slider",
    },
    label: {
      description: "The main label of the range slider",
    },
    leftLabel: {
      description: "The label of the left side of the range slider",
    },
    rightLabel: {
      description: "The label of the right side of the range slider",
    },
    disabled: {
      description: "Whether the range slider is disabled",
    },
  },
} as Meta<typeof BccRange>;

const Template: StoryFn<typeof BccRange> = (args) => ({
  components: { BccRange },
  setup() {
    return { args };
  },
  template: `
    <BccRange label="Did you have the correct amount of people?" leftLabel="Less people" rightLabel="More people" />
  `,
});

export const Example = Template.bind({});
Example.args = {
  modelValue: 0,
  min: -10,
  max: 10,
  step: 1,
  label: "Range Slider",
  leftLabel: "Less people",
  rightLabel: "More people",
  disabled: false,
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
  <BccRange label="Did you have the correct amount of people?" leftLabel="Less people" rightLabel="More people" />`,
    },
  },
};

export const Disabled: StoryFn<typeof BccRange> = () => ({
  components: { BccRange },
  template: `
    <BccRange label="Did you have the correct amount of people?" leftLabel="Less people" rightLabel="More people" disabled />
  `,
});

export const WithoutSideLabels: StoryFn<typeof BccRange> = () => ({
  components: { BccRange },
  template: `
    <BccRange label="Did you have the correct amount of people?" />
  `,
});

export const WithCustomRange: StoryFn<typeof BccRange> = () => ({
  components: { BccRange },
  template: `
    <BccRange label="Did you have the correct amount of people?" leftLabel="Less people" rightLabel="More people" min=-100  max=100 step=5 />
  `,
});

export const StartFromLeft: StoryFn<typeof BccRange> = () => ({
  components: { BccRange },
  template: `
    <BccRange label="Did you have the correct amount of people?" leftLabel="Less people" rightLabel="More people" modelValue=0 min=0 max=10 />
  `,
});
