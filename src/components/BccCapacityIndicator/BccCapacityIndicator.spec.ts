import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccCapacityIndicator from "./BccCapacityIndicator.vue";

describe("BccCapacityIndicator", () => {
  const nextTick = () => Promise.resolve();

  it("shows the remaining capacity", async () => {
    const wrapper = mount(BccCapacityIndicator, { props: { total: 20, used: 14, animate: false } });
    expect(wrapper.text()).toBe("6");

    wrapper.setProps({ used: 6 });
    await nextTick();
    expect(wrapper.text()).toBe("14");

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("shows all capacity without the used prop", async () => {
    const wrapper = mount(BccCapacityIndicator, { props: { total: 42, animate: false } });
    expect(wrapper.text()).toBe("42");
  });

  it("shows an icon if the capacity is infinite", async () => {
    const wrapper = mount(BccCapacityIndicator, { props: { total: -1, animate: false } });
    expect(wrapper.html()).toContain("<path");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
