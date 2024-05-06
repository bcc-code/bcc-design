import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BccAccordion from "./BccAccordion.vue";

describe("BccAccordion", () => {
  it("renders without crashing", () => {
    const wrapper = mount(BccAccordion, {
      props: {
        title: "Test Title",
      },
    });
    expect(wrapper.text()).toContain("Test Title");
  });

  it("uses props and slots as expected", () => {
    const wrapper = mount(BccAccordion, {
      props: {
        title: "Props Title",
        subtitle: "Props Subtitle",
        info: "Props Info",
        variant: "filled",
        size: "base",
      },
      slots: {
        prepend: '<div class="test-slot-content-left">Slot Content</div>',
        append: '<div class="test-slot-content-right">Slot Content</div>',
      },
    });

    expect(wrapper.find(".bcc-accordion-title").text()).toBe("Props Title");
    expect(wrapper.find(".bcc-accordion-subtitle").text()).toBe("Props Subtitle");
    expect(wrapper.find(".bcc-accordion-info").text()).toBe("Props Info");
    expect(wrapper.find(".test-slot-content-left").exists()).toBe(true);
    expect(wrapper.find(".test-slot-content-right").exists()).toBe(true);
  });

  it("toggles content visibility on header click", async () => {
    const wrapper = mount(BccAccordion, {
      props: {
        title: "Clickable Title",
      },
    });

    const isContentPresentInitially = wrapper.find(".bcc-accordion-content").exists();
    expect(isContentPresentInitially).toBe(false);
    await wrapper.find(".bcc-accordion-header").trigger("click");
    const isContentVisibleAfterClick = wrapper.find(".bcc-accordion-content").exists();
    expect(isContentVisibleAfterClick).toBe(true);
  });
});
