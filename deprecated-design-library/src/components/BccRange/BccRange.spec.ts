import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BccRange from "./BccRange.vue";

describe("BccRange", () => {
  it("renders a range input with 10 as value", () => {
    const wrapper = mount(BccRange, {
      props: { modelValue: 10, min: 0, max: 20, step: 1 },
    });
    expect(wrapper.html()).toMatchSnapshot();

    // Expect element with class "bcc-range__value" to have left style set to calc(50% + 0px) and text content to be "10"
    expect(wrapper.find(".bcc-range__value").attributes("style")).toBe("left: calc(50% + 0px);");
    expect(wrapper.find(".bcc-range__value").text()).toBe("10");
  });

  it("renders a range input at correct position", () => {
    const wrapper = mount(BccRange, {
      props: { modelValue: 6, min: 0, max: 8, step: 1 },
    });

    expect(wrapper.find(".bcc-range__value").attributes("style")).toBe(
      "left: calc(75% + -5.142857142857142px);"
    );
  });

  it("renders a range input without label", () => {
    const wrapper = mount(BccRange, {
      props: { modelValue: 6, min: 0, max: 8, step: 1, hideValue: true },
    });

    expect(wrapper.find(".bcc-range__value").exists()).toBe(false);
  });
});
