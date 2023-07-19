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
  },
} as Meta<typeof BccSelect>;

const Template: StoryFn<typeof BccSelect> = (args) => ({
  components: { BccSelect },
  setup() {
    return { args };
  },
  template: `
    <BccSelect v-bind="args" class="w-1/4">
      <option>Option 1</option>
      <option>Option 2</option>
    </BccSelect>
  `,
});

/**
 * Use `v-model` to control the value of the select. Pass normal HTML `option` elements to the default slot to render the options.
 */
export const Example = Template.bind({});
Example.args = {
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
  <option>Option 1</option>
  <option>Option 2</option>
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
      <BccSelect class="w-1/4">
        <option>Default</option>
        <option>Option 2</option>
      </BccSelect>
      <BccSelect state="error" class="w-1/4">
        <option>Error</option>
        <option>Option 2</option>
      </BccSelect>
      <BccSelect state="success" class="w-1/4">
        <option>Success</option>
        <option>Option 2</option>
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
      <BccSelect size="sm" class="w-1/4">
        <option>sm select</option>
        <option>Option 2</option>
      </BccSelect>
      <BccSelect size="base" class="w-1/4">
        <option>base select</option>
        <option>Option 2</option>
      </BccSelect>
      <BccSelect size="lg" class="w-1/4">
        <option>lg select</option>
        <option>Option 2</option>
      </BccSelect>
    </div>
  `,
});

/**
 * The input can have a `label`. A unique id is automatically generated for the input, which the label uses in its `for` attribute
 */
export const WithLabel: StoryFn<typeof BccSelect> = () => ({
  components: { BccSelect },
  template: `
    <div class="flex flex-col space-y-4">
      <BccSelect label="Example Label" size="base">
        <option>base select</option>
        <option>Option 2</option>
      </BccSelect>
      <BccSelect label="Example Label that is really long but should still display"  class="w-1/4">
        <option>base select</option>
        <option>Option 2</option>
      </BccSelect>
    </div>
  `,
});

/**
 * Set the `show-optional-label` prop to show a label when the input is not `required`. Control the text for this label with the `optionalLabel` prop, which can be useful for translation.
 */
export const Optional: StoryFn<typeof BccSelect> = () => ({
  components: { BccSelect },
  template: `
    <div class="flex flex-col space-y-4">
      <BccSelect show-optional-label label="Example Label" class="w-1/4">
        <option>With label and optional</option>
        <option>Option 2</option>
      </BccSelect>

      <BccSelect show-optional-label label="Example Label" optionalLabel="Optional label that is pretty long and should truncate" class="w-1/4">
        <option>Long optional label</option>
        <option>Option 2</option>
      </BccSelect>

      <BccSelect show-optional-label optionalLabel="Optional label that is pretty long and should truncate" class="w-1/4">
        <option>Without label</option>
        <option>Option 2</option>
      </BccSelect>

      <BccSelect show-optional-label label="Pretty long label as well" optionalLabel="Optional label that is pretty long and should truncate" class="w-1/4">
        <option>Long label and optional label</option>
        <option>Option 2</option>
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
      <BccSelect class="w-1/2">
        <option>Default</option>
        <option>Option 2</option>

        <template #message>
          This is an example message with <strong>styling</strong>.
        </template>
      </BccSelect>

      <BccSelect class="w-1/2" state="success">
        <option>Success</option>
        <option>Option 2</option>

        <template #message>
          This is an example message with <strong>styling</strong>.
        </template>
      </BccSelect>

      <BccSelect class="w-1/2" state="error">
        <option>Error</option>
        <option>Option 2</option>

        <template #message>
          This is an example message with <strong>styling</strong>.
        </template>
      </BccSelect>
    </div>
  `,
});
