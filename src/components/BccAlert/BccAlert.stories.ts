import BccAlert from "./BccAlert.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccAlert",
  component: BccAlert,
  argTypes: {
    context: {
      options: ["info", "success", "warning", "danger"],
      control: { type: "radio" },
    },
  },
} as Meta<typeof BccAlert>;

const Template: StoryFn<typeof BccAlert> = (args) => ({
  components: { BccAlert },
  setup() {
    return { args };
  },
  template: `
    <BccAlert v-bind="args">
      {{ args.slotDefault }}
    </BccAlert>
  `,
});

export const Example = Template.bind({});
Example.args = {
  context: "success",
  icon: true,
  slotDefault: "Successfully uploaded",
  title: "Well done!",
};

/**
 * Set the `context` prop to adjust the color of the alert. Pass content to the `default` slot to display text.
 */
export const Basic: StoryFn<typeof BccAlert> = () => ({
  components: { BccAlert },
  template: `
    <div class="flex flex-col space-y-4">
      <BccAlert><strong>Oh snap!</strong> You might want to check this out!</BccAlert>
      <BccAlert context="success"><strong>Oh snap!</strong> You might want to check this out!</BccAlert>
      <BccAlert context="warning"><strong>Oh snap!</strong> You might want to check this out!</BccAlert>
      <BccAlert context="danger"><strong>Oh snap!</strong> You might want to check this out!</BccAlert>
    </div>
  `,
});

/**
 * Set the `icon` prop to render an icon determined by the `context`
 */
export const WithIcon: StoryFn<typeof BccAlert> = () => ({
  components: { BccAlert },
  template: `
    <div class="flex flex-col space-y-4">
      <BccAlert icon><strong>Oh snap!</strong> You might want to check this out!</BccAlert>
      <BccAlert icon context="success"><strong>Oh snap!</strong> You might want to check this out!</BccAlert>
      <BccAlert icon context="warning"><strong>Oh snap!</strong> You might want to check this out!</BccAlert>
      <BccAlert icon context="danger"><strong>Oh snap!</strong> You might want to check this out!</BccAlert>
    </div>
  `,
});

/**
 * Set the `title` prop to render a title above the context, optionally next to the icon
 */
export const WithTitle: StoryFn<typeof BccAlert> = () => ({
  components: { BccAlert },
  template: `
    <div class="flex flex-col space-y-4">
      <BccAlert title="Well done!" icon>You might want to check this out!</BccAlert>
      <BccAlert title="Well done!" icon context="success">You might want to check this out!</BccAlert>
      <BccAlert title="Well done!" icon context="warning">You might want to check this out!</BccAlert>
      <BccAlert title="Well done!" icon context="danger">You might want to check this out!</BccAlert>
    </div>
  `,
});
