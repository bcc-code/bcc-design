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

    wrapper = mount(BccButton, { props: { element: "a" } });
    expect(wrapper.html()).toContain("<a");
  });

  it("renders only anchor elements for an anchor", () => {
    const wrapper = mount(BccButton, {
      props: { element: "a", target: "_blank", href: "#", disabled: true },
    });
    expect(wrapper.html()).toContain("href");
    expect(wrapper.html()).toContain('target="_blank"');
    expect(wrapper.html()).not.toContain('type="button"');
    expect(wrapper.html()).not.toContain("disabled");
  });

  it("renders only button elements for an button", () => {
    const wrapper = mount(BccButton, {
      props: { element: "button", target: "_blank", href: "#", disabled: true },
    });
    expect(wrapper.html()).not.toContain("href");
    expect(wrapper.html()).not.toContain('target="_blank"');
    expect(wrapper.html()).toContain('type="button"');
    expect(wrapper.html()).toContain("disabled");
  });
});
