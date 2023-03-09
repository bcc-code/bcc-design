import CapacityIndicator from "../CapacityIndicator/CapacityIndicator.vue";
import RadioInputGroupItem from "../RadioInputGroupItem/RadioInputGroupItem.vue";
import RadioInputGroup from "./RadioInputGroup.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/RadioInputGroup",
  component: RadioInputGroup,
  argTypes: {
    slotDefault: {
      name: "default slot",
      description: "",
    },
  },
} as Meta<typeof RadioInputGroup>;

const Template: StoryFn<typeof RadioInputGroup> = (args) => ({
  components: { RadioInputGroup, RadioInputGroupItem, CapacityIndicator },
  setup() {
    return { args };
  },
  template: `
    <RadioInputGroup v-bind="args" class="md:w-1/2">
      <RadioInputGroupItem label="Option One" value="yes" name="question" checked>
        <CapacityIndicator :total="20" :used="18" />
      </RadioInputGroupItem>
      <RadioInputGroupItem label="Option Two" value="no" name="question">
        <CapacityIndicator :total="20" :used="6" />
      </RadioInputGroupItem>
    </RadioInputGroup>
  `,
});

export const Example = Template.bind({});
Example.parameters = {
  viewMode: "docs",
};
Example.args = {};

export const WithoutSlot: StoryFn<typeof RadioInputGroup> = () => ({
  components: { RadioInputGroup, RadioInputGroupItem },
  template: `
  <RadioInputGroup v-bind="args" class="md:w-1/2">
    <RadioInputGroupItem label="Option One" value="yes" name="without-slot" checked />
    <RadioInputGroupItem label="Option Two" value="no" name="without-slot" />
  </RadioInputGroup>
  `,
});
