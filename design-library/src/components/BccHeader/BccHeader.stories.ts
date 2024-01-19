import BccHeader from "./BccHeader.vue";
import { Face2Icon } from "@bcc-code/icons-vue";
import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/BccHeader",
  component: BccHeader,
  argTypes: {},
} as Meta<typeof BccHeader>;

const Template: StoryFn<typeof BccHeader> = (args) => ({
  components: { BccHeader },
  setup() {
    return { args };
  },
  template: `
    <BccHeader v-bind="args" />
  `,
});

export const Example = Template.bind({});
Example.args = {
  overline: "Overline",
  title: "Title",
  underline: "Underline",
};

export const WithInfoOnRight: StoryFn<typeof BccHeader> = (args) => ({
  components: { BccHeader, Face2Icon },
  setup() {
    return { args };
  },
  template: `
    <div class="flex flex-col space-y-4">
      <BccHeader v-bind="args">
        <template #infoRight>
          <div class="text-caption-sm flex items-center gap-x-1 text-tertiary">
            <Face2Icon class="h-4 w-4" />
            <p class="truncate">12 Apr 2000</p>
          </div>
        </template>
      </BccHeader>
    </div>
  `,
});

WithInfoOnRight.args = {
  overline: "Overline",
  title: "Title",
  underline: "Underline",
};
