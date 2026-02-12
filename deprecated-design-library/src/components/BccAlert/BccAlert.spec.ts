import { describe, expect, it } from "vitest";

import { mount } from "@vue/test-utils";
import BccAlert from "./BccAlert.vue";

describe("BccAlert", () => {
  it("renders an alert", () => {
    const wrapper = mount(BccAlert, {
      props: { title: "Alert title", icon: true },
      slots: {
        default: "Alert content",
      },
      global: {
        renderStubDefaultSlot: true,
      },
      shallow: true,
    });

    expect(wrapper.text()).toContain("Alert title");
    expect(wrapper.text()).toContain("Alert content");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("can close", async () => {
    const wrapper = mount(BccAlert, {
      props: { open: true, closeButton: true },
      slots: {
        default: "Alert content",
      },
      global: {
        renderStubDefaultSlot: true,
      },
      shallow: true,
    });

    await wrapper.find(".bcc-alert-close-button").trigger("click");

    expect(wrapper.emitted("close")?.length).toBe(1);
  });
});
