import BccCheckbox from "./BccCheckbox.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

/**
 * A checkbox input conforming to the design system styles
 */
export default {
  title: "Forms/BccCheckbox",
  component: BccCheckbox,
  argTypes: {},
} as Meta<typeof BccCheckbox>;

const Template: StoryFn<typeof BccCheckbox> = (args) => ({
  components: { BccCheckbox },
  setup() {
    return { args };
  },
  template: `
    <BccCheckbox v-bind="args" />
  `,
});

/**
 * Use `v-model` to set an initial boolean value for the checkbox.
 */
export const Example = Template.bind({});
Example.args = {
  label: "Example label",
  modelValue: true,
  disabled: false,
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccCheckbox label="Example label" v-model="example" />      
`,
    },
  },
};

/**
 * Set the `disabled` prop to disable changing the checkbox. Set the `indeterminate` prop to show an indeterminate state (this doesn't affect the value).
 */
export const State: StoryFn<typeof BccCheckbox> = () => ({
  components: { BccCheckbox },
  template: `
    <div class="inline-flex flex-col space-y-4">
      <BccCheckbox label="Unchecked" :modelValue="false" />
      <BccCheckbox label="Disabled unchecked" :modelValue="false" disabled />
      <BccCheckbox label="Checked" :modelValue="true" />
      <BccCheckbox label="Disabled checked" :modelValue="true" disabled />
      <BccCheckbox label="Indeterminate" :modelValue="true" indeterminate />
      <BccCheckbox label="Indeterminate disabled" :modelValue="true" indeterminate disabled />
    </div>
  `,
});

/**
 * Show how the checkbox aligns with multiline label text.
 */
export const MultilineLabel: StoryFn<typeof BccCheckbox> = () => ({
  components: { BccCheckbox },
  template: `
    <div class="inline-flex flex-col space-y-4 max-w-[50%]">
      <BccCheckbox disabled label="Checkboxes have been a fundamental part of web forms since the early days of HTML. They were included in the original HTML 2.0 specification in 1995, making them one of the oldest input elements on the web." :modelValue="true" />
      <BccCheckbox label="Some digital artists create pixel art using checkboxes. By arranging them in a grid and changing their states, they can create simple images and patterns." :modelValue="false" />
    </div>
  `,
});
