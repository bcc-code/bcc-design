import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccCheckbox from "./BccCheckbox.vue";

describe("BccCheckbox", () => {
  it("renders a checked or unchecked checkbox", () => {
    const wrapper = mount(BccCheckbox, { props: { modelValue: false } });
    expect(wrapper.html()).toMatchSnapshot();

    wrapper.setProps({ modelValue: true });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders a label", () => {
    const wrapper = mount(BccCheckbox, {
      props: { label: "Test label", modelValue: false },
    });

    expect(wrapper.text()).toBe("Test label");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
