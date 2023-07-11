import BccCookieBanner from "./BccCookieBanner.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

/**
 * A cookie banner with an accept and decline button. Emits `decline` and `accept` events when the buttons are clicked.
 */
export default {
  title: "Components/BccCookieBanner",
  component: BccCookieBanner,
  argTypes: {
    showOverlay: {
      description:
        "Controls whether to overlay a dark background and show the component at the bottom of the screen. Doesn't work well in Storybook",
    },
  },
} as Meta<typeof BccCookieBanner>;

const Template: StoryFn<typeof BccCookieBanner> = (args) => ({
  components: { BccCookieBanner },
  setup() {
    return { args };
  },
  template: `
    <div class="bg-secondary p-4">
      <BccCookieBanner v-bind="args">
        We would like to evaluate your usage of this app in order to improve your experience. Read
        more in our <a href="https://event.bcc.no/personvernerklaering/" target="_blank">privacy policy</a>.
      </BccCookieBanner>
    </div>
  `,
});

export const Example = Template.bind({});
Example.args = {
  open: true,
  showOverlay: false,
  declineButtonText: "Decline",
  acceptButtonText: "Accept",
};
