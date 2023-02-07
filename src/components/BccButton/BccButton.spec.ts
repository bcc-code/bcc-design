import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccButton from "./BccButton.vue";

describe("BccButton", () => {
  it("renders a text from the default slot", () => {
    const wrapper = mount(BccButton, { slots: { default: "Test Button" } });
    expect(wrapper.text()).toContain("Test Button");
  });
});
