import { describe, expect, it } from "vitest";

import { CheckCircleIcon } from "@bcc-code/icons-vue";
import { mount } from "@vue/test-utils";
import BccBadge from "./BccBadge.vue";

describe("BccBadge", () => {
  it("renders a text from the default slot", () => {
    const wrapper = mount(BccBadge, { slots: { default: "Test Badge" } });
    expect(wrapper.text()).toBe("Test Badge");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders a badge with left icon", () => {
    const wrapper = mount(BccBadge, {
      slots: { default: "Badge" },
      props: { icon: CheckCircleIcon },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders a badge with right icon", () => {
    const wrapper = mount(BccBadge, {
      slots: { default: "Badge" },
      props: { iconRight: CheckCircleIcon },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders a badge with icon but on right", () => {
    const wrapper = mount(BccBadge, {
      slots: { default: "Badge" },
      props: { icon: CheckCircleIcon, iconRight: true },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders a badge with both icons", () => {
    const wrapper = mount(BccBadge, {
      slots: { default: "Badge" },
      props: { icon: CheckCircleIcon, iconRight: CheckCircleIcon },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
