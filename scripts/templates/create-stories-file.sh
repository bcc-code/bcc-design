echo "import $1 from \"./$1.vue\";

import type { Meta, StoryFn } from \"@storybook/vue3\";

export default {
  title: \"Components/$1\",
  component: $1,
  argTypes: {
  },
} as Meta<typeof $1>;

const Template: StoryFn<typeof $1> = (args) => ({
  components: { $1 },
  setup() {
    return { args };
  },
  template: \`
    <$1 v-bind=\"args\" />
  \`,
});

export const Example = Template.bind({});
Example.parameters = {
  viewMode: \"docs\",
};
Example.args = {
};
" > src/components/$1/$1.stories.ts