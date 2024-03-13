import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BccTooltip from "./BccTooltip.vue";

describe("BccTooltip", () => {
  it("renders properly by default", () => {
    const wrapper = mount(BccTooltip);
    expect(wrapper.find(".bcc-tooltip-content").classes()).not.toContain("bcc-tooltip-visible");
  });

  it("toggles visibility based on the 'visible' prop", async () => {
    const wrapper = mount(BccTooltip, {
      props: {
        visible: false,
      },
    });

    expect(wrapper.find(".bcc-tooltip-content").classes()).not.toContain("bcc-tooltip-visible");

    await wrapper.setProps({ visible: true });
    expect(wrapper.find(".bcc-tooltip-content").classes()).toContain("bcc-tooltip-visible");
  });

  it("applies the correct class based on the 'primaryPosition' and 'secondaryPosition' props", async () => {
    const wrapper = mount(BccTooltip, {
      props: {
        primaryPosition: "top",
        secondaryPosition: "right",
        visible: true,
      },
    });

    expect(wrapper.find(".bcc-tooltip-content").classes()).toContain("bcc-tooltip-top-right");
    await wrapper.setProps({ primaryPosition: "bottom", secondaryPosition: "left" });
    expect(wrapper.find(".bcc-tooltip-content").classes()).toContain("bcc-tooltip-bottom-left");
  });

  it("applies the correct class based on the 'variant' prop", async () => {
    const wrapper = mount(BccTooltip, {
      props: {
        variant: "dark",
        visible: true,
      },
    });

    expect(wrapper.find(".bcc-tooltip-content").classes()).toContain("bcc-tooltip-dark");
    await wrapper.setProps({ variant: "white" });
    expect(wrapper.find(".bcc-tooltip-content").classes()).toContain("bcc-tooltip-white");
    await wrapper.setProps({ variant: "grey" });
    expect(wrapper.find(".bcc-tooltip-content").classes()).toContain("bcc-tooltip-grey");
  });
});
