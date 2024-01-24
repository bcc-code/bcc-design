import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccHeader from "./BccHeader.vue";

describe("BccHeader", () => {
  it("renders title", async () => {
    const wrapper = mount(BccHeader, { props: { title: "Title" } });
    expect(wrapper.text()).toContain("Title");
  });

  it("renders all text", async () => {
    const wrapper = mount(BccHeader, {
      props: { title: "Title", overline: "Overline", underline: "Underline" },
    });
    expect(wrapper.text()).toContain("Overline");
    expect(wrapper.text()).toContain("Title");
    expect(wrapper.text()).toContain("Underline");
  });
});
