import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccCapacityIndicator from "./BccCapacityIndicator.vue";

describe("BccCapacityIndicator", () => {
  it("shows the remaining capacity", () => {
    const wrapper = mount(BccCapacityIndicator, { props: { total: 20, used: 14 } });
    expect(wrapper.text()).toBe("6");
  });

  it("shows all capacity without the used prop", () => {
    const wrapper = mount(BccCapacityIndicator, { props: { total: 42 } });
    expect(wrapper.text()).toBe("42");
  });

  it("shows an icon if the capacity is infinite", () => {
    const wrapper = mount(BccCapacityIndicator, { props: { total: -1 } });
    expect(wrapper.html()).toContain("<path");
  });
});
