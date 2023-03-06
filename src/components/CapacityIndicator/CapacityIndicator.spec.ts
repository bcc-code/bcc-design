import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import CapacityIndicator from "./CapacityIndicator.vue";

describe("CapacityIndicator", () => {
  it("show the remaining capacity", () => {
    const wrapper = mount(CapacityIndicator, { props: { capacity: 20, left: 14 } });
    expect(wrapper.text()).toBe("14");
  });
});
