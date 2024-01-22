import BccGraphic from "./BccGraphic.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccGraphic",
  component: BccGraphic,
  argTypes: {
    rounding: { options: ["md", "xl"], control: { type: "radio" } },
  },
} as Meta<typeof BccGraphic>;

const Template: StoryFn<typeof BccGraphic> = (args) => ({
  components: { BccGraphic },
  setup() {
    return {
      args,
      defaults: {
        bannerSrc: "https://event.bcc.no/wp-content/uploads/2023/10/Background-7.png",
        logoSrc: "https://event.bcc.no/wp-content/uploads/2023/11/BUK4_Logo-Main.svg",
      },
    };
  },
  template: `
    <div class="flex flex-col gap-y-2">
      <BccGraphic v-bind="{...defaults, ...args}" />
      <BccGraphic v-bind="{...defaults, linkOut: true, ...args}"/>
      <BccGraphic v-bind="{...defaults, checked: true, ...args}"/>
      <BccGraphic v-bind="{ ...args}"/>
      <BccGraphic />
    </div>
  `,
});

export const Example = Template.bind({});
