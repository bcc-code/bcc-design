import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccLinkItem from "./BccLinkItem.vue";

describe("BccLinkItem", () => {
  it("renders", async () => {
    const wrapper = mount(BccLinkItem, {
      props: {},
      slots: {
        default: "Title..",
      },
    });
    expect(wrapper.html()).toContain("Title..");
    expect(wrapper.html()).toContain("h-4 w-4");
    expect(wrapper.html()).not.toContain("border-none");
  });

  it("renders last element", async () => {
    const wrapper = mount(BccLinkItem, { props: { isLast: true } });
    expect(wrapper.html()).toContain("h-4 w-4");
    expect(wrapper.html()).toContain("border-none");
  });
});
