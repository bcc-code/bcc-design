import { ref } from "vue";
import BccNpsScore from "./BccNpsScore.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Feedback/BccNpsScore",
  component: BccNpsScore,
  argTypes: {
    reverse: {
      description: "Should the bar be reversed?",
    },
    labelPosition: {
      description: "Where to place the labels",
      options: ["top", "bottom"],
      control: { type: "radio" },
    },
  },
} as Meta<typeof BccNpsScore>;

const Template: StoryFn<typeof BccNpsScore> = (args) => ({
  components: { BccNpsScore },
  setup() {
    const value = ref(0);
    return { args, value };
  },
  template: `
    <BccNpsScore v-bind="args" v-model="value" style="width: 320px" />
  `,
});

export const Example = Template.bind({});
Example.args = {};

const TemplateForLongRange: StoryFn<typeof BccNpsScore> = (args) => ({
  components: { BccNpsScore },
  setup() {
    const value = ref(0);
    return { args, value };
  },
  template: `
    <BccNpsScore v-bind="args" v-model="value" style="width: 992px" />
  `,
});

export const ExampleForLongRang = TemplateForLongRange.bind({});
ExampleForLongRang.args = {
  max: 30,
  labelPosition: "bottom",
};

const TemplateForInitialValue: StoryFn<typeof BccNpsScore> = (args) => ({
  components: { BccNpsScore },
  setup() {
    const value = ref(5);
    return { args, value };
  },
  template: `
    <BccNpsScore v-bind="args" v-model="value" style="width: 320px" />
  `,
});

export const ExampleAsDisabled = TemplateForInitialValue.bind({});
ExampleAsDisabled.args = {
  max: 10,
  disabled: true,
};
