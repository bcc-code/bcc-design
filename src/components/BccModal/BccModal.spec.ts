import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccModal from "./BccModal.vue";

describe("BccModal", () => {
  it("renders a modal", () => {
    const wrapper = mount(BccModal, {
      props: { open: true, title: "Modal title" },
      slots: { default: "Modal content" },
      global: {
        renderStubDefaultSlot: true,
      },
      shallow: true,
    });

    expect(wrapper.text()).toContain("Modal title");
    expect(wrapper.text()).toContain("Modal content");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
