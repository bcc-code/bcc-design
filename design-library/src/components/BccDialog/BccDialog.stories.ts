import BccButton from "../BccButton/BccButton.vue";
import BccDialog from "./BccDialog.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Common/BccDialog",
  component: BccDialog,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["action", "alert"],
    },
    destructive: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof BccDialog>;

const Template: StoryFn<typeof BccDialog> = (args) => ({
  components: { BccDialog, BccButton },
  setup() {
    return { args };
  },
  template: `
    <div>
      <BccDialog v-bind="args" @close="args.open = false">
          <template #default>
            <span v-if="args.slotDefault">
              {{ args.slotDefault }}
            </span>
            <span v-else>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac posuere turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </span>
          </template>

          <template v-if="args.variant === 'action' && args.slotSecondaryAction" #secondaryAction>
            <BccButton variant="secondary" @click="args.open = false">
              {{ args.secondaryActionText || "Cancel" }}
            </BccButton>
          </template>

          <template v-if="args.slotPrimaryAction" #primaryAction>
            <BccButton :context="args.destructive ? 'danger' : 'default'" @click="args.open = false">
              {{ args.primaryActionText || "Submit" }}
            </BccButton>
          </template>
      </BccDialog>

      <BccButton variant="secondary" @click="args.open=true">Open dialog</BccButton>
    </div>
  `,
});

// Default story
export const Default = Template.bind({});
Default.args = {
  open: false,
  title: "Question?",
  subtitle: "Subtitle if needed",
  closeButton: true,
  variant: "action",
  destructive: false,
  slotDefault: "",
  slotSecondaryAction: true,
  slotPrimaryAction: true,
};
Default.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccDialog title="Here is the question?" :open="showDialog" @close="showDialog = false">
  Do you want to update something?

  <template #secondaryAction>
    <BccButton variant="secondary" @click="showDialog = false">Cancel</BccButton>
  </template>

  <template #primaryAction>
    <BccButton @click="showDialog = false">Submit</BccButton>
  </template>
</BccDialog>
      `,
    },
  },
};

export const ActionVariant = Template.bind({});
ActionVariant.args = {
  ...Default.args,
  variant: "action",
  destructive: false,
};

export const DestructiveAction = Template.bind({});
DestructiveAction.args = {
  ...Default.args,
  variant: "action",
  destructive: true,
};

export const DestructiveAlert = Template.bind({});
DestructiveAlert.args = {
  ...Default.args,
  variant: "alert",
  destructive: true, // Enforce destructive for alert
};

export const NoActions = Template.bind({});
NoActions.args = {
  open: false,
  title: "Question?",
  closeButton: true,
  variant: "action",
  destructive: false,
  slotDefault: "",
  slotSecondaryAction: false,
  slotPrimaryAction: false,
};
NoActions.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccDialog title="Here is the question?" :open="showDialog" @close="showDialog = false">
  Do you want to update something?
</BccDialog>
      `,
    },
  },
};
