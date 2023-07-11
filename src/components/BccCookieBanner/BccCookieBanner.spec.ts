import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccCookieBanner from "./BccCookieBanner.vue";

describe("BccCookieBanner", () => {
  it("renders with an overlay", async () => {
    const wrapper = mount(BccCookieBanner, { props: { open: true, showOverlay: true } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders without an overlay", async () => {
    const wrapper = mount(BccCookieBanner, { props: { open: true, showOverlay: false } });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders slot and button text", async () => {
    const wrapper = mount(BccCookieBanner, {
      props: { open: true, acceptButtonText: "I Accept" },
      slots: { default: "Default slot content" },
    });
    expect(wrapper.text()).toContain("I Accept");
    expect(wrapper.text()).toContain("Default slot content");
  });
});
