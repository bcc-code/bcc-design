import BccModal from "./BccModal.vue";
import BccButton from "../BccButton/BccButton.vue";
import { CheckCircleFillIcon } from "@bcc-code/icons-vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccModal",
  component: BccModal,
  argTypes: {
    showCloseButton: {
      description: "Whether to show a close button on desktops. Always hidden on mobile.",
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
 * Control the content of the modal with the `title` prop and the `default` slot. Pass buttons to the `primaryAction` and `secondaryAction` slots. Set `showCloseButton` to `false` to hide the close button on desktops. The modal emits a `close` event when the user clicks the close button or closes the modal by clicking outside of it or pressing Escape.
 */
export const Example = Template.bind({});
Example.args = {
  open: false,
  title: "Confirm email address",
  showCloseButton: true,
  slotDefault: "",
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
    <BccButton @click="showModal = false">Confirm</BccButton>
  </template>
</BccModal>
    `,
    },
  },
};

const ExtraSlotsTemplate: StoryFn<typeof BccModal> = (args) => ({
  components: { BccModal, BccButton, CheckCircleFillIcon },
  setup() {
    return { args };
  },
  template: `
    <BccModal v-bind="args" @close="args.open = false">
      <template #header>
        <div class="text-heading-base flex items-center gap-2 text-success pb-2">
          <CheckCircleFillIcon class="w-4 h-4" /> Success!
        </div>

        <p class="text-secondary">
          You successfully registered to activity. Don't forget to register for activities for Day 2 & Day 3
        </p>
      </template>

        <template #default>
          You can join the activity chat by clicking the link below:
        </template>

        <template #secondaryAction>
          <BccButton variant="secondary" @click="args.open = false">
            Close
          </BccButton>
        </template>

        <template #primaryAction>
          <BccButton @click="args.open = false">
            Join activity chat
          </BccButton>
        </template>
    </BccModal>

    <BccButton variant="secondary" @click="args.open=true">Open modal</BccButton>
  `,
});

/**
 * Pass content to the `header` or `footer` slots to render extra content above and below the normal modal content.
 */
export const ExtraSlots = ExtraSlotsTemplate.bind({});
ExtraSlots.args = {
  open: false,
  showCloseButton: true,
  title: "Join the activity chat group",
  primaryActionText: "Open Telegram chat",
  secondaryActionText: "Close",
};
ExtraSlots.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccModal
  title="Join the activity chat group"
  :open="showModal"
  @close="showModal = false"
>
  <template #header>
    <div class="text-heading-base flex items-center gap-2 text-success pb-2">
      <CheckCircleFillIcon class="w-4 h-4" /> Success!
    </div>

    <p class="text-secondary">
      You successfully registered to activity. Don't forget to register for activities for Day 2 & Day 3
    </p>
  </template>

  <template #default>
    You can join the activity chat by clicking the link below:
  </template>

  <template #secondaryAction>
    <BccButton variant="secondary" @click="showModal = false">Cancel</BccButton>
  </template>

  <template #primaryAction>
    <BccButton @click="showModal = false">Confirm</BccButton>
  </template>
</BccModal>
    `,
    },
  },
};
