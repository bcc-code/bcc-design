import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BccDialog from "./BccDialog.vue"; // replace with the actual component name
import BccButton from "../BccButton/BccButton.vue";

describe("BccDialog", () => {
  it("renders a dialog", () => {
    const wrapper = mount(BccDialog, {
      props: { open: true, title: "Dialog title", subtitle: "Dialog subtitle" },
      slots: {
        default: "Dialog content",
        header: "Header slot",
        footer: "Footer slot",
        primaryAction: "Primary action",
        secondaryAction: "Secondary action",
      },
      global: {
        renderStubDefaultSlot: true,
      },
      shallow: true,
    });

    expect(wrapper.text()).toContain("Header slot");
    expect(wrapper.text()).toContain("Dialog title");
    expect(wrapper.text()).toContain("Dialog subtitle");
    expect(wrapper.text()).toContain("Dialog content");
    expect(wrapper.text()).toContain("Footer slot");
    expect(wrapper.text()).toContain("Primary action");
    expect(wrapper.text()).toContain("Secondary action");
  });

  it("closes when the close button is clicked", async () => {
    const wrapper = mount(BccDialog, {
      props: { open: true },
      slots: {
        default: "Dialog content",
      },
      global: {
        renderStubDefaultSlot: true,
      },
      shallow: true,
    });

    await wrapper.find(".bcc-dialog-close-button").trigger("click");

    expect(wrapper.emitted("close")?.length).toBe(1);
  });

  it("doesn't show the close button when there is a header", () => {
    const wrapper = mount(BccDialog, {
      props: { open: true },
      slots: {
        default: "Dialog content",
        header: "Header content",
      },
      global: {
        renderStubDefaultSlot: true,
      },
      shallow: true,
    });

    expect(wrapper.html()).not.toContain("bcc-dialog-close-button");
  });

  it("renders the correct variant class", () => {
    const wrapper = mount(BccDialog, {
      props: { open: true, variant: "alert" },
      slots: {
        default: "Dialog content",
      },
      global: {
        renderStubDefaultSlot: true,
      },
      shallow: true,
    });

    expect(wrapper.find(".bcc-dialog").classes()).toContain("bcc-dialog-alert");
  });

  it("renders the correct button context for primary action", () => {
    const wrapper = mount(BccDialog, {
      props: { open: true, destructive: true },
      slots: {
        primaryAction: "<BccButton>Primary action</BccButton>",
      },
      global: {
        components: {
          BccButton,
        },
        renderStubDefaultSlot: true,
      },
      shallow: true,
    });

    const primaryButton = wrapper.findComponent(BccButton);
    expect(primaryButton.exists()).toBe(true);
    expect(primaryButton.props("context")).toBe("danger");
  });
});
