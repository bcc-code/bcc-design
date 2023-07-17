import BccRadio from "./BccRadio.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

/**
 * A radio input conforming to the design system styles
 */
export default {
  title: "Components/BccRadio",
  component: BccRadio,
  argTypes: {},
} as Meta<typeof BccRadio>;

const Template: StoryFn<typeof BccRadio> = (args) => ({
  components: { BccRadio },
  setup() {
    return { args };
  },
  template: `
    <BccRadio label="Option 1" name="question" value="yes" v-bind="args" />
  `,
});

/**
 * Use `v-model` to handle the value for the input.
 */
export const Example = Template.bind({});
Example.args = {
  label: "Example label",
  modelValue: "example",
  disabled: false,
  checked: false,
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccRadio label="Example label" v-model="example" />      
`,
    },
  },
};

/**
 * Set the `disabled` prop to disable changing the radio input
 */
export const State: StoryFn<typeof BccRadio> = () => ({
  components: { BccRadio },
  template: `
    <div class="inline-flex flex-col space-y-4">
      <BccRadio label="Unchecked" :modelValue="false" />
      <BccRadio label="Checked" checked />
      <BccRadio label="Disabled unchecked" :modelValue="false" disabled />
      <BccRadio label="Disabled checked" checked disabled />
    </div>
  `,
});
