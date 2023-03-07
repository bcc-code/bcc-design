import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import CapacityIndicator from "./CapacityIndicator.vue";

describe("CapacityIndicator", () => {
  it("shows the remaining capacity", () => {
    const wrapper = mount(CapacityIndicator, { props: { total: 20, used: 14 } });
    expect(wrapper.text()).toBe("6");
  });

  it("shows all capacity without the used prop", () => {
    const wrapper = mount(CapacityIndicator, { props: { total: 42 } });
    expect(wrapper.text()).toBe("42");
  });

  it("shows an icon if the capacity is infinite", () => {
    const wrapper = mount(CapacityIndicator, { props: { total: -1 } });
    expect(wrapper.html()).toContain("<path");
  });
});
