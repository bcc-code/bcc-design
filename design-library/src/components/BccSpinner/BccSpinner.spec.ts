import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccSpinner from "./BccSpinner.vue";

describe("BccSpinner", () => {
  it("Matches the snaphot", () => {
    const wrapper = mount(BccSpinner, {});
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("contains SVG element", () => {
    const wrapper = mount(BccSpinner);
    expect(wrapper.html()).toContain("<svg");
  });
});
