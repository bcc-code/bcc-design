import { AccountTreeIcon, CheckIcon, CircleNotificationsIcon } from "@bcc-code/icons-vue";
import BccTabs from "./BccTabs.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import { h } from "vue";

export default {
  title: "Components/BccTabs",
  component: BccTabs,
  argTypes: {
    tabs: {
      description: "Array of tabs you want to display",
    },
    size: {
      description: "The size of the tabs",
      options: ["sm", "base", "lg"],
      control: { type: "radio" },
    },
  },
} as Meta<typeof BccTabs>;

const Template: StoryFn<typeof BccTabs> = (args) => ({
  components: { BccTabs },
  setup() {
    return { args };
  },
  template: `<BccTabs v-bind="args"></BccTabs>`,
});

export const Example = Template.bind({});
Example.args = {
  tabs: [
    {
      title: "Using slots",
      icon: CircleNotificationsIcon,
      as: h({
        template: `<div class="p-4">
          <p>Define tab content using slots or components:</p>
          <code class="my-2 inline-block border-4 border-dashed border-gray-300 p-2 text-gray-600">
            &lt;template #tab-1&gt;You content here&lt;/template&gt;
          </code>
        </div>`,
      }),
    },
    {
      title: "Using Component",
      as: h({
        template: `
          <div class="p-4">
            <p>Or assign a component to the <code>as</code> field in tabs</p>
            <code class="my-2 inline-block border-4 border-dashed border-gray-300 p-2 text-gray-600">
              {
                title: "Features",
                as: YourComponent
              }
            </code>
          </div>
        `,
      }),
    },
    {
      title: "Disabled",
      disabled: true,
      badge: {
        text: "new",
        context: "info",
      },
    },
  ],
  size: "base",
};

Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccTabs :tabs="[
  {title:"Using slots"},
  {title:"Using Component", component: MyComponent},
  {title:"Disabled",disabled:true}
]'>
  <template #tab-1>
    <div class="p-4">This is tab 1</div>
  </template>

  <template #tab-3>
    <div class="p-4">This is tab 3</div>
  </template>
</BccTabs>
    `,
    },
  },
};

export const WithIconsPinsAndBadges = Template.bind({});
WithIconsPinsAndBadges.args = {
  tabs: [
    {
      title: "With Icon",
      icon: AccountTreeIcon,
      as: h({
        template: `<code class="my-2 inline-block border-4 border-dashed border-gray-300 p-2 text-gray-600">{
          title: "Features",
          icon: AccountTreeIcon,
        }</code>`,
      }),
    },
    {
      title: "With Pin",
      icon: CircleNotificationsIcon,
      pin: {
        text: "0/5",
        context: "info",
      },
      as: h({
        template: `<code class="my-2 inline-block border-4 border-dashed border-gray-300 p-2 text-gray-600">{
          title: "Features",
          pin: { text: "5" } },
        }</code>`,
      }),
    },
    {
      title: "With styled Pin",
      pin: {
        icon: CheckIcon,
        context: "success",
      },
      as: h({
        template: `<code class="my-2 inline-block border-4 border-dashed border-gray-300 p-2 text-gray-600">{
          title: "Features",
          pin: {
            icon: CheckIcon,
            context: "success",
          },
        }</code>`,
      }),
    },
    {
      title: "With Badge",
      badge: {
        text: "new",
        context: "info",
      },
      icon: AccountTreeIcon,
      as: h({
        template: `<code class="my-2 inline-block border-4 border-dashed border-gray-300 p-2 text-gray-600">{
          title: "Features",
          badge: {
            text: "new",
            context: "info",
          },
        }</code>`,
      }),
    },
  ],
  size: "base",
};
