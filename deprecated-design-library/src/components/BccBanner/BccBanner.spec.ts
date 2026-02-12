import { describe, expect, it, vi } from "vitest";

import { mount } from "@vue/test-utils";
import BccBanner from "./BccBanner.vue";

describe("BccBanner", () => {
  it("renders an banner", () => {
    const wrapper = mount(BccBanner, {
      props: {
        title: "Banner title",
        actions: [
          {
            label: "OK",
          },
        ],
      },
      slots: {
        default: "Banner content",
      },
    });

    expect(wrapper.text()).toContain("Banner title");
    expect(wrapper.text()).toContain("Banner content");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("can close", async () => {
    const wrapper = mount(BccBanner, {
      props: { title: "Banner title", open: true, closeButton: true },
      slots: {
        default: "Banner content",
      },
    });

    await wrapper.find(".bcc-banner-close-button").trigger("click");

    expect(wrapper.emitted("close")?.length).toBe(1);
  });

  it("can close via action", async () => {
    const actionClick = vi.fn(() => 1);
    const wrapper = mount(BccBanner, {
      props: {
        title: "Banner title",
        open: true,
        closeButton: true,
        actions: [
          {
            label: "OK",
            onClick: actionClick,
          },
        ],
      },
      slots: {
        default: "Banner content",
      },
    });

    await wrapper.find(".bcc-banner-actions .bcc-button").trigger("click");

    expect(actionClick).toHaveBeenCalled();

    expect(wrapper.emitted("close")?.length).toBe(1);
  });
});
