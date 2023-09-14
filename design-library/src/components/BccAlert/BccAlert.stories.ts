import BccButton from "../BccButton/BccButton.vue";
import BccAlert from "./BccAlert.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import { Face2Icon } from "@bcc-code/icons-vue";

export default {
  title: "Components/BccAlert",
  component: BccAlert,
  argTypes: {
    context: {
      options: ["info", "success", "warning", "danger", "neutral"],
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
    <BccAlert v-bind="args" @close="args.open = false">
      {{ args.slotDefault }}
    </BccAlert>

    <BccButton variant="secondary" @click="args.open = true" v-if="!args.open">
      Show alert
    </BccButton>
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
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccAlert
  title="Well done!"
  icon
  closeButton
  context="success"
  :open="showSuccessAlert"
  @close="showSuccessAlert = false"
>
  Successfully uploaded
</BccAlert>
    `,
    },
  },
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
      <BccAlert context="neutral"><strong>Oh snap!</strong> You might want to check this out!</BccAlert>
    </div>
  `,
});

/**
 * Set the `icon` prop to render an icon determined by the `context`. Passing a component as a prop `:icon="FaceIcon"` will override the default icon.
 */
export const WithIcon: StoryFn<typeof BccAlert> = (args) => ({
  components: { BccAlert },
  setup() {
    return { args, Face2Icon };
  },
  template: `
    <div class="flex flex-col space-y-4">
      <BccAlert icon><strong>Oh snap!</strong> You might want to check this out!</BccAlert>
      <BccAlert icon context="success"><strong>Oh snap!</strong> You might want to check this out! Or maybe just let it be</BccAlert>
      <BccAlert icon context="warning"><strong>Oh snap!</strong> You might want to check this out!</BccAlert>
      <BccAlert icon context="danger"><strong>Oh snap!</strong> You might want to check this out!</BccAlert>
      <BccAlert icon context="neutral"><strong>Oh snap!</strong> You might want to check this out!</BccAlert>
      <BccAlert :icon="Face2Icon" context="neutral">Look at this custom icon I added!</BccAlert>
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
      <BccAlert title="Well done!" icon context="neutral">You might want to check this out!</BccAlert>
    </div>
  `,
});

/**
 * Set the `closeButton` prop to render a close button. Clicking this will emit a `close` event, which you can use to change the `open` prop to `false` to hide the alert.
 */
export const WithCloseButton: StoryFn<typeof BccAlert> = () => ({
  components: { BccAlert },
  template: `
    <div class="flex flex-col space-y-4">
      <BccAlert closeButton icon><strong>Aww yeah</strong>, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</BccAlert>
      <BccAlert closeButton icon>You might want to check this out!</BccAlert>
      <BccAlert closeButton title="Well done!">You might want to check this out!</BccAlert>
      <BccAlert closeButton title="Well done!" icon>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</BccAlert>
    </div>
  `,
});
