import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BccRange from "./BccRange.vue";

describe("BccRange", () => {
  it("renders a range input", () => {
    const wrapper = mount(BccRange, {
      props: { modelValue: 0, min: 0, max: 20, step: 1 },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
