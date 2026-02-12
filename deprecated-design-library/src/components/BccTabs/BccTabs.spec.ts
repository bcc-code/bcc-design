import { describe, expect, it } from "vitest";

import { CircleIcon } from "@bcc-code/icons-vue";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import BccTabs from "./BccTabs.vue";

describe("BccTabs", () => {
  it("renders three tabs", () => {
    expect(BccTabs).toBeTruthy();

    const wrapper = mount(BccTabs, {
      props: {
        tabs: [
          {
            title: "With icon",
            icon: CircleIcon,
          },
          {
            title: "Using Component",
            pin: {
              text: "5",
            },
            as: h({
              template: `
                <div class="p-4">
                  <p>Component</p>
                </div>
              `,
            }),
          },
          {
            title: "Disabled badge",
            disabled: true,
            badge: {
              text: "new",
              context: "info",
            },
          },
        ],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
