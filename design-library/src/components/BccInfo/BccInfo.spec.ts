import { CheckCircleIcon } from "@bcc-code/icons-vue";
import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccInfo from "./BccInfo.vue";

describe("BccInfo", () => {
  it("renders title", async () => {
    const wrapper = mount(BccInfo, { props: { title: "Title" } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders icon and text", async () => {
    const wrapper = mount(BccInfo, {
      props: { title: "Title", infoIcon: CheckCircleIcon, infoText: "Text" },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders info slot", async () => {
    const wrapper = mount(BccInfo, {
      props: { title: "Title" },
      slots: {
        infoRight: "<p>Info right</p>",
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
