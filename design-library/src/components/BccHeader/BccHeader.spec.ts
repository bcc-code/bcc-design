import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccHeader from "./BccHeader.vue";

describe("BccHeader", () => {
  it("renders title", async () => {
    const wrapper = mount(BccHeader, { props: { title: "Title" } });
    expect(wrapper.html()).toContain("Title</h2>");
  });

  it("renders all text", async () => {
    const wrapper = mount(BccHeader, {
      props: { title: "Title", overline: "Overline", underline: "Underline" },
    });
    expect(wrapper.html()).toContain("Overline</p>");
    expect(wrapper.html()).toContain("Title</h2>");
    expect(wrapper.html()).toContain("Underline</p>");
  });
});
