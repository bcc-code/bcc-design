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

  it("closes when the close button is clicked", async () => {
    const wrapper = mount(BccModal, {
      props: { open: true },
      slots: {
        default: "Modal content",
      },
      global: {
        renderStubDefaultSlot: true,
      },
      shallow: true,
    });

    await wrapper.find(".bcc-modal-close-button").trigger("click");

    expect(wrapper.emitted("close")?.length).toBe(1);
  });

  it("doesn't show the close button when there is a header", () => {
    const wrapper = mount(BccModal, {
      props: { open: true },
      slots: {
        default: "Modal content",
        header: "Header content",
      },
      global: {
        renderStubDefaultSlot: true,
      },
      shallow: true,
    });

    expect(wrapper.html()).not.toContain("bcc-modal-close-button");
  });
});
