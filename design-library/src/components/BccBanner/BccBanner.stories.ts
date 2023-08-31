import {
  BccFillIcon,
  CircleNotificationsFillIcon,
  NotificationsOffFillIcon,
} from "@bcc-code/icons-vue";
import BccBanner from "./BccBanner.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccBanner",
  component: BccBanner,
  argTypes: {
    variant: {
      options: ["default", "notification"],
      control: { type: "radio" },
    },
    title: {
      description: "Title of the banner",
    },
    open: {
      description: "Show the banner",
      control: { type: "boolean" },
    },
    closeOnAction: {
      description: "Close the banner when an action is clicked",
      control: { type: "boolean" },
    },
    slotDefault: {
      name: "default slot",
      description: "The button text",
    },
  },
} as Meta<typeof BccBanner>;

const Template: StoryFn<typeof BccBanner> = (args) => ({
  components: { BccBanner },
  setup() {
    function close() {
      args.open = false;
      setTimeout(() => {
        args.open = true;
      }, 1000);
    }
    return { args, close };
  },
  template: `
    <BccBanner v-bind="args" @close="close">
      <small>SLOTTED CONTENT</small>
      <p>Welcome to the jungle. Hope you have fun!</p>
    </BccBanner>
  `,
});

export const Example = Template.bind({});
Example.args = {
  variant: "default",
  icon: BccFillIcon,
  title: "Banner title",
  open: true,
  closeOnAction: true,
  actions: [
    {
      label: "Yes",
      icon: CircleNotificationsFillIcon,
      onClick: () => {
        alert("Yes");
      },
    },
    {
      label: "No",
      icon: NotificationsOffFillIcon,
      onClick: () => {
        alert("No");
      },
    },
  ],
};
