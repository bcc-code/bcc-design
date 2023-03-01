import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Badge from "./Badge.vue";

describe("Badge", () => {
  it("renders a text from the default slot", () => {
    const wrapper = mount(Badge, { slots: { default: "Test Badge" } });
    expect(wrapper.text()).toBe("Test Badge");
  });
});
