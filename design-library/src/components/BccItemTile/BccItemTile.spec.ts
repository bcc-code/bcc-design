import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccItemTile from "./BccItemTile.vue";

describe("BccItemTile", () => {
  it("renders title and overline", async () => {
    const wrapper = mount(BccItemTile, { props: { title: "Title", overline: "Overline" } });
    expect(wrapper.html()).toContain("Title</h2>");
    expect(wrapper.html()).toContain("Overline</p>");
  });

  it("renders info slot", async () => {
    const wrapper = mount(BccItemTile, {
      props: { title: "Title" },
      slots: {
        default: "<p>Slot markup</p>",
      },
    });
    expect(wrapper.html()).toContain("Title</h2>");
    expect(wrapper.html()).toContain("<p>Slot markup</p>");
  });
});
