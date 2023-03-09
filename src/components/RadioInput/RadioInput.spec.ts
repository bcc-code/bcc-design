import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import RadioInput from "./RadioInput.vue";

describe("RadioInput", () => {
  it("renders the label text", () => {
    const wrapper = mount(RadioInput, { props: { label: "Test label" } });
    expect(wrapper.text()).toBe("Test label");
  });
});
