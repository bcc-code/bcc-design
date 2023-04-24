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
  required: true,
  placeholder: "Example placeholder",
  slotDefault: "",
  label: "Example label",
  optionalLabel: "Optional",
};

export const State: StoryFn<typeof BccInput> = () => ({
  components: { BccInput },
  template: `
    <div class="inline-flex flex-col space-y-4">
      <BccInput value="Default" placeholder="Example placeholder" required />
      <BccInput value="Default disabled" placeholder="Example placeholder" :disabled="true" required />
      <BccInput value="Error" placeholder="Example placeholder" state="error" required />
      <BccInput value="Success" placeholder="Example placeholder" state="success" required />
    </div>
  `,
});

export const WithLabel: StoryFn<typeof BccInput> = () => ({
  components: { BccInput },
  template: `
    <div class="flex flex-col space-y-4">
      <BccInput label="Example Label" placeholder="Example placeholder" required />
      <BccInput label="Example Label that is really long but should still display" placeholder="Example placeholder" required class="w-1/4" />
    </div>
  `,
});

export const Optional: StoryFn<typeof BccInput> = () => ({
  components: { BccInput },
  template: `
    <div class="flex flex-col space-y-4">
      <BccInput label="Default" placeholder="With label and optional" :required="false" class="w-1/2" />
      <BccInput placeholder="Without label" :required="false" class="w-1/2" />
      <BccInput label="Label" optionalLabel="Optional label that is pretty long and should truncate" placeholder="Long optional label" :required="false" class="w-1/4" />
      <BccInput label="Pretty long label as well" optionalLabel="Optional label that is pretty long and should truncate" placeholder="Long label and optional label" :required="false" class="w-1/4" />
    </div>
  `,
});

export const WithMessage: StoryFn<typeof BccInput> = () => ({
  components: { BccInput },
  template: `
    <div class="inline-flex flex-col space-y-4">
      <BccInput value="Default" placeholder="Example placeholder" required>This is an example message with <strong>styling</strong>.</BccInput>
      <BccInput value="Error" placeholder="Example placeholder" state="error" required>This is an example message with <strong>styling</strong>.</BccInput>
      <BccInput value="Success" placeholder="Example placeholder" state="success" required>This is an example message with <strong>styling</strong>.</BccInput>
    </div>
  `,
});
