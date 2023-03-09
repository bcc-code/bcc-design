import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import RadioInputGroup from "./RadioInputGroup.vue";

describe("RadioInputGroup", () => {
  it("renders the contents of the default slot", () => {
    const wrapper = mount(RadioInputGroup, { slots: { default: "Test item" } });
    expect(wrapper.text()).toBe("Test item");
  });
});
