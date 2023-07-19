import BccAlert from "./BccAlert.vue";
import BccButton from "../BccButton/BccButton.vue";

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
  components: { BccAlert, BccButton },
  setup() {
    return { args };
  },
  template: `
    <BccAlert v-bind="args" v-if="args.open" @close="args.open = false">
      {{ args.slotDefault }}
    </BccAlert>

    <BccButton v-if="!args.open" variant="secondary" @click="args.open=true">Open alert</BccButton>
  `,
});

export const Example = Template.bind({});
Example.args = {
  open: true,
  context: "success",
  icon: true,
  closeButton: true,
  title: "Well done!",
  slotDefault: "Successfully uploaded",
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

/**
 * Set the `closeButton` prop to render a close button. Clicking this will emit a `close` event, which you can use to no longer render the component, for example with a `v-if`
 */
export const WithCloseButton: StoryFn<typeof BccAlert> = () => ({
  components: { BccAlert },
  template: `
    <div class="flex flex-col space-y-4">
      <BccAlert closeButton>You might want to check this out!</BccAlert>
      <BccAlert closeButton icon>You might want to check this out!</BccAlert>
      <BccAlert closeButton title="Well done!">You might want to check this out!</BccAlert>
      <BccAlert closeButton title="Well done!" icon>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</BccAlert>
    </div>
  `,
});
