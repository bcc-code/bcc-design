import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccKnob from "./BccKnob.vue";

describe("BccKnob", () => {
  it("renders a knob", () => {
    expect(BccKnob).toBeTruthy();

    const wrapper = mount(BccKnob, {
      props: { modelValue: 30 },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
