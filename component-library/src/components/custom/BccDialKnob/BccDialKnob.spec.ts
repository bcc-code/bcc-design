import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccDialKnob from "./BccDialKnob.vue";

describe("BccDialKnob", () => {
  it("renders a knob", () => {
    expect(BccDialKnob).toBeTruthy();

    const wrapper = mount(BccDialKnob, {
      props: { modelValue: 30 },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
