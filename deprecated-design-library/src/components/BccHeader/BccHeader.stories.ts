import BccHeader from "./BccHeader.vue";
import { Face2Icon } from "@bcc-code/icons-vue";
import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Widgets/BccHeader",
  component: BccHeader,
  argTypes: {},
} as Meta<typeof BccHeader>;

const Template: StoryFn<typeof BccHeader> = (args) => ({
  components: { BccHeader, Face2Icon },
  setup() {
    return { args };
  },
  template: `
    <BccHeader v-bind="args">
      <template #infoRight>
        <div class="text-caption-sm flex items-center gap-x-1 text-tertiary">
          <Face2Icon class="h-4 w-4" />
          <p class="truncate">12 Apr 2000</p>
        </div>
      </template>
    </BccHeader>
  `,
});
export const Example = Template.bind({});
Example.args = {
  overline: "Overline",
  title: "Title",
  underline: "Underline",
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccHeader title="Title" overline="Overline" underline="Underline">
  <template #infoRight>
    <div class="...">
      <Face2Icon class="h-4 w-4" />
      <p class="truncate">12 Apr 2000</p>
    </div>
  </template>
</BccHeader>
    `,
    },
  },
};

export const AllExamples: StoryFn<typeof BccHeader> = (args) => ({
  components: { BccHeader, Face2Icon },
  setup() {
    return { args };
  },
  template: `
    <div class="flex flex-col gap-y-4">
      <BccHeader title="Title only" />
      <div class="border-b"></div>
      <BccHeader title="Title and overline" overline="Overline"/>
      <div class="border-b"></div>
      <BccHeader title="Title, overline and underline" overline="Overline" underline="Underline"/>
      <div class="border-b"></div>
      <BccHeader title="Title, overline and slot" overline="Overline">
        <template #infoRight>
          <div class="text-caption-sm flex items-center gap-x-1 text-tertiary">
            <Face2Icon class="h-4 w-4" />
            <p class="truncate">12 Apr 2000</p>
          </div>
        </template>
      </BccHeader>
      <div class="border-b"></div>
      <BccHeader title="Title, overline,underline and slot" overline="Overline" underline="Underline">
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
