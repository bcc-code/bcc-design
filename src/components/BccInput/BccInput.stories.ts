import BccInput from "./BccInput.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/Input",
  component: BccInput,
  argTypes: {
    state: {
      description: "Style of the input",
      options: ["default", "error", "success"],
      control: { type: "radio" },
    },
    placeholder: {
      description: "The HTML placeholder attribute",
    },
    slotDefault: {
      name: "default slot",
      description: "An optional message below the input",
    },
  },
} as Meta<typeof BccInput>;

const Template: StoryFn<typeof BccInput> = (args) => ({
  components: { BccInput },
  setup() {
    return { args };
  },
  template: `
    <BccInput v-bind="args" type="text" value="Example value">
      {{ args.slotDefault }}
    </BccInput>
  `,
});

export const Example = Template.bind({});
Example.parameters = {
  viewMode: "docs",
};
Example.args = {
  state: "default",
  disabled: false,
  placeholder: "Example placeholder",
  slotDefault: "",
};

export const State: StoryFn<typeof BccInput> = () => ({
  components: { BccInput },
  template: `
    <div class="inline-flex flex-col space-y-4">
      <BccInput value="Default" placeholder="Example placeholder" />
      <BccInput value="Default disabled" placeholder="Example placeholder" :disabled="true" />
      <BccInput value="Error" placeholder="Example placeholder" state="error" />
      <BccInput value="Success" placeholder="Example placeholder" state="success" />
    </div>
  `,
});

export const WithMessage: StoryFn<typeof BccInput> = () => ({
  components: { BccInput },
  template: `
    <div class="inline-flex flex-col space-y-4">
      <BccInput value="Default" placeholder="Example placeholder">This is an example message with <strong>styling</strong>.</BccInput>
      <BccInput value="Error" placeholder="Example placeholder" state="error">This is an example message with <strong>styling</strong>.</BccInput>
      <BccInput value="Success" placeholder="Example placeholder" state="success">This is an example message with <strong>styling</strong>.</BccInput>
    </div>
  `,
});
