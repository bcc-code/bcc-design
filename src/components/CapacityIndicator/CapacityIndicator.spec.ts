import { describe, it, expect } from "vitest";
import { AllInclusiveIcon } from "@bcc-code/icons-vue";

import { mount } from "@vue/test-utils";
import CapacityIndicator from "./CapacityIndicator.vue";

describe("CapacityIndicator", () => {
  it("shows the remaining capacity", () => {
    const wrapper = mount(CapacityIndicator, { props: { capacity: 20, used: 14 } });
    expect(wrapper.text()).toBe("6");
  });

  it("shows an icon if the capacity is infinite", () => {
    const wrapper = mount(CapacityIndicator, { props: { capacity: Infinity, used: 14 } });
    expect(wrapper.findComponent(AllInclusiveIcon).isVisible()).toBe(true);
  });
});
