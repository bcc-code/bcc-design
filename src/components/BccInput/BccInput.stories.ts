import BccInput from "./BccInput.vue";
import { SearchIcon } from "@bcc-code/icons-vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Forms/BccInput",
  component: BccInput,
  argTypes: {
    size: {
      options: ["sm", "base", "lg"],
      control: { type: "radio" },
    },
    clearable: {
      description: "Whether to display an icon button to clear the input",
    },
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
    value: {
      description: "For testing purposes in Storybook, use `v-model` normally",
    },
  },
} as Meta<typeof BccInput>;

const Template: StoryFn<typeof BccInput> = (args) => ({
  components: { BccInput },
  setup() {
    return { args, SearchIcon };
  },
  template: `
    <BccInput v-bind="args" type="text" v-model="args.value" :icon="SearchIcon" @clear="args.value = ''" class="w-1/4">
      {{ args.slotDefault }}
    </BccInput>
  `,
});

/**
 * Use `v-model` like a normal input to handle input.
 */
export const Example = Template.bind({});
Example.args = {
  state: "default",
  size: "base",
  clearable: false,
  disabled: false,
  required: false,
  placeholder: "Example placeholder",
  slotDefault: "",
  label: "Example label",
  showOptionalLabel: false,
  optionalLabel: "Optional",
  value: "Example value",
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccInput
  :icon="SearchIcon"
  label="Example label"
  placeholder="Example placeholder"
  v-model="example"
/>      
`,
    },
  },
};

/**
 * Set the `state` prop to control how the input is rendered. Set the `disabled` prop to disable the input
 */
export const State: StoryFn<typeof BccInput> = () => ({
  components: { BccInput },
  template: `
    <div class="inline-flex flex-col space-y-4">
      <BccInput value="Default" placeholder="Example placeholder" />
      <BccInput value="Default disabled" placeholder="Example placeholder" disabled />
      <BccInput value="Error" placeholder="Example placeholder" state="error" />
      <BccInput value="Error disabled" placeholder="Example placeholder" state="error" disabled />
      <BccInput value="Success" placeholder="Example placeholder" state="success" />
      <BccInput value="Success disabled" placeholder="Example placeholder" state="success" disabled />
    </div>
  `,
});

/**
 * Set the `size` prop to control the size of the input
 */
export const Size: StoryFn<typeof BccInput> = () => ({
  components: { BccInput },
  setup() {
    return { SearchIcon };
  },
  template: `
    <div class="inline-flex flex-col space-y-4">
      <BccInput size="sm" value="sm" placeholder="Example placeholder" />
      <BccInput size="sm" value="sm" placeholder="Example placeholder" :icon="SearchIcon" disabled />
      <BccInput value="base" placeholder="Example placeholder" />
      <BccInput value="base" placeholder="Example placeholder" :icon="SearchIcon" disabled />
      <BccInput size="lg" value="lg" placeholder="Example placeholder" />
      <BccInput size="lg" value="lg" placeholder="Example placeholder" :icon="SearchIcon" disabled />
    </div>
  `,
});

/**
 * The input can be wrapped in a `label`
 */
export const WithLabel: StoryFn<typeof BccInput> = () => ({
  components: { BccInput },
  template: `
    <div class="flex flex-col space-y-4">
      <BccInput label="Example Label" placeholder="Example placeholder" />
      <BccInput label="Example Label that is really long but should still display" placeholder="Example placeholder" class="w-1/4" />
    </div>
  `,
});

/**
 * Set the `icon` prop to add an icon inside the input
 */
export const WithIcon: StoryFn<typeof BccInput> = () => ({
  components: { BccInput },
  setup() {
    return { SearchIcon };
  },
  template: `
    <div class="flex flex-col space-y-4">
      <BccInput label="base input with icon" placeholder="Example placeholder" :icon="SearchIcon" class="w-1/4" />
      <BccInput label="lg input with icon" placeholder="Example placeholder" :icon="SearchIcon" class="w-1/4" size="lg" />
      <BccInput label="disabled input with icon" placeholder="Example placeholder" :icon="SearchIcon" class="w-1/4" disabled />
    </div>
  `,
});

/**
 * Set the `clearable` prop to render an icon button on the right to clear the input when there is a value. Will emit both the normal `update:modelValue` event (automatically handled with `v-model`) and a `clear` event if you need to do extra logic when someone clicks the button.
 */
export const Clearable = Template.bind({});
Clearable.args = {
  state: "default",
  size: "base",
  clearable: true,
  disabled: false,
  required: false,
  placeholder: "Find a city...",
  slotDefault: "",
  label: "Search",
  showOptionalLabel: false,
  optionalLabel: "Optional",
  value: "Krakow",
};
Clearable.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccInput
  :icon="SearchIcon"
  label="Search"
  placeholder="Find something..."
  clearable
  v-model="search"
/>
`,
    },
  },
};

/**
 * Set the `show-optional-label` prop to show a label when the input is not `required`. Control the text for this label with the `optionalLabel` prop, which can be useful for translation.
 */
export const Optional: StoryFn<typeof BccInput> = () => ({
  components: { BccInput },
  template: `
    <div class="flex flex-col space-y-4">
      <BccInput show-optional-label label="Default" placeholder="With label and optional" :required="false" class="w-1/2" />
      <BccInput show-optional-label placeholder="Without label" :required="false" class="w-1/2" />
      <BccInput show-optional-label label="Label" optionalLabel="Optional label that is pretty long and should truncate" placeholder="Long optional label" :required="false" class="w-1/4" />
      <BccInput show-optional-label label="Pretty long label as well" optionalLabel="Optional label that is pretty long and should truncate" placeholder="Long label and optional label" :required="false" class="w-1/4" />
    </div>
  `,
});

/**
 * Pass text to the default slot for the component to render a message below the input. The styling takes the `state` into account.
 */
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
