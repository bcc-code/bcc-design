import BccFormLabel from "./BccFormLabel.vue";
import BccInput from "../BccInput/BccInput.vue";
import BccRadio from "../BccRadio/BccRadio.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

/**
 * A wrapper for the `label` element, used in the different form components but can also be used standalone, for example for radio groups. Supports the "optional" label as well.
 */
export default {
  title: "Forms/BccFormLabel",
  component: BccFormLabel,
  argTypes: {
    for: {
      description: "The normal HTML `for` attribute for the label",
    },
  },
} as Meta<typeof BccFormLabel>;

const Template: StoryFn<typeof BccFormLabel> = (args) => ({
  components: { BccFormLabel },
  setup() {
    return { args };
  },
  template: `
    <BccFormLabel v-bind="args" class="w-1/2">
      {{ args.slotDefault }}
    </BccFormLabel>
  `,
});

/**
 * Pass text to the default slot to render a `label` element. Optionally pass the `for` prop to set that attribute on the label
 */
export const Example = Template.bind({});
Example.args = {
  slotDefault: "Example label",
  for: "",
  showOptionalLabel: false,
  optionalLabel: "Optional",
};

/**
 * Set the `show-optional-label` prop to show an extra label marking the field optional. Control the text for this label with the `optionalLabel` prop, which can be useful for translation.
 */
export const OptionalLabel: StoryFn<typeof BccFormLabel> = () => ({
  components: { BccFormLabel, BccInput },
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
 * Use this label standalone with for example a radio group
 */
export const RadioGroup: StoryFn<typeof BccFormLabel> = () => ({
  components: { BccFormLabel, BccRadio },
  template: `
    <div class="flex flex-col space-y-2">
      <BccFormLabel>Radio group label</BccFormLabel>
      <BccRadio name="test" label="Option 1" checked />
      <BccRadio name="test" label="Option 2" />
    </div>
  `,
});
