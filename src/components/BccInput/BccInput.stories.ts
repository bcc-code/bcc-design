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
    showOptionalLabel: {
      description: "Will only take effect when `required` is `false`",
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
Example.args = {
  state: "default",
  disabled: false,
  required: false,
  placeholder: "Example placeholder",
  slotDefault: "",
  label: "Example label",
  showOptionalLabel: false,
  optionalLabel: "Optional",
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

export const WithLabel: StoryFn<typeof BccInput> = () => ({
  components: { BccInput },
  template: `
    <div class="flex flex-col space-y-4">
      <BccInput label="Example Label" placeholder="Example placeholder" />
      <BccInput label="Example Label that is really long but should still display" placeholder="Example placeholder" class="w-1/4" />
    </div>
  `,
});

export const Optional: StoryFn<typeof BccInput> = () => ({
  components: { BccInput },
  template: `
    <div class="flex flex-col space-y-4">
      <BccInput :showOptionalLabel="true" label="Default" placeholder="With label and optional" :required="false" class="w-1/2" />
      <BccInput :showOptionalLabel="true" placeholder="Without label" :required="false" class="w-1/2" />
      <BccInput :showOptionalLabel="true" label="Label" optionalLabel="Optional label that is pretty long and should truncate" placeholder="Long optional label" :required="false" class="w-1/4" />
      <BccInput :showOptionalLabel="true" label="Pretty long label as well" optionalLabel="Optional label that is pretty long and should truncate" placeholder="Long label and optional label" :required="false" class="w-1/4" />
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

/**
 * Wrap the input in an element with `data-context="alternative"` to render an alternative input on a dark background
 */
export const AlternativeContext: StoryFn<typeof BccInput> = () => ({
  components: { BccInput },
  template: `
    <div class="bg-primary p-4 rounded inline-flex flex-col space-y-4" data-context="alternative">
      <BccInput value="Default" placeholder="Example placeholder">This is an example message with <strong>styling</strong>.</BccInput>
      <BccInput value="Disabled" placeholder="Example placeholder" disabled>This is an example message with <strong>styling</strong>.</BccInput>
    </div>
  `,
});
