import BccRadio from "./BccRadio.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

/**
 * A radio input conforming to the design system styles
 */
export default {
  title: "Forms/BccRadio",
  component: BccRadio,
  argTypes: {
    modelValue: {
      description: "Used within `v-model` for the currently selected value",
    },
    value: {
      description: "The value of this specific radio input",
    },
  },
} as Meta<typeof BccRadio>;

const Template: StoryFn<typeof BccRadio> = (args) => ({
  components: { BccRadio },
  setup() {
    return { args };
  },
  template: `
    <BccRadio label="Option 1" value="yes" v-model="args.modelValue" v-bind="args" />
    <BccRadio label="Option 2" value="no" v-model="args.modelValue" v-bind="args" />  `,
});

/**
 * Use `v-model` to handle the value for the input.
 */
export const Example = Template.bind({});
Example.args = {
  modelValue: "yes",
  disabled: false,
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccRadio label="Option 1" value="yes" v-model="example" />      
<BccRadio label="Option 2" value="no" v-model="example" />      
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
      <BccRadio label="Unchecked" value="yes" modelValue="" />
      <BccRadio label="Checked" value="yes" modelValue="yes" />
      <BccRadio label="Disabled unchecked" value="yes" modelValue="" disabled />
      <BccRadio label="Disabled checked" value="yes" modelValue="yes" disabled />
    </div>
  `,
});
