import RadioInput from "./RadioInput.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/RadioInput",
  component: RadioInput,
  argTypes: {},
} as Meta<typeof RadioInput>;

const Template: StoryFn<typeof RadioInput> = (args) => ({
  components: { RadioInput },
  setup() {
    return { args };
  },
  template: `
    <RadioInput v-bind="args" />
  `,
});

export const Example = Template.bind({});
Example.parameters = {
  viewMode: "docs",
};
Example.args = {
  label: "Example Label",
};

export const Multiple: StoryFn<typeof RadioInput> = () => ({
  components: { RadioInput },
  template: `
    <div class="flex items-center space-x-4">
      <RadioInput label="Option One" value="yes" name="question" checked />
      <RadioInput label="Option Two" value="no" name="question" />
    </div>
  `,
});

export const WithoutLabel: StoryFn<typeof RadioInput> = () => ({
  components: { RadioInput },
  template: `
    <div class="flex items-center space-x-4">
      <RadioInput value="yes" name="without-label" checked />
      <RadioInput value="no" name="without-label" />
    </div>
  `,
});
