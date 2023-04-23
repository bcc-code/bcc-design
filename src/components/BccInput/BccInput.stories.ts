import BccInput from "./BccInput.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccInput",
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
  required: false,
  placeholder: "Example placeholder",
  slotDefault: "",
  label: "Example label",
};

export const State: StoryFn<typeof BccInput> = () => ({
  components: { BccInput },
  template: `
    <div class="inline-flex flex-col space-y-4">
      <BccInput value="Default" placeholder="Example placeholder" :required="true" />
      <BccInput value="Default disabled" placeholder="Example placeholder" :disabled="true" :required="true" />
      <BccInput value="Error" placeholder="Example placeholder" state="error" :required="true" />
      <BccInput value="Success" placeholder="Example placeholder" state="success" :required="true" />
    </div>
  `,
});

export const WithMessage: StoryFn<typeof BccInput> = () => ({
  components: { BccInput },
  template: `
    <div class="inline-flex flex-col space-y-4">
      <BccInput value="Default" placeholder="Example placeholder" :required="true">This is an example message with <strong>styling</strong>.</BccInput>
      <BccInput value="Error" placeholder="Example placeholder" state="error" :required="true">This is an example message with <strong>styling</strong>.</BccInput>
      <BccInput value="Success" placeholder="Example placeholder" state="success" :required="true">This is an example message with <strong>styling</strong>.</BccInput>
    </div>
  `,
});
