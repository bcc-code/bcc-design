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
    disabled: {
      description: "Whether the range slider is disabled",
    },
    fromLeft: {
      description: "Whether the range slider starts from the left or middle",
    },
  },
} as Meta<typeof BccRange>;

const Template: StoryFn<typeof BccRange> = (args) => ({
  components: { BccRange },
  setup() {
    return { args };
  },
  template: `
    <BccRange />
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
    <BccRange disabled />
  `,
});

export const WithCustomRange: StoryFn<typeof BccRange> = () => ({
  components: { BccRange },
  template: `
    <BccRange min=0  max=100 step=2 />
  `,
});

export const StartFromMiddle: StoryFn<typeof BccRange> = () => ({
  components: { BccRange },
  template: `
    <BccRange :fromLeft=false min=0 max=10 />
  `,
});
