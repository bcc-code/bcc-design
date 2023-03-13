import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccButton from "./BccButton.vue";

describe("BccButton", () => {
  it("renders a text from the default slot", () => {
    const wrapper = mount(BccButton, { slots: { default: "Test Button" } });
    expect(wrapper.text()).toBe("Test Button");
  });

  it("can be a button or anchor element", () => {
    let wrapper = mount(BccButton);
    expect(wrapper.html()).toContain("<button");

    wrapper = mount(BccButton, { props: { is: "a" } });
    expect(wrapper.html()).toContain("<a");
  });

  it("passes through non-prop attributes", () => {
    const wrapper = mount(BccButton, {
      props: { is: "a", target: "_blank", href: "#" },
    });
    expect(wrapper.html()).toContain("href");
    expect(wrapper.html()).toContain('target="_blank"');
  });
});
