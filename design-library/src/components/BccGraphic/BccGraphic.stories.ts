import BccGraphic from "./BccGraphic.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccGraphic",
  component: BccGraphic,
  argTypes: {
    rounding: {
      options: ["md", "xl"],
      control: { type: "radio" },
    },
  },
} as Meta<typeof BccGraphic>;

const Template: StoryFn<typeof BccGraphic> = (args) => ({
  components: { BccGraphic },
  setup() {
    return { args };
  },
  template: `
    <div class="flex flex-col gap-y-2">
      <BccGraphic v-bind="args" />
    </div>
  `,
});

export const Example = Template.bind({});
Example.args = {
  bannerSrc: "https://event.bcc.no/wp-content/uploads/2023/10/Background-7.png",
  logoSrc: "https://event.bcc.no/wp-content/uploads/2023/11/BUK4_Logo-Main.svg",
  rounding: "xl",
  checked: false,
  linkOut: false,
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccGraphic bannerSrc="https://event.bcc.no/..." logoSrc="https://event.bcc.no/..." />
    `,
    },
  },
};

/**
 * A `bannerSrc` or `logoSrc` is not needed, by default this will just display a brand background. Combine with other props to create a more interesting look.
 */
export const Default: StoryFn<typeof BccGraphic> = () => ({
  components: { BccGraphic },
  template: `
    <BccGraphic />
  `,
});

/**
 * Display an icon to indicate there is a link on the graphic by setting the `linkOut` prop. Add an `@click` handler to handle the link.
 */
export const WithLinkOut: StoryFn<typeof BccGraphic> = () => ({
  components: { BccGraphic },
  template: `
    <BccGraphic linkOut />
  `,
});

/**
 * Set the `checked` prop to indicate a checked state on the banner.
 */
export const Checked: StoryFn<typeof BccGraphic> = () => ({
  components: { BccGraphic },
  template: `
    <BccGraphic checked />
  `,
});
