import BccCookieBanner from "./BccCookieBanner.vue";
import BccButton from "../BccButton/BccButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

/**
 * A cookie banner with an accept and decline button. Emits `decline` and `accept` events when the buttons are clicked.
 */
export default {
  title: "Other/BccCookieBanner",
  component: BccCookieBanner,
  argTypes: {
    showOverlay: {
      description: "Controls whether to overlay a dark background behind the cookie banner",
    },
  },
} as Meta<typeof BccCookieBanner>;

const Template: StoryFn<typeof BccCookieBanner> = (args) => ({
  components: { BccCookieBanner, BccButton },
  setup() {
    return { args };
  },
  template: `
    <BccCookieBanner v-bind="args" @decline="args.open = false" @accept="args.open = false">
      We would like to evaluate your usage of this app in order to improve your experience. Read
      more in our <a href="https://event.bcc.no/personvernerklaering/" target="_blank">privacy policy</a>.
    </BccCookieBanner>
    
    <BccButton variant="secondary" @click="args.open=true">Open cookie banner</BccButton>
  `,
});

export const Example = Template.bind({});
Example.args = {
  open: false,
  title: "We value your privacy",
  showOverlay: true,
  declineButtonText: "Decline",
  acceptButtonText: "Accept",
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccCookieBanner title="We value your privacy" :open="showCookieBanner" @decline="showCookieBanner = false" @accept="showCookieBanner = false">
  We would like to evaluate your usage of this app in order to improve your experience.
  Read more in our <a href="https://event.bcc.no/personvernerklaering/" target="_blank">privacy policy</a>.
</BccCookieBanner>
    `,
    },
  },
};
