import BccModal from "./BccModal.vue";
import BccButton from "../BccButton/BccButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccModal",
  component: BccModal,
  argTypes: {
    headingContext: {
      options: ["success"],
      control: { type: "radio" },
    },
  },
} as Meta<typeof BccModal>;

const Template: StoryFn<typeof BccModal> = (args) => ({
  components: { BccModal, BccButton },
  setup() {
    return { args };
  },
  template: `
    <BccModal v-bind="args" @close="args.open = false">
      <template #heading v-if="args.slotHeading">
        {{ args.slotHeading }}
      </template>

        <template #default>
          <span v-if="args.slotDefault">
            {{ args.slotDefault }}
          </span>
          <span v-else>
            Is your email address <strong>lida@example.org</strong>?
          </span>
        </template>

        <template #secondaryAction>
          <BccButton variant="secondary" @click="args.open = false">
            {{ args.secondaryActionText || "Cancel" }}
          </BccButton>
        </template>

        <template #primaryAction>
          <BccButton @click="args.open = false">
            {{ args.primaryActionText || "Confirm" }}
          </BccButton>
        </template>
    </BccModal>

    <BccButton variant="secondary" @click="args.open=true">Open modal</BccButton>
  `,
});

/**
 * Control the content of the modal with the `title` prop and the `default` slot. Pass buttons to the `primaryAction` and `secondaryAction` slots. Set `showClose` to `false` to hide the close button on desktops. The modal emits a `close` event when the user clicks the close button or closes the modal by clicking outside of it or pressing Escape.
 */
export const Example = Template.bind({});
Example.args = {
  open: false,
  showClose: true,
  title: "Confirm email address",
  headingContext: "success",
  slotDefault: "",
  slotHeading: "",
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccModal title="Confirm email address" :open="showModal" @close="showModal = false">
  <template #default>
    Is your email address <strong>lida@example.org</strong>?
  </template>

  <template #secondaryAction>
    <BccButton variant="secondary" @click="showModal = false">Cancel</BccButton>
  </template>

  <template #primaryAction>
    <BccButton>Confirm</BccButton>
  </template>
</BccModal>
    `,
    },
  },
};

/**
 * Display an extra heading above the normal modal content. Set the `headingTitle` and `headingContext` props to control the title of the heading. Set the `heading` slot for the content of this heading. The close button is automatically hidden.
 */
export const WithExtraHeading = Template.bind({});
WithExtraHeading.args = {
  open: false,
  showClose: true,
  title: "Join the activity chat group",
  headingContext: "success",
  slotDefault: "You can join the activity chat by clicking the link below",
  headingTitle: "Success",
  slotHeading:
    "You successfully registered to activity. Don't forget to register for activities for Day 2 & Day 3",
  primaryActionText: "Open Telegram chat",
  secondaryActionText: "Close",
};
WithExtraHeading.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccModal
  title="Join the activity chat group"
  headingTitle="Success!"
  headingContext="success"
  :open="showModal"
  @close="showModal = false"
>
  <template #heading>
    You successfully registered to activity. Don't forget to register for activities for Day 2 & Day 3
  </template>

  <template #default>
    You can join the activity chat by clicking the link below
  </template>

  <template #secondaryAction>
    <BccButton variant="secondary" @click="showModal = false">Cancel</BccButton>
  </template>

  <template #primaryAction>
    <BccButton>Confirm</BccButton>
  </template>
</BccModal>
    `,
    },
  },
};
