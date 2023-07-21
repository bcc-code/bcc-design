import BccSelect from "./BccSelect.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

/**
 * A `select` element supporting most of the props of the Input component
 */
export default {
  title: "Forms/BccSelect",
  component: BccSelect,
  argTypes: {
    size: {
      options: ["sm", "base", "lg"],
      control: { type: "radio" },
    },
    state: {
      description: "Style of the select",
      options: ["default", "error", "success"],
      control: { type: "radio" },
    },
    showOptionalLabel: {
      description: "Will only take effect when `required` is `false`",
    },
  },
} as Meta<typeof BccSelect>;

const Template: StoryFn<typeof BccSelect> = (args) => ({
  components: { BccSelect },
  setup() {
    return { args };
  },
  template: `
    <BccSelect v-bind="args" class="w-1/4">
      <option disabled value="">Select an option...</option>
      <option value="one">Option 1</option>
      <option value="two">Option 2</option>
    </BccSelect>
  `,
});

/**
 * Use `v-model` to control the value of the select. Pass normal HTML `option` elements to the default slot to render the options (be sure to include `value` attributes on each option).
 */
export const Example = Template.bind({});
Example.args = {
  modelValue: "one",
  label: "Example label",
  state: "default",
  size: "base",
  disabled: false,
  required: false,
  showOptionalLabel: false,
  optionalLabel: "Optional",
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccSelect
  label="Example label"
  v-model="example"
>
  <option disabled value="">Select an option...</option>
  <option value="one">Option 1</option>
  <option value="two">Option 2</option>
</BccSelect>
`,
    },
  },
};

/**
 * Set the `state` prop to control how the select is rendered. Set the `disabled` prop to disable the select
 */
export const State: StoryFn<typeof BccSelect> = () => ({
  components: { BccSelect },
  template: `
    <div class="flex flex-col space-y-4">
      <BccSelect class="w-1/4" value="default">
        <option value="default">Default</option>
        <option value="two">Option 2</option>
      </BccSelect>
      <BccSelect class="w-1/4" value="default" disabled>
        <option value="default">Default disabled</option>
        <option value="two">Option 2</option>
      </BccSelect>
      <BccSelect state="error" class="w-1/4" value="default">
        <option value="default">Error</option>
        <option value="two">Option 2</option>
      </BccSelect>
      <BccSelect state="error" class="w-1/4" value="default" disabled>
        <option value="default">Error disabled</option>
        <option value="two">Option 2</option>
      </BccSelect>
      <BccSelect state="success" class="w-1/4" value="default">
        <option value="default">Success</option>
        <option value="two">Option 2</option>
      </BccSelect>
      <BccSelect state="success" class="w-1/4" value="default" disabled>
        <option value="default">Success disabled</option>
        <option value="two">Option 2</option>
      </BccSelect>
    </div>
  `,
});

/**
 * Like a normal select element, don't set the value and create an `option` with `disabled` and an empty value to have a default placeholder text.
 */
export const Placeholder: StoryFn<typeof BccSelect> = () => ({
  components: { BccSelect },
  template: `
    <div class="flex flex-col space-y-4">
      <BccSelect class="w-1/4" value="">
        <option disabled value="">Select an option...</option>
        <option value="one">Success</option>
        <option value="two">Option 2</option>
      </BccSelect>
    </div>
  `,
});

/**
 * Set the `size` prop to control the size of the select
 */
export const Size: StoryFn<typeof BccSelect> = () => ({
  components: { BccSelect },
  template: `
    <div class="flex flex-col space-y-4">
      <BccSelect label="label for sm select" size="sm" class="w-1/4" value="default">
        <option value="default">sm select</option>
        <option value="two">Option 2</option>
      </BccSelect>
      <BccSelect label="label for base select" size="base" class="w-1/4" value="default">
        <option value="default">base select</option>
        <option value="two">Option 2</option>
      </BccSelect>
      <BccSelect label="label for lg select" size="lg" class="w-1/4" value="default">
        <option value="default">lg select</option>
        <option value="two">Option 2</option>
      </BccSelect>
    </div>
  `,
});

/**
 * The select can have a `label`. A unique id is automatically generated for the select, which the label uses in its `for` attribute
 */
export const WithLabel: StoryFn<typeof BccSelect> = () => ({
  components: { BccSelect },
  template: `
    <div class="flex flex-col space-y-4">
      <BccSelect label="Example Label" size="base" value="default">
        <option value="default">base select</option>
        <option value="two">Option 2</option>
      </BccSelect>
      <BccSelect label="Example Label that is really long but should still display"  class="w-1/4" value="default">
        <option value="default">base select</option>
        <option value="two">Option 2</option>
      </BccSelect>
    </div>
  `,
});

/**
 * Set the `show-optional-label` prop to show a label when the select is not `required`. Control the text for this label with the `optionalLabel` prop, which can be useful for translation.
 */
export const Optional: StoryFn<typeof BccSelect> = () => ({
  components: { BccSelect },
  template: `
    <div class="flex flex-col space-y-4">
      <BccSelect show-optional-label label="Example Label" class="w-1/4" value="default">
        <option value="default">With label and optional</option>
        <option value="two">Option 2</option>
      </BccSelect>

      <BccSelect show-optional-label label="Example Label" optionalLabel="Optional label that is pretty long and should truncate" class="w-1/4" value="default">
        <option value="default">Long optional label</option>
        <option value="two">Option 2</option>
      </BccSelect>

      <BccSelect show-optional-label optionalLabel="Optional label that is pretty long and should truncate" class="w-1/4" value="default">
        <option value="default">Without label</option>
        <option value="two">Option 2</option>
      </BccSelect>

      <BccSelect show-optional-label label="Pretty long label as well" optionalLabel="Optional label that is pretty long and should truncate" class="w-1/4" value="default">
        <option value="default">Long label and optional label</option>
        <option value="two">Option 2</option>
      </BccSelect>
    </div>
  `,
});

/**
 * Pass text to the `message` slot for the component to render a message below the select. The styling takes the `state` into account.
 */
export const WithMessage: StoryFn<typeof BccSelect> = () => ({
  components: { BccSelect },
  template: `
    <div class="flex flex-col space-y-4">
      <BccSelect class="w-1/2" value="default">
        <option value="default">Default</option>
        <option value="two">Option 2</option>

        <template #message>
          This is an example message with <strong>styling</strong>.
        </template>
      </BccSelect>

      <BccSelect class="w-1/2" state="success" value="default">
        <option value="default">Success</option>
        <option value="two">Option 2</option>

        <template #message>
          This is an example message with <strong>styling</strong>.
        </template>
      </BccSelect>

      <BccSelect class="w-1/2" state="error" value="default">
        <option value="default">Error</option>
        <option value="two">Option 2</option>

        <template #message>
          This is an example message with <strong>styling</strong>.
        </template>
      </BccSelect>
    </div>
  `,
});
