import {
  CheckIcon,
  EventIcon,
  GroupsFillIcon,
  NotificationsIcon,
  PersonIcon,
} from "@bcc-code/icons-vue";
import BccTabs from "./BccTabs.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import { h } from "vue";

export default {
  title: "Common/BccTabs",
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
    //Boolean fill
    fill: {
      description: "Fill up the entire space of the parent flex container",
      control: { type: "boolean" },
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
      icon: PersonIcon,
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
      icon: GroupsFillIcon,
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
  fill: false,
};

Example.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccTabs :tabs="[
  {title:"Using slots", icon: CircleNotificationsIcon},
  {title:"Using Component", component: MyComponent},
  {title:"Disabled",disabled:true, badge: { text: "new", context: "info" }}
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
      icon: EventIcon,
      as: h({
        template: `<code class="my-2 inline-block border-4 border-dashed border-gray-300 p-2 text-gray-600">{
          title: "Features",
          icon: AccountTreeIcon,
        }</code>`,
      }),
    },
    {
      title: "With Pin",
      icon: NotificationsIcon,
      pin: {
        text: "0/5",
      },
      as: h({
        template: `<code class="my-2 inline-block border-4 border-dashed border-gray-300 p-2 text-gray-600">{
          title: "Features",
          pin: { text: "5" } },
        }</code>`,
      }),
    },
    {
      title: "With Badge",
      badge: {
        text: "new",
      },
      icon: PersonIcon,
      as: h({
        template: `<code class="my-2 inline-block border-4 border-dashed border-gray-300 p-2 text-gray-600">{
          title: "Features",
          badge: {
            text: "new"
          },
        }</code>`,
      }),
    },
    {
      title: "With style",
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
  ],
  size: "base",
};

WithIconsPinsAndBadges.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<BccTabs :selectedIndex="selectedTab" @change="changeTab"
  :tabs="[
    {title:"Using slots", icon: AccountTreeIcon },
    {title:"With styled Pin", pin: { icon: CheckIcon, context: "success" } },
    {title:"With Badge", badge: { text: "new", context: "info"} }
  ]'></BccTabs>
    `,
    },
  },
};
