import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccModal from "./BccModal.vue";

describe("BccModal", () => {
  it("renders a modal", () => {
    const wrapper = mount(BccModal, {
      props: { open: true, title: "Modal title" },
      slots: {
        default: "Modal content",
        header: "Header slot",
        footer: "Footer slot`",
        primaryAction: "Primary action",
        secondaryAction: "Secondary action",
      },
      global: {
        renderStubDefaultSlot: true,
      },
      shallow: true,
    });

    expect(wrapper.text()).toContain("Header slot");
    expect(wrapper.text()).toContain("Modal title");
    expect(wrapper.text()).toContain("Modal content");
    expect(wrapper.text()).toContain("Footer slot");
    expect(wrapper.text()).toContain("Primary action");
    expect(wrapper.text()).toContain("Secondary action");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
