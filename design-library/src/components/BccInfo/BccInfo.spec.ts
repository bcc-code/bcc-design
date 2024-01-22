import { CheckCircleIcon } from "@bcc-code/icons-vue";
import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccInfo from "./BccInfo.vue";

describe("BccInfo", () => {
  it("renders title", async () => {
    const wrapper = mount(BccInfo, { props: { title: "Title" } });
    expect(wrapper.html()).toContain("Title</h4>");
    expect(wrapper.html()).not.toContain("h-4 w-4");
  });

  it("renders icon and text", async () => {
    const wrapper = mount(BccInfo, {
      props: { title: "Title", infoIcon: CheckCircleIcon, infoText: "Info text" },
    });
    expect(wrapper.html()).toContain("Title</h4>");
    expect(wrapper.html()).toContain("h-4 w-4");
    expect(wrapper.html()).toContain("Info text</p>");
  });

  it("renders info slot", async () => {
    const wrapper = mount(BccInfo, {
      props: { title: "Title" },
      slots: {
        infoRight: "<p>Info right</p>",
      },
    });
    expect(wrapper.html()).toContain("Title</h4>");
    expect(wrapper.html()).toContain("<p>Info right</p>");
    expect(wrapper.html()).not.toContain("h-4 w-4");
  });
});
