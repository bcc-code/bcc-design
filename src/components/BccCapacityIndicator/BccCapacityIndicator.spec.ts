import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccCapacityIndicator from "./BccCapacityIndicator.vue";

describe("BccCapacityIndicator", () => {
  const wait = () => new Promise((r) => setTimeout(r, 1050));
  
  it("shows the remaining capacity", async () => {
    const wrapper = mount(BccCapacityIndicator, { props: { total: 20, used: 14 } });
    await wait();
    expect(wrapper.text()).toBe("6");

    wrapper.setProps({ used: 6 });
    await wait();
    expect(wrapper.text()).toBe("14");
  });

  it("shows all capacity without the used prop", async () => {
    const wrapper = mount(BccCapacityIndicator, { props: { total: 42 } });
    await wait();
    expect(wrapper.text()).toBe("42");
  });

  it("shows an icon if the capacity is infinite", async () => {
    const wrapper = mount(BccCapacityIndicator, { props: { total: -1 } });
    await wait();
    expect(wrapper.html()).toContain("<path");
  });
});