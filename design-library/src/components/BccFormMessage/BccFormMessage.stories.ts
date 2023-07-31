import BccFormMessage from "./BccFormMessage.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

/**
 * A companion component used with for example the input to show a validation message
 */
export default {
  title: "Forms/BccFormMessage",
  component: BccFormMessage,
  argTypes: {
    state: {
      description: "Style of the message",
      options: ["default", "error", "success"],
      control: { type: "radio" },
    },
  },
} as Meta<typeof BccFormMessage>;

/**
 * Pass content to the default slot to render a message
 */
const Template: StoryFn<typeof BccFormMessage> = (args) => ({
  components: { BccFormMessage },
  setup() {
    return { args };
  },
  template: `
    <BccFormMessage v-bind="args">
      <span v-if="args.slotDefault">
        {{ args.slotDefault }}
      </span>
      <span v-else>
        <strong>Well done!</strong> This username is valid
      </span>
    </BccFormMessage>
  `,
});

export const Example = Template.bind({});
Example.args = {
  slotDefault: "",
  state: "success",
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccFormMessage state="success">
  <strong>Well done!</strong> This username is valid
</BccFormMessage>
`,
    },
  },
};

/**
 * Set the `state` prop to control how the input is rendered. Set the `disabled` prop to disable the input
 */
export const State: StoryFn<typeof BccFormMessage> = () => ({
  components: { BccFormMessage },
  template: `
    <div class="inline-flex flex-col space-y-4">
      <BccFormMessage>
        <strong>Example message</strong> to show with an input
      </BccFormMessage>
      <BccFormMessage state="error">
        <strong>Example message</strong> to show with an input
      </BccFormMessage>
      <BccFormMessage state="success">
        <strong>Example message</strong> to show with an input
      </BccFormMessage>
      
    </div>
  `,
});
