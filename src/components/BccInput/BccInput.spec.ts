import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccInput from "./BccInput.vue";

describe("BccInput", () => {
  it("renders a text from the default slot", () => {
    const wrapper = mount(BccInput, { slots: { default: "Test message" } });
    expect(wrapper.text()).toBe("Test message");
  });

  it("passes through non-prop attributes", () => {
    const wrapper = mount(BccInput, { attrs: { autocomplete: true } });
    expect(wrapper.html()).toContain('autocomplete="true"');
  });
});
