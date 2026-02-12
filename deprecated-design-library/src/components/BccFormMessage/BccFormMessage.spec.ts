import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccFormMessage from "./BccFormMessage.vue";

describe("BccFormMessage", () => {
  it("renders a text from the default slot", () => {
    const wrapper = mount(BccFormMessage, {
      slots: { default: "Test message" },
    });

    expect(wrapper.text()).toBe("Test message");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
