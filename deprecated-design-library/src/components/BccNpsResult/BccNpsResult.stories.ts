import { ref } from "vue";
import BccNpsResult from "./BccNpsResult.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Feedback/BccNpsResult",
  component: BccNpsResult,
  argTypes: {
    size: {
      description: "Size of the NPS Result gauge",
      options: ["lg", "md", "sm", "xs"],
      control: { type: "radio" },
    },
  },
} as Meta<typeof BccNpsResult>;

const Template: StoryFn<typeof BccNpsResult> = (args) => ({
  components: { BccNpsResult },
  setup() {
    const value = ref(0);
    return { args, value };
  },
  template: `
    <BccNpsResult style="width: 180px;" v-bind="args" />
  `,
});

export const Example = Template.bind({});
Example.args = { score: 30, underline: "NPS Score" };

const TemplateAllSizes: StoryFn<typeof BccNpsResult> = (args) => ({
  components: { BccNpsResult },
  setup() {
    const value = ref(0);
    return { args, value };
  },
  template: `
  <div class="flex justify-between items-center">
    <BccNpsResult style="width: 40px;" size="xs" underline="Xs" :score="100" />
    <BccNpsResult style="width: 110px;" size="sm" underline="Sm" :score="100" />
    <BccNpsResult style="width: 180px;" size="md" underline="Md" :score="100" />
    <BccNpsResult style="width: 250px;" size="lg" underline="Lg" :score="100" />
  </div>
  `,
});

export const ExampleSizes = TemplateAllSizes.bind({});

const TemplateWithCustomText: StoryFn<typeof BccNpsResult> = (args) => ({
  components: { BccNpsResult },
  setup() {
    const value = ref(0);
    return { args, value };
  },
  template: `
    <BccNpsResult style="width: 180px;" v-bind="args" />
  `,
});

export const ExampleWithCustomText = TemplateWithCustomText.bind({});
ExampleWithCustomText.args = {
  score: 30,
  underline: "The score is good",
  display: "Good!",
};
