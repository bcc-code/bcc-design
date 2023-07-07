import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccStatusIndicator from "./BccStatusIndicator.vue";
import { SearchIcon } from "@bcc-code/icons-vue";

describe("BccStatusIndicator", () => {
  it("renders a default icon", async () => {
    const wrapper = mount(BccStatusIndicator, {
      props: { status: "success" },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders a custom icon", async () => {
    const wrapper = mount(BccStatusIndicator, {
      props: { status: "success", icon: SearchIcon },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
