import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccRange from "./BccRange.vue";

describe("BccRange", () => {
  it("renders a range input", () => {
    const wrapper = mount(BccRange, {
      props: { value: 0, min: -100, max: 10, step: 1 },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("handles a v-model", async () => {
    const wrapper = mount(BccRange, {
      props: { value: 0, min: -10, max: 10, step: 1 },
    });
    await wrapper.find("input").trigger("input");

    expect(wrapper.emitted("update:modelValue")?.length).toBe(1);
    expect(wrapper.emitted("update:modelValue")![0]).toEqual([0]);
  });
});
