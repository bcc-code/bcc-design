import BccModal from "./BccModal.vue";
import BccButton from "../BccButton/BccButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccModal",
  component: BccModal,
  argTypes: {},
} as Meta<typeof BccModal>;

const Template: StoryFn<typeof BccModal> = (args) => ({
  components: { BccModal, BccButton },
  setup() {
    return { args };
  },
  template: `
    <BccModal v-bind="args" @close="args.open = false">
        <template #default>
          Is your email address <strong>lida@example.org<strong>?
        </template>

        <template #secondaryAction>
          <BccButton variant="secondary" @click="args.open = false">
            Cancel
          </BccButton>
        </template>

        <template #primaryAction>
          <BccButton @click="args.open = false">
            Confirm
          </BccButton>
        </template>
    </BccModal>

    Display modal by setting the <code>open</code> property to <code>true</code> below
  `,
});

export const Example = Template.bind({});
Example.args = {
  open: true,
  showClose: true,
  title: "Confirm email address",
};
