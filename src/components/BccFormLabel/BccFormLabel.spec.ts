import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccFormLabel from "./BccFormLabel.vue";

describe("BccFormLabel", () => {
  it("renders a label", () => {
    const wrapper = mount(BccFormLabel, {
      slots: { default: "Test label" },
    });

    expect(wrapper.text()).toBe("Test label");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("can render an optional label", () => {
    const wrapper = mount(BccFormLabel, {
      props: { showOptionalLabel: true, optionalLabel: "Custom optional label" },
    });

    expect(wrapper.text()).toBe("Custom optional label");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
