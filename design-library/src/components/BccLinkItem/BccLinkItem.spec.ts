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
    expect(wrapper.text()).toContain("Title..");
  });
});
