import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccRadio from "./BccRadio.vue";

describe("BccRadio", () => {
  it("renders a radio input", () => {
    const wrapper = mount(BccRadio);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders a label", () => {
    const wrapper = mount(BccRadio, {
      props: { label: "Test label" },
    });

    expect(wrapper.text()).toBe("Test label");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
