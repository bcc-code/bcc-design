import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import RadioInputGroupItem from "./RadioInputGroupItem.vue";

describe("RadioInputGroupItem", () => {
  it("renders a radio input", () => {
    const wrapper = mount(RadioInputGroupItem, { attrs: { label: "Test label" } });
    expect(wrapper.text()).toBe("Test label");
  });

  it("renders the contents of the default slot", () => {
    const wrapper = mount(RadioInputGroupItem, { slots: { default: "Test item" } });
    expect(wrapper.text()).toBe("Test item");
  });
});
