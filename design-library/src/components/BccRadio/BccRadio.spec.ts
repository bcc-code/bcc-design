import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccRadio from "./BccRadio.vue";

describe("BccRadio", () => {
  it("renders a radio input", () => {
    const wrapper = mount(BccRadio, {
      props: { modelValue: "test", value: "test" },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders a label", () => {
    const wrapper = mount(BccRadio, {
      props: { label: "Test label", modelValue: "test", value: "test" },
    });

    expect(wrapper.text()).toBe("Test label");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("handles a v-model", async () => {
    const wrapper = mount(BccRadio, {
      props: { modelValue: "example", value: "test" },
    });
    await wrapper.find("input").trigger("input");

    expect(wrapper.emitted("update:modelValue")?.length).toBe(1);
    expect(wrapper.emitted("update:modelValue")![0]).toEqual(["test"]);
  });
});
