import { CheckCircleIcon } from "@bcc-code/icons-vue";
import { describe, it, expect } from "vitest";
import { ClockLoader10Icon } from "@bcc-code/icons-vue";
import { mount } from "@vue/test-utils";
import BccInfo from "./BccInfo.vue";

describe("BccInfo", () => {
  it("renders title", async () => {
    const wrapper = mount(BccInfo, { props: { title: "Title" } });
    expect(wrapper.text()).toContain("Title");
    expect(wrapper.findComponent(CheckCircleIcon).exists()).toBe(false);
  });

  it("renders icon and text", async () => {
    const wrapper = mount(BccInfo, {
      props: { title: "Title", infoIcon: CheckCircleIcon, infoText: "Info text" },
    });
    expect(wrapper.text()).toContain("Title");
    expect(wrapper.findComponent(CheckCircleIcon).exists()).toBe(true);
    expect(wrapper.text()).toContain("Info text");
  });

  it("renders info slot", async () => {
    const wrapper = mount(BccInfo, {
      props: { title: "Title" },
      slots: {
        infoRight: "<p>Info right</p>",
      },
    });
    expect(wrapper.text()).toContain("Title");
    expect(wrapper.text()).toContain("Info right");
    expect(wrapper.findComponent(ClockLoader10Icon).exists()).toBe(false);
  });
});
