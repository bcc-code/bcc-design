import { Face2Icon } from "@bcc-code/icons-vue";
import BccItemTile from "./BccItemTile.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Widgets/BccItemTile",
  component: BccItemTile,
  argTypes: {},
} as Meta<typeof BccItemTile>;

const Template: StoryFn<typeof BccItemTile> = (args) => ({
  components: { BccItemTile, Face2Icon },
  setup() {
    return { args };
  },
  template: `
    <BccItemTile v-bind="args">
      <div>
        <div class="text-caption-sm flex items-center gap-x-1 text-tertiary">
          <Face2Icon class="h-4 w-4" />
          <p class="truncate">12 Apr 2000</p>
        </div>
        <div class="text-caption-sm flex items-center gap-x-1 text-tertiary">
          <Face2Icon class="h-4 w-4" />
          <p class="truncate">13 Apr 2000</p>
        </div>
      </div>
    </BccItemTile>
  `,
});

export const Example = Template.bind({});
Example.args = {
  title: "Title",
  overline: "Overline",
};
Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccItemTile title="Title" overline="Overline">
  <div>
    <div class="...">
      <Face2Icon class="h-4 w-4" />
      <p class="truncate">12 Apr 2000</p>
    </div>
    ...
  </div>
</BccItemTile>
    `,
    },
  },
};

export const OnlyTitle: StoryFn<typeof BccItemTile> = () => ({
  components: { BccItemTile },
  template: `
    <BccItemTile title="Title only"/>
  `,
});

export const TitleWithOverline: StoryFn<typeof BccItemTile> = () => ({
  components: { BccItemTile },
  template: `
    <BccItemTile title="Title" overline="Overline" />
  `,
});
