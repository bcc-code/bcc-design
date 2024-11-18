import { CheckCircleFillIcon } from "@bcc-code/icons-vue";
import BccButton from "../BccButton/BccButton.vue";
import BccModal from "./BccModal.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

/**
 * A versatile modal component. Be sure to read the [guidelines](https://bccit.notion.site/Modals-e79ddadb127d4ff6aa6650379132d09a) on how to use this component.
 */
export default {
  title: "Common/BccModal",
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
 * Control the content of the modal with the `title` prop and the `default` slot. Pass buttons to the `primaryAction` and `secondaryAction` slots. Set `closeButton` to `false` to hide the close button on desktops. The modal emits a `close` event when the user clicks the close button or closes the modal by clicking outside of it or pressing Escape, unless `disableClickOutsideClose` is set to true.
 */
export const Example = Template.bind({});
Example.args = {
  open: false,
  title: "Confirm email address",
  closeButton: true,
  slotDefault: "",
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccModal title="Confirm email address" :open="showModal" @close="showModal = false">
  Is your email address <strong>lida@example.org</strong>?

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
        <div class="text-heading flex items-center gap-2 text-success pb-2">
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
  closeButton: true,
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
    <div class="text-heading flex items-center gap-2 text-success pb-2">
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

const ScrollableTemplate: StoryFn<typeof BccModal> = (args) => ({
  components: { BccModal, BccButton },
  setup() {
    return { args };
  },
  template: `
    <BccModal v-bind="args" @close="args.open = false" class="max-w-[80vw]">
        <template #default>
          <p class="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id mattis sapien. Morbi euismod convallis tellus, in rutrum risus. Vivamus quam dui, auctor sit amet nibh non, dignissim volutpat massa. Nunc accumsan mauris vel congue finibus. Nulla venenatis maximus libero, quis imperdiet justo mattis sit amet. Vestibulum a odio a arcu accumsan malesuada. Mauris porttitor egestas orci nec bibendum. Sed accumsan, erat nec cursus vehicula, nibh risus porta tellus, eget rhoncus erat sem at nunc. Aliquam ornare, nibh blandit molestie tincidunt, ligula lectus faucibus diam, sed tristique arcu neque interdum purus. Morbi a blandit eros, quis suscipit sapien. Donec dictum dignissim maximus. Sed ac eros consectetur, ultrices dui a, rhoncus mi.
          </p>
          <p class="mb-4">
            In eu diam nisl. Maecenas urna tortor, hendrerit in varius ut, laoreet sit amet lectus. Phasellus vel massa vel nunc efficitur dapibus a et ipsum. Proin placerat lacus porttitor vulputate scelerisque. Sed sed lacinia nibh. Sed convallis feugiat malesuada. Nunc ullamcorper sit amet sapien vel pulvinar.
          </p>

          <p class="mb-4">
            Etiam ullamcorper posuere libero tempor hendrerit. Donec faucibus quis nunc non vehicula. In sit amet nibh interdum, hendrerit sem a, elementum est. Aliquam viverra tristique mi, ac ultricies orci congue vel. Nam imperdiet sem non efficitur porttitor. Phasellus ac nunc euismod est porta tincidunt. Pellentesque dapibus tortor ex, sed laoreet nunc mattis finibus. Donec sollicitudin neque a leo fermentum, quis maximus ex bibendum. Nulla dictum nisl nec facilisis venenatis. Mauris imperdiet vitae nulla eget euismod. Aenean dictum rutrum dui, cursus blandit lectus ultrices eget. Morbi non tristique elit, a tempor lectus. Nullam quis bibendum orci, et ornare eros. Nunc commodo dolor leo. In tincidunt imperdiet arcu, nec pharetra diam feugiat pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          </p>

          <p class="mb-4">
            Quisque at laoreet leo. Quisque eu nulla consequat, viverra enim tristique, congue libero. Fusce et gravida nisi. Ut consectetur lectus massa, sit amet gravida eros tempus in. Suspendisse suscipit orci bibendum rhoncus venenatis. Pellentesque varius luctus volutpat. Praesent velit urna, bibendum sed lacinia ut, hendrerit ac risus. Sed elementum congue dui, quis bibendum justo tempus sed. Integer vel sem id elit dignissim laoreet in id tellus. Morbi vehicula sagittis mattis. Nam cursus, diam sit amet iaculis egestas, metus dolor mollis libero, sit amet ornare sapien massa at neque. Suspendisse mollis nisl massa, vitae sagittis lorem condimentum non.
          </p>

          <p class="mb-4">
            Nulla venenatis nisi eu pulvinar accumsan. Vivamus condimentum lectus sed ligula euismod molestie. Aliquam facilisis malesuada leo, quis gravida ligula. Etiam lorem orci, auctor quis rutrum interdum, eleifend sit amet nulla. Morbi fermentum mi in lacinia aliquet. Quisque accumsan orci urna, id consequat sem ullamcorper in. Phasellus sodales mattis pharetra. Nam non mauris eget sapien efficitur pulvinar. Suspendisse potenti. Aenean vitae porta libero, quis malesuada urna. Aliquam gravida sollicitudin elit a lacinia. Nullam non est lacus. Donec posuere massa eleifend eros lobortis rhoncus.  
          </p>

          <p class="mb-4">
            Etiam ullamcorper posuere libero tempor hendrerit. Donec faucibus quis nunc non vehicula. In sit amet nibh interdum, hendrerit sem a, elementum est. Aliquam viverra tristique mi, ac ultricies orci congue vel. Nam imperdiet sem non efficitur porttitor. Phasellus ac nunc euismod est porta tincidunt. Pellentesque dapibus tortor ex, sed laoreet nunc mattis finibus. Donec sollicitudin neque a leo fermentum, quis maximus ex bibendum. Nulla dictum nisl nec facilisis venenatis. Mauris imperdiet vitae nulla eget euismod. Aenean dictum rutrum dui, cursus blandit lectus ultrices eget. Morbi non tristique elit, a tempor lectus. Nullam quis bibendum orci, et ornare eros. Nunc commodo dolor leo. In tincidunt imperdiet arcu, nec pharetra diam feugiat pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          </p>

          <p class="mb-4">
            Quisque at laoreet leo. Quisque eu nulla consequat, viverra enim tristique, congue libero. Fusce et gravida nisi. Ut consectetur lectus massa, sit amet gravida eros tempus in. Suspendisse suscipit orci bibendum rhoncus venenatis. Pellentesque varius luctus volutpat. Praesent velit urna, bibendum sed lacinia ut, hendrerit ac risus. Sed elementum congue dui, quis bibendum justo tempus sed. Integer vel sem id elit dignissim laoreet in id tellus. Morbi vehicula sagittis mattis. Nam cursus, diam sit amet iaculis egestas, metus dolor mollis libero, sit amet ornare sapien massa at neque. Suspendisse mollis nisl massa, vitae sagittis lorem condimentum non.
          </p>

          <p class="mb-4">
            Nulla venenatis nisi eu pulvinar accumsan. Vivamus condimentum lectus sed ligula euismod molestie. Aliquam facilisis malesuada leo, quis gravida ligula. Etiam lorem orci, auctor quis rutrum interdum, eleifend sit amet nulla. Morbi fermentum mi in lacinia aliquet. Quisque accumsan orci urna, id consequat sem ullamcorper in. Phasellus sodales mattis pharetra. Nam non mauris eget sapien efficitur pulvinar. Suspendisse potenti. Aenean vitae porta libero, quis malesuada urna. Aliquam gravida sollicitudin elit a lacinia. Nullam non est lacus. Donec posuere massa eleifend eros lobortis rhoncus.  
          </p>

          <p class="mb-4">
            Etiam ullamcorper posuere libero tempor hendrerit. Donec faucibus quis nunc non vehicula. In sit amet nibh interdum, hendrerit sem a, elementum est. Aliquam viverra tristique mi, ac ultricies orci congue vel. Nam imperdiet sem non efficitur porttitor. Phasellus ac nunc euismod est porta tincidunt. Pellentesque dapibus tortor ex, sed laoreet nunc mattis finibus. Donec sollicitudin neque a leo fermentum, quis maximus ex bibendum. Nulla dictum nisl nec facilisis venenatis. Mauris imperdiet vitae nulla eget euismod. Aenean dictum rutrum dui, cursus blandit lectus ultrices eget. Morbi non tristique elit, a tempor lectus. Nullam quis bibendum orci, et ornare eros. Nunc commodo dolor leo. In tincidunt imperdiet arcu, nec pharetra diam feugiat pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          </p>

          <p class="mb-4">
            Quisque at laoreet leo. Quisque eu nulla consequat, viverra enim tristique, congue libero. Fusce et gravida nisi. Ut consectetur lectus massa, sit amet gravida eros tempus in. Suspendisse suscipit orci bibendum rhoncus venenatis. Pellentesque varius luctus volutpat. Praesent velit urna, bibendum sed lacinia ut, hendrerit ac risus. Sed elementum congue dui, quis bibendum justo tempus sed. Integer vel sem id elit dignissim laoreet in id tellus. Morbi vehicula sagittis mattis. Nam cursus, diam sit amet iaculis egestas, metus dolor mollis libero, sit amet ornare sapien massa at neque. Suspendisse mollis nisl massa, vitae sagittis lorem condimentum non.
          </p>

          <p class="mb-4">
            Nulla venenatis nisi eu pulvinar accumsan. Vivamus condimentum lectus sed ligula euismod molestie. Aliquam facilisis malesuada leo, quis gravida ligula. Etiam lorem orci, auctor quis rutrum interdum, eleifend sit amet nulla. Morbi fermentum mi in lacinia aliquet. Quisque accumsan orci urna, id consequat sem ullamcorper in. Phasellus sodales mattis pharetra. Nam non mauris eget sapien efficitur pulvinar. Suspendisse potenti. Aenean vitae porta libero, quis malesuada urna. Aliquam gravida sollicitudin elit a lacinia. Nullam non est lacus. Donec posuere massa eleifend eros lobortis rhoncus.  
          </p>
        </template>

        <template #footer>
          <label class="flex items-center gap-2">
            <input type="checkbox"> I agree lorem ipsum dolores
          </label>
        </template>

        <template #secondaryAction>
          <BccButton variant="secondary" @click="args.open = false">
            Take me back
          </BccButton>
        </template>

        <template #primaryAction>
          <BccButton @click="args.open = false">
            Confirm
          </BccButton>
        </template>
    </BccModal>

    <BccButton variant="secondary" @click="args.open=true">Open modal</BccButton>
  `,
});

/**
 * The content of the modal will be scrollable if there is too much to show at once, with the header, actions and `footer` slot always being in view. Use a `class` or `style` attribute to make the modal larger than the provided `size`s if that is needed for you
 */
export const Scrollable = ScrollableTemplate.bind({});
Scrollable.args = {
  open: false,
  title: "Heading",
};
Scrollable.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccModal
  title="Heading"
  :open="showModal"
  @close="showModal = false"
  class="max-w-[80vw]"
>
  Lorem ipsum dolor sit amet...
  
  <template #footer>
    <label class="flex items-center gap-2">
      <input type="checkbox"> I agree lorem ipsum dolores
    </label>
  </template>

  <template #secondaryAction>
    <BccButton variant="secondary" @click="showModal = false">Take me back</BccButton>
  </template>

  <template #primaryAction>
    <BccButton @click="showModal = false">Confirm</BccButton>
  </template>
</BccModal>
    `,
    },
  },
};
