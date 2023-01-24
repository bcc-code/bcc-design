import HelloWorld from "./HelloWorld.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/HelloWorld",
  component: HelloWorld,
} as Meta<typeof HelloWorld>;

export const Primary: StoryFn<typeof HelloWorld> = () => ({
  components: { HelloWorld },
  template: '<HelloWorld msg="World" />',
});
