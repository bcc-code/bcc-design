import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BccTooltip from "./BccTooltip.vue";

describe("BccTooltip", () => {
  it("renders properly by default", () => {
    const wrapper = mount(BccTooltip, {
      props: {
        text: "Test Tooltip",
        visible: true,
      },
    });
    expect(wrapper.text()).toContain("Test Tooltip");
    expect(wrapper.isVisible()).toBe(true);
  });

  it("toggles visibility based on the 'visible' prop", async () => {
    const wrapper = mount(BccTooltip, {
      props: {
        text: "Test Tooltip",
        visible: false,
      },
    });

    expect(wrapper.find(".tooltip-content.visible").exists()).toBe(false);

    await wrapper.setProps({ visible: true });
    expect(wrapper.find(".tooltip-content.visible").exists()).toBe(true);
  });

  it("applies the correct class based on the 'primaryPosition' and 'secondaryPosition' props", async () => {
    const wrapper = mount(BccTooltip, {
      props: {
        primaryPosition: "top",
        secondaryPosition: "right",
        visible: true,
        text: "Test Tooltip",
      },
    });

    expect(wrapper.find(".tooltip-content").classes()).toContain("top-right");
    await wrapper.setProps({ primaryPosition: "bottom", secondaryPosition: "left" });
    expect(wrapper.find(".tooltip-content").classes()).toContain("bottom-left");
  });

  it("applies the correct class based on the 'variant' prop", async () => {
    const wrapper = mount(BccTooltip, {
      props: {
        variant: "dark",
        visible: true,
        text: "Test Tooltip",
      },
    });

    expect(wrapper.find(".tooltip-content").classes()).toContain("dark");
    await wrapper.setProps({ variant: "white" });
    expect(wrapper.find(".tooltip-content").classes()).toContain("white");
    await wrapper.setProps({ variant: "grey" });
    expect(wrapper.find(".tooltip-content").classes()).toContain("grey");
  });
});
