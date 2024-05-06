import BccAccordion from "./BccAccordion.vue";
import BccCheckbox from "../BccCheckbox/BccCheckbox.vue";
import BccPin from "../BccPin/BccPin.vue";
import BccBadge from "../BccBadge/BccBadge.vue";
import { GeneticsIcon, VisibilityIcon } from "@bcc-code/icons-vue";
import { Meta, StoryFn } from "@storybook/vue3";
import { ref } from "vue";

export default {
  title: "Other/BccAccordion",
  component: BccAccordion,
  argTypes: {
    title: {
      control: { type: "text" },
      description: "The main title of the accordion",
    },
    subtitle: {
      control: { type: "text" },
      description: "The subtitle of the accordion",
    },
    info: {
      control: { type: "text" },
      description: "The info on the right side of the accordion header",
    },
    variant: {
      options: ["filled", "outlined", "soft", "ghost"],
      control: { type: "radio" },
      description: "The visual variant of the accordion",
    },
    size: {
      options: ["base", "lg"],
      control: { type: "radio" },
      description: "The size of the accordion",
    },
    open: {
      description: "The option to initiate the accordion in an expanded state or not",
      control: { type: "boolean" },
    },
  },
} as Meta<typeof BccAccordion>;

const Template: StoryFn<typeof BccAccordion> = (args) => ({
  components: { BccAccordion },
  setup() {
    return { args };
  },
  template: `
    <BccAccordion v-bind="args">
      Here is some content inside the BccAccordion component. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </BccAccordion>
  `,
});
export const Example = Template.bind({});
Example.args = {
  title: "Example Accordion",
  subtitle: "This is a subtitle",
  variant: "filled",
  size: "base",
};

export const WithOpened = Template.bind({});
WithOpened.args = {
  title: "Example Accordion was expanded once the page was loaded",
  variant: "outlined",
  size: "base",
  open: true,
};

export const WithInfoText = Template.bind({});
WithInfoText.args = {
  title: "Example Accordion look at the info to the right",
  info: "I am the Info text on the right",
  variant: "filled",
  size: "base",
};

const TempWithLeft: StoryFn<typeof BccAccordion> = (args) => ({
  components: { BccAccordion, BccCheckbox },
  setup() {
    return { args };
  },
  template: `
    <BccAccordion v-bind="args">
      <template #prepend>
        <div class="flex gap-x-3">
          <BccCheckbox :modelValue="true" />
          <div class="pr-4">
            <img src="https://via.placeholder.com/40" alt="Placeholder" class="rounded-full" />
          </div>
        </div>
      </template>
      Here is some content inside the BccAccordion component. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </BccAccordion>
  `,
});
export const WithLeftSlot = TempWithLeft.bind({});
WithLeftSlot.args = {
  title: "Example Accordion with slot to the left",
  variant: "filled",
  size: "lg",
  left: true,
};

const TempWithRight: StoryFn<typeof BccAccordion> = (args) => ({
  components: { BccAccordion, VisibilityIcon },
  setup() {
    const visible = ref(false);
    const show = () => (visible.value = true);
    const hide = () => (visible.value = false);
    return { args, show, hide, visible };
  },
  template: `
    <BccAccordion v-bind="args" class="mb-20">
      <template #append>
        <div class="flex flex-row">
          <div @mouseover="show()" @mouseleave="hide()">
            <div v-if="visible" class="relative z-10">
              <div class="absolute top-10 right-0">
                <div class="bg-neutral-100 w-[250px] p-4 px-6 rounded-lg shadow-lg">
                  <img src="https://design.bcc.no/logos/bcc_logo_primary_dark-green_32.png" class="w-full">
                </div>
              </div>
            </div>
            <VisibilityIcon class="w-6 h-6" />
          </div>
        </div>
      </template>
      Here is some content inside the BccAccordion component. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </BccAccordion>
  `,
});
export const WithSlotRight = TempWithRight.bind({});
WithSlotRight.args = {
  title: "Example Accordion with slot to the right",
  variant: "filled",
};

const TempWithAll: StoryFn<typeof BccAccordion> = (args) => ({
  components: { BccAccordion, BccBadge, BccPin, BccCheckbox, VisibilityIcon, GeneticsIcon },
  setup() {
    const visible = ref(false);
    const show = () => (visible.value = true);
    const hide = () => (visible.value = false);
    return { args, show, hide, visible };
  },
  template: `
    <BccAccordion v-bind="args" class="mb-20">
      <template #prepend>
        <div class="flex gap-x-3">
          <BccCheckbox :modelValue="true" />
          <div class="pr-4">
            <img src="https://via.placeholder.com/40" alt="Placeholder" class="rounded-full" />
          </div>
        </div>
      </template>
      Here is some content inside the BccAccordion component. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <template #append>
        <div class="flex flex-row gap-x-3 ml-3">
          <div @mouseover="show()" @mouseleave="hide()">
            <div v-if="visible" class="relative z-10">
              <div class="absolute top-10 right-0">
                <div class="bg-neutral-100 w-[250px] p-4 px-6 rounded-lg shadow-lg">
                  <img src="https://design.bcc.no/logos/bcc_logo_primary_dark-green_32.png" class="w-full">
                </div>
              </div>
            </div>
            <VisibilityIcon class="w-6 h-6" />
          </div>
          <BccBadge context="info">310</BccBadge>
          <BccPin text="310" context="warning" />
          <GeneticsIcon class="w-6 h-6" />
        </div>
      </template>
    </BccAccordion>
  `,
});
export const WithAll = TempWithAll.bind({});
WithAll.args = {
  title: "Example Accordion with Action",
  subtitle: "This is a subtitle",
  info: "This is an info text",
  variant: "ghost",
};
