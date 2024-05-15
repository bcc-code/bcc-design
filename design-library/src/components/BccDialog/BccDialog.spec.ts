import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BccDialog from "./BccDialog.vue";
import BccButton from "../BccButton/BccButton.vue";

describe("BccDialog", () => {
  it("renders with default props", () => {
    const wrapper = mount(BccDialog, {
      props: {
        open: true,
        title: "Test Title",
      },
    });

    expect(wrapper.find(".bcc-dialog-title h3").text()).toBe("Test Title");
    expect(wrapper.find(".bcc-dialog-close-button").exists()).toBe(true);
    expect(wrapper.find(".bcc-dialog-subtitle").exists()).toBe(false);
  });

  it("renders the subtitle when provided", () => {
    const wrapper = mount(BccDialog, {
      props: {
        open: true,
        title: "Test Title",
        subtitle: "Test Subtitle",
      },
    });

    expect(wrapper.find(".bcc-dialog-subtitle").text()).toBe("Test Subtitle");
  });

  it("hides the close button for alert variant", () => {
    const wrapper = mount(BccDialog, {
      props: {
        open: true,
        title: "Alert Title",
        variant: "alert",
      },
    });

    expect(wrapper.find(".bcc-dialog-close-button").exists()).toBe(false);
  });

  it("renders primary button with danger variant for destructive action", () => {
    const wrapper = mount(BccDialog, {
      props: {
        open: true,
        title: "Destructive Action",
        destructive: true,
      },
      slots: {
        primaryAction: "<BccButton>Submit</BccButton>",
      },
      global: {
        components: {
          BccButton,
        },
      },
    });

    const primaryButton = wrapper.findComponent(BccButton);
    expect(primaryButton.props("context")).toBe("danger");
  });

  it("renders primary button with danger variant for alert", () => {
    const wrapper = mount(BccDialog, {
      props: {
        open: true,
        title: "Alert Title",
        variant: "alert",
      },
      slots: {
        primaryAction: "<BccButton>Submit</BccButton>",
      },
      global: {
        components: {
          BccButton,
        },
      },
    });

    const primaryButton = wrapper.findComponent(BccButton);
    expect(primaryButton.props("context")).toBe("danger");
  });
});
