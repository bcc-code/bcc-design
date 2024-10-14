import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccBadge from "./BccBadge.vue";

describe("BccBadge", () => {
  it("renders a text from the default slot", () => {
    const wrapper = mount(BccBadge, { slots: { default: "Test Badge" } });
    expect(wrapper.text()).toBe("Test Badge");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
